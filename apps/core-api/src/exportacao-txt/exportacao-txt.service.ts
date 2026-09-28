import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_DOCUMENTOS_FISCAIS,
  BUCKET_EXPORTACOES_TXT,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { extrairEnderecoEmitente } from "../documentos-fiscais/xml-utils";
import {
  linha0000,
  linha0010,
  linha0020,
  linha1000,
  linha2000,
  linha2010,
  linha2020,
  linha2030,
  linha2060,
  linha2500,
  type ParticipanteParaLayout,
  type TotalImpostoParaLayout,
} from "./dominio-layout";
import { lerNotaSaida, type ItemSaida } from "./saida-xml";

const CRLF = "\r\n";

const CST_ICMS_ISENTAS = new Set(["30", "40", "41", "50"]);
const CST_IPI_ISENTAS = new Set(["01", "02", "03", "04", "05", "51", "52", "53", "54", "55"]);

/**
 * Totalizadores 2020 da nota: um par (ICMS tipo 1 + IPI tipo 2) por
 * combinação de classificação de ICMS e de IPI dos itens — é o que o modelo
 * mostra (ex.: dois itens a 18% de ICMS mas com IPI classificado diferente
 * geram duas linhas de cada tipo). Itens de Simples (CSOSN) não geram nada.
 */
function totaisImpostos(itens: ItemSaida[]): TotalImpostoParaLayout[] {
  const grupos = new Map<string, ItemSaida[]>();
  for (const item of itens) {
    if (!item.icms?.comCst) continue;
    const chaveIcms = `${item.icms.cst}:${item.icms.aliquota}`;
    const chaveIpi = item.ipi.tributado ? `T:${item.ipi.aliquota}` : `N:${item.ipi.cst}`;
    const chave = `${chaveIcms}|${chaveIpi}`;
    grupos.set(chave, [...(grupos.get(chave) ?? []), item]);
  }

  const soma = (lista: ItemSaida[], f: (i: ItemSaida) => number) => lista.reduce((t, i) => t + f(i), 0);
  const icms: TotalImpostoParaLayout[] = [];
  const ipi: TotalImpostoParaLayout[] = [];

  for (const lista of grupos.values()) {
    const ref = lista[0]!;
    const contabil = soma(lista, (i) => i.valorContabil);
    const valorIpi = soma(lista, (i) => i.ipi.valor);

    const base = soma(lista, (i) => i.icms!.base);
    const valorIcms = soma(lista, (i) => i.icms!.valor);
    if (valorIcms > 0 || base > 0) {
      const diferenca = Math.max(0, contabil - base);
      const reducao = ref.icms!.cst === "20";
      icms.push({
        tipo: 1,
        base,
        aliquota: ref.icms!.aliquota,
        valor: valorIcms,
        isentas: reducao ? Math.max(0, diferenca - valorIpi) : 0,
        outras: reducao ? valorIpi : diferenca,
        valorContabil: contabil,
      });
    } else {
      const isenta = CST_ICMS_ISENTAS.has(ref.icms!.cst);
      icms.push({
        tipo: 1,
        base: 0,
        aliquota: 0,
        valor: 0,
        isentas: isenta ? contabil : 0,
        outras: isenta ? 0 : contabil,
        valorContabil: contabil,
      });
    }

    if (ref.ipi.tributado) {
      const baseIpi = soma(lista, (i) => i.ipi.base);
      ipi.push({
        tipo: 2,
        base: baseIpi,
        aliquota: ref.ipi.aliquota,
        valor: valorIpi,
        isentas: 0,
        outras: Math.max(0, contabil - baseIpi - valorIpi),
        valorContabil: contabil,
      });
    } else {
      const isenta = CST_IPI_ISENTAS.has(ref.ipi.cst);
      ipi.push({
        tipo: 2,
        base: 0,
        aliquota: 0,
        valor: 0,
        isentas: isenta ? contabil : 0,
        outras: isenta ? 0 : contabil,
        valorContabil: contabil,
      });
    }
  }
  return [...icms, ...ipi];
}

@Injectable()
export class ExportacaoTxtService {
  private readonly logger = new Logger(ExportacaoTxtService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService
  ) {}

  listarPorEmpresa(empresaId: string) {
    return this.prisma.client.exportacaoTxt.findMany({
      where: { empresaId },
      orderBy: { criadoEm: "desc" },
    });
  }

  /**
   * Gera o TXT de importação de NOTAS DE ENTRADA para o Domínio Sistemas
   * (blocos 0000/0010/1000 — ver comentário em dominio-layout.ts sobre o
   * que ainda fica de fora nesta fase). Roda de forma síncrona dentro da
   * própria requisição — o volume de notas por empresa/mês não justifica
   * fila/job em background por enquanto.
   */
  async gerar(empresaId: string, periodoInicio: Date, periodoFim: Date) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) {
      throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    }

    const registro = await this.prisma.client.exportacaoTxt.create({
      data: { empresaId, periodoInicio, periodoFim, status: "PROCESSANDO" },
    });

    try {
      const periodo = {
        OR: [
          { emitidoEm: { gte: periodoInicio, lte: periodoFim } },
          { emitidoEm: null, recebidoEm: { gte: periodoInicio, lte: periodoFim } },
        ],
      };
      const filtroEntrada = { empresaId, direcao: "ENTRADA" as const, ...periodo };
      // Saída: só NF-e (modelo 55) por enquanto — NFC-e/cupom (2081/2082) e CT-e ficam de fora.
      const filtroSaida = { empresaId, direcao: "SAIDA" as const, tipo: "NFE" as const, ...periodo };

      const [documentos, totalEntrada, notasSaida, totalSaida] = await Promise.all([
        this.prisma.client.documentoFiscal.findMany({
          where: { ...filtroEntrada, cfop: { not: null }, valorTotal: { not: null } },
          orderBy: { emitidoEm: "asc" },
        }),
        this.prisma.client.documentoFiscal.count({ where: filtroEntrada }),
        this.prisma.client.documentoFiscal.findMany({ where: filtroSaida, orderBy: { emitidoEm: "asc" } }),
        this.prisma.client.documentoFiscal.count({ where: filtroSaida }),
      ]);
      const documentosIgnorados = totalEntrada - documentos.length + (totalSaida - notasSaida.length);

      const fornecedoresPorCnpj = new Map<string, ParticipanteParaLayout>();
      const linhasNotas: string[] = [];

      for (const doc of documentos) {
        const xml = await this.storage.getObject(BUCKET_DOCUMENTOS_FISCAIS, doc.objetoStorageXml);
        const xmlTexto = xml.toString("utf8");

        const chaveCnpj = doc.chaveAcesso.slice(6, 20);
        if (!fornecedoresPorCnpj.has(chaveCnpj)) {
          fornecedoresPorCnpj.set(chaveCnpj, {
            cnpj: chaveCnpj,
            razaoSocial: doc.nomeEmitente ?? chaveCnpj,
            endereco: extrairEnderecoEmitente(xmlTexto),
            mesReferencia: periodoInicio,
          });
        }

        linhasNotas.push(
          linha1000({
            chaveAcesso: doc.chaveAcesso,
            cfop: doc.cfop!,
            valorTotal: Number(doc.valorTotal),
            dataEmissao: doc.emitidoEm ?? doc.recebidoEm,
            dataRecebimento: doc.recebidoEm,
            acumulador: doc.acumulador,
          })
        );
      }

      const clientesPorDocumento = new Map<string, ParticipanteParaLayout>();
      const linhasSaida: string[] = [];

      for (const doc of notasSaida) {
        const xml = await this.storage.getObject(BUCKET_DOCUMENTOS_FISCAIS, doc.objetoStorageXml);
        const nota = lerNotaSaida(xml.toString("utf8"));
        const dest = nota.destinatario;

        if (dest.documento && !clientesPorDocumento.has(dest.documento)) {
          clientesPorDocumento.set(dest.documento, {
            cnpj: dest.documento,
            razaoSocial: dest.nome || dest.documento,
            endereco: { ...dest, inscricaoEstadual: dest.inscricaoEstadual },
            mesReferencia: periodoInicio,
          });
        }

        const dataEmissao = doc.emitidoEm ?? doc.recebidoEm;

        linhasSaida.push(
          linha2000({
            chaveAcesso: doc.chaveAcesso,
            acumulador: doc.acumulador,
            cfop: doc.cfop ?? nota.itens[0]?.cfop ?? "",
            ufDestinatario: dest.uf,
            documentoDestinatario: dest.documento,
            inscricaoEstadualDestinatario: dest.inscricaoEstadual,
            modalidadeFrete: nota.modalidadeFrete,
            dataEmissao,
            valorNota: nota.valorNota || Number(doc.valorTotal ?? 0),
            valorIpi: nota.valorIpi,
            pisCst: nota.pis.cst,
            aliquotaPis: nota.pis.aliquotaPis,
            aliquotaCofins: nota.pis.aliquotaCofins,
          })
        );

        if (nota.informacoesComplementares) {
          linhasSaida.push(linha2010(nota.informacoesComplementares));
        }

        linhasSaida.push(...totaisImpostos(nota.itens).map(linha2020));

        const porNcm = new Map<string, { produtos: number; ipi: number }>();
        for (const item of nota.itens) {
          const acumulado = porNcm.get(item.ncm) ?? { produtos: 0, ipi: 0 };
          acumulado.produtos += item.valorProdutos;
          acumulado.ipi += item.ipi.valor;
          porNcm.set(item.ncm, acumulado);

          linhasSaida.push(
            linha2030({
              codigoProduto: item.codigoProduto,
              quantidade: item.quantidade,
              valorIpi: item.ipi.valor,
              baseCalculoIcms: item.icms?.base ?? 0,
              dataEmissao,
              cstIcms: item.icms?.cst ?? "",
              valorBrutoProduto: item.valorProdutos,
              valorDesconto: item.valorDesconto,
              baseCalculoIcmsSt: item.icms?.baseSt ?? 0,
              aliquotaIcms: item.icms?.aliquota ?? 0,
              valorIcms: item.icms?.valor ?? 0,
              valorIcmsSt: item.icms?.valorSt ?? 0,
              valorUnitario: item.valorUnitario,
              cstIpi: item.ipi.cst,
              aliquotaIpi: item.ipi.aliquota,
              cstPis: item.pis.cst,
              baseCalculoPis: item.pis.base,
              aliquotaPis: item.pis.aliquota,
              valorPis: item.pis.valor,
              cstCofins: item.cofins.cst,
              baseCalculoCofins: item.cofins.base,
              aliquotaCofins: item.cofins.aliquota,
              valorCofins: item.cofins.valor,
              valorContabil: item.valorContabil,
            })
          );
        }
        for (const [ncm, v] of porNcm) linhasSaida.push(linha2060(ncm, v.produtos, v.ipi));

        nota.duplicatas.forEach((d, i) =>
          linhasSaida.push(linha2500(d.vencimento, d.valor, nota.numero, i + 1))
        );
      }

      const linhas = [
        linha0000(empresa.cnpj),
        ...Array.from(clientesPorDocumento.values()).map(linha0010),
        ...Array.from(fornecedoresPorCnpj.values()).map(linha0020),
        ...linhasNotas,
        ...linhasSaida,
      ];

      const conteudo = linhas.join(CRLF) + CRLF;
      const objetoStorageTxt = `${empresaId}/${registro.id}.txt`;
      await this.storage.putObject(
        BUCKET_EXPORTACOES_TXT,
        objetoStorageTxt,
        Buffer.from(conteudo, "latin1")
      );

      const atualizado = await this.prisma.client.exportacaoTxt.update({
        where: { id: registro.id },
        data: {
          status: "CONCLUIDA",
          objetoStorageTxt,
          totalDocumentos: documentos.length + notasSaida.length,
          concluidoEm: new Date(),
        },
      });
      const documentosSemAcumulador = documentos.filter((d) => !d.acumulador).length;
      return { ...atualizado, documentosIgnorados, documentosSemAcumulador };
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : String(err);
      this.logger.error(`Falha ao gerar TXT da empresa ${empresaId}: ${mensagem}`);
      return this.prisma.client.exportacaoTxt.update({
        where: { id: registro.id },
        data: { status: "ERRO", erro: mensagem },
      });
    }
  }

  async obterArquivo(empresaId: string, exportacaoId: string): Promise<{ buffer: Buffer; nomeArquivo: string }> {
    const registro = await this.prisma.client.exportacaoTxt.findUnique({
      where: { id: exportacaoId },
    });
    if (!registro || registro.empresaId !== empresaId) {
      throw new NotFoundException("Exportação não encontrada");
    }
    if (registro.status !== "CONCLUIDA" || !registro.objetoStorageTxt) {
      throw new BadRequestException(`Exportação ainda não concluída (status: ${registro.status})`);
    }

    const buffer = await this.storage.getObject(BUCKET_EXPORTACOES_TXT, registro.objetoStorageTxt);
    const periodo = registro.periodoInicio.toISOString().slice(0, 7);
    return { buffer, nomeArquivo: `exportacao-dominio-${periodo}.txt` };
  }
}
