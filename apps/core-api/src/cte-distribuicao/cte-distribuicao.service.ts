import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Prisma } from "@afe/database";
import { extrairDadosBasicos } from "@afe/shared";
import { PrismaService } from "../common/prisma/prisma.service";
import { BUCKET_DOCUMENTOS_FISCAIS, ObjectStorageService } from "../common/storage/object-storage.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import { extrairDetalheCte, extrairEventoCte } from "./cte-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mesmas regras da Distribuição DFe de NF-e (ver comentário longo em
// documentos-fiscais.service.ts): a SEFAZ limita ~20 consultas/hora por
// CNPJ+certificado, exige esperar 1h depois de um "nada novo" (137) e
// bloqueia com 656 se estourar — inclusive por consumo de OUTRO sistema
// (ex.: o do contador). O CT-e é um serviço à parte, então tem contadores
// próprios (chave separada) e não divide cota com o de NF-e daqui.
const LIMITE_CONSULTAS_POR_HORA = 18;
const JANELA_HORA_MS = 60 * 60 * 1000;
const PAUSA_ENTRE_LOTES_MS = 1000;
const CSTAT_CONSUMO_INDEVIDO = "656";

const historicoConsultas = new Map<string, number[]>();
const bloqueadoAte = new Map<string, number>();
const ultimaRespostaVazia = new Map<string, number>();

function consultasDisponiveis(empresaId: string): number {
  const agora = Date.now();
  const recentes = (historicoConsultas.get(empresaId) ?? []).filter((t) => agora - t < JANELA_HORA_MS);
  historicoConsultas.set(empresaId, recentes);
  return LIMITE_CONSULTAS_POR_HORA - recentes.length;
}

function registrarConsulta(empresaId: string): void {
  historicoConsultas.set(empresaId, [...(historicoConsultas.get(empresaId) ?? []), Date.now()]);
}

@Injectable()
export class CteDistribuicaoService {
  private readonly logger = new Logger(CteDistribuicaoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService,
    private readonly certificados: CertificadosService,
    private readonly fiscalEngine: FiscalEngineClient
  ) {}

  async listar(empresaId: string) {
    const [todos, controle] = await Promise.all([
      this.prisma.client.documentoFiscal.findMany({
        where: { empresaId, direcao: "CTE_DISTRIBUICAO" },
        select: {
          id: true,
          chaveAcesso: true,
          nomeEmitente: true,
          valorTotal: true,
          emitidoEm: true,
          recebidoEm: true,
          detalhe: true,
          cStatConsulta: true,
          xMotivoConsulta: true,
          consultadoEm: true,
        },
        orderBy: { recebidoEm: "desc" },
      }),
      this.prisma.client.nsuControleCte.findUnique({ where: { empresaId } }),
    ]);

    // A SEFAZ manda o CT-e pra todo mundo que aparece nele (remetente,
    // destinatário, expedidor, recebedor, tomador), mas o que importa pra
    // essa empresa é só quando ELA é quem paga o frete — os outros papéis
    // continuam gravados no banco (não descarta o que já consumiu cota de
    // NSU pra buscar), só não aparecem na tabela.
    const documentos = todos.filter((doc) => (doc.detalhe as { papeis?: string[] } | null)?.papeis?.includes("Tomador"));

    return {
      documentos,
      controle: controle
        ? {
            ultimoNsu: Number(controle.ultimoNsu),
            ultimoCStat: controle.ultimoCStat,
            ultimoXMotivo: controle.ultimoXMotivo,
            ultimaSincronizacaoEm: controle.atualizadoEm,
          }
        : null,
    };
  }

  /** Consulta a situação (cStat) de UM CT-e já recebido, por chave de acesso — mesmo padrão da NF-e, mas com o webservice próprio de CT-e. */
  async consultarSituacao(empresaId: string, documentoId: string) {
    const [empresa, documento] = await Promise.all([
      this.prisma.client.empresa.findUniqueOrThrow({ where: { id: empresaId } }),
      this.prisma.client.documentoFiscal.findUnique({ where: { id: documentoId } }),
    ]);
    if (!documento || documento.empresaId !== empresaId || documento.direcao !== "CTE_DISTRIBUICAO") {
      throw new NotFoundException(`CT-e ${documentoId} não encontrado`);
    }

    const certificado = await this.certificados.obterParaUso(empresaId);
    const resultado = await this.fiscalEngine.consultarProtocoloCte({
      codigoUf: empresa.codigoUf,
      ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
      chaveAcesso: documento.chaveAcesso,
      certificado,
    });

    return this.prisma.client.documentoFiscal.update({
      where: { id: documentoId },
      data: {
        cStatConsulta: resultado.cStat,
        xMotivoConsulta: resultado.xMotivo,
        consultadoEm: new Date(),
      },
    });
  }

  async zerarNsu(empresaId: string) {
    await this.prisma.client.nsuControleCte.upsert({
      where: { empresaId },
      create: { empresaId, ultimoNsu: 0 },
      update: { ultimoNsu: 0, ultimoCStat: null, ultimoXMotivo: null },
    });
    ultimaRespostaVazia.delete(empresaId);
    return { ok: true };
  }

  async sincronizar(empresaId: string) {
    const empresa = await this.prisma.client.empresa.findUniqueOrThrow({ where: { id: empresaId } });
    let controle = await this.prisma.client.nsuControleCte.upsert({
      where: { empresaId },
      create: { empresaId, ultimoNsu: BigInt(0) },
      update: {},
    });

    const resumo = (extra: { documentosNovos: number; limite: boolean; bloqueado: boolean }) => ({
      documentosNovos: extra.documentosNovos,
      ultimoNsu: Number(controle.ultimoNsu),
      cStat: controle.ultimoCStat ?? "",
      xMotivo: controle.ultimoXMotivo ?? "",
      limiteSefazAtingido: extra.limite,
      bloqueadoPelaSefaz: extra.bloqueado,
      ultimaSincronizacaoEm: controle.atualizadoEm,
    });

    if ((bloqueadoAte.get(empresaId) ?? 0) > Date.now()) {
      return resumo({ documentosNovos: 0, limite: true, bloqueado: true });
    }
    const ultimaVazia = ultimaRespostaVazia.get(empresaId);
    if (ultimaVazia !== undefined && Date.now() - ultimaVazia < JANELA_HORA_MS) {
      return resumo({ documentosNovos: 0, limite: true, bloqueado: false });
    }

    const certificado = await this.certificados.obterParaUso(empresaId);
    let documentosNovos = 0;
    let limite = false;
    let bloqueado = false;

    while (true) {
      if (consultasDisponiveis(empresaId) <= 0) {
        limite = true;
        break;
      }
      registrarConsulta(empresaId);

      const resultado = await this.fiscalEngine.distribuicaoCTe({
        cnpj: empresa.cnpj,
        codigoUf: empresa.codigoUf,
        ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
        ultimoNsu: controle.ultimoNsu.toString(),
        certificado,
      });

      controle = await this.prisma.client.nsuControleCte.update({
        where: { empresaId },
        data: { ultimoCStat: resultado.cStat, ultimoXMotivo: resultado.xMotivo },
      });

      if (resultado.cStat === CSTAT_CONSUMO_INDEVIDO) {
        bloqueadoAte.set(empresaId, Date.now() + JANELA_HORA_MS);
        limite = true;
        bloqueado = true;
        break;
      }

      for (const doc of resultado.documentos) {
        try {
          if (await this.processarDocumento(empresa.id, empresa.cnpj, doc)) documentosNovos += 1;
        } catch (err) {
          this.logger.warn(`CT-e NSU ${doc.nsu} da empresa ${empresaId} não pôde ser processado: ${err}`);
        }
      }

      controle = await this.prisma.client.nsuControleCte.update({
        where: { empresaId },
        data: { ultimoNsu: BigInt(resultado.ultimoNsu) },
      });

      if (resultado.documentos.length === 0) {
        ultimaRespostaVazia.set(empresaId, Date.now());
        break;
      }
      await sleep(PAUSA_ENTRE_LOTES_MS);
    }

    return resumo({ documentosNovos, limite, bloqueado });
  }

  /** Devolve true quando gravou um CT-e novo (eventos e reenvios não contam). */
  private async processarDocumento(
    empresaId: string,
    cnpjEmpresa: string,
    doc: { nsu: number; schema: string; xml: string }
  ): Promise<boolean> {
    if (doc.schema.toLowerCase().startsWith("proceventocte")) {
      const evento = extrairEventoCte(doc.xml);
      // 110111 = cancelamento: marca o CT-e (se já recebido) sem apagar nada.
      if (evento?.tipoEvento === "110111") {
        const existente = await this.prisma.client.documentoFiscal.findUnique({
          where: { chaveAcesso: evento.chave },
          select: { id: true, direcao: true, detalhe: true },
        });
        if (existente?.direcao === "CTE_DISTRIBUICAO") {
          await this.prisma.client.documentoFiscal.update({
            where: { id: existente.id },
            data: { detalhe: { ...((existente.detalhe as object | null) ?? {}), cancelado: true } },
          });
        }
      }
      return false;
    }

    if (!doc.schema.toLowerCase().startsWith("proccte")) return false;

    const dados = extrairDadosBasicos(doc.xml);
    if (!dados || dados.tipo !== "CTE") {
      this.logger.warn(`Documento NSU ${doc.nsu} (${doc.schema}) sem chave de CT-e reconhecível — ignorado`);
      return false;
    }

    const objetoStorageXml = `${cnpjEmpresa}/cte/${dados.chaveAcesso}.xml`;
    await this.storage.putObject(BUCKET_DOCUMENTOS_FISCAIS, objetoStorageXml, Buffer.from(doc.xml, "utf8"));

    const detalhe = extrairDetalheCte(doc.xml, cnpjEmpresa) as unknown as Prisma.InputJsonValue;
    const existente = await this.prisma.client.documentoFiscal.findUnique({
      where: { chaveAcesso: dados.chaveAcesso },
      select: { id: true, direcao: true },
    });

    if (existente) {
      // Reenvio do mesmo NSU pela SEFAZ (ou o CT-e já existe por outra via) — só atualiza o que é do CT-e daqui.
      if (existente.direcao === "CTE_DISTRIBUICAO") {
        await this.prisma.client.documentoFiscal.update({
          where: { id: existente.id },
          data: { nomeEmitente: dados.nomeEmitente, valorTotal: dados.valorTotal, detalhe },
        });
      }
      return false;
    }

    await this.prisma.client.documentoFiscal.create({
      data: {
        empresaId,
        chaveAcesso: dados.chaveAcesso,
        tipo: "CTE",
        direcao: "CTE_DISTRIBUICAO",
        nsu: BigInt(doc.nsu),
        nomeEmitente: dados.nomeEmitente,
        valorTotal: dados.valorTotal,
        objetoStorageXml,
        emitidoEm: dados.dataEmissao,
        detalhe,
      },
    });
    return true;
  }
}
