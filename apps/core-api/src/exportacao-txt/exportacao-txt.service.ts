import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_DOCUMENTOS_FISCAIS,
  BUCKET_EXPORTACOES_TXT,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { extrairEnderecoEmitente, contarItens } from "../documentos-fiscais/xml-utils";
import { linha0000, linha0010, linha1000, type FornecedorParaLayout } from "./dominio-layout";

const CRLF = "\r\n";

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
      const filtroPeriodo = {
        empresaId,
        direcao: "ENTRADA" as const,
        OR: [
          { emitidoEm: { gte: periodoInicio, lte: periodoFim } },
          { emitidoEm: null, recebidoEm: { gte: periodoInicio, lte: periodoFim } },
        ],
      };

      const [documentos, totalNoPeriodo] = await Promise.all([
        this.prisma.client.documentoFiscal.findMany({
          where: { ...filtroPeriodo, cfop: { not: null }, valorTotal: { not: null } },
          orderBy: { emitidoEm: "asc" },
        }),
        this.prisma.client.documentoFiscal.count({ where: filtroPeriodo }),
      ]);
      const documentosIgnorados = totalNoPeriodo - documentos.length;

      const fornecedoresPorCnpj = new Map<string, FornecedorParaLayout>();
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
            quantidadeItens: contarItens(xmlTexto) || null,
          })
        );
      }

      const linhas = [
        linha0000(empresa.cnpj),
        ...Array.from(fornecedoresPorCnpj.values()).map(linha0010),
        ...linhasNotas,
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
          totalDocumentos: documentos.length,
          concluidoEm: new Date(),
        },
      });
      return { ...atualizado, documentosIgnorados };
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
