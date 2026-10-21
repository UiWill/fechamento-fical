import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import crypto from "node:crypto";
import { extrairDadosBasicos, validarDigitoVerificadorChave, type CriarAgenteTokenInput } from "@afe/shared";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_AGENTE_RELEASES,
  BUCKET_DOCUMENTOS_FISCAIS,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import type { AgenteAutenticado } from "./agente-token.guard";
import { hashTokenAgente } from "./agente-token.guard";
import { ItensDocumentoFiscalService } from "../documentos-fiscais/itens-documento-fiscal.service";

export type StatusItemUpload = "ACEITO" | "DUPLICADO" | "CNPJ_NAO_AUTORIZADO" | "INVALIDO" | "FORA_DO_PERIODO";

export interface ResultadoItemUpload {
  nomeArquivoOriginal: string;
  status: StatusItemUpload;
  chaveAcesso?: string;
  documentoFiscalId?: string;
  motivo?: string;
}

@Injectable()
export class AgentesService {
  private readonly logger = new Logger(AgentesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService,
    private readonly itensDocumentoFiscal: ItensDocumentoFiscalService
  ) {}

  /**
   * organizacaoIdDoUsuario vem do JWT de quem está chamando — nunca do
   * corpo da requisição. Sem essa checagem, uma organização conseguiria
   * gerar um token válido apontando pra outra organização/empresa (só
   * sabendo o id), e usá-lo pra injetar documentos fiscais na conta
   * alheia (achado numa revisão de segurança).
   */
  async gerarToken(input: CriarAgenteTokenInput, organizacaoIdDoUsuario: string) {
    if (input.organizacaoId) {
      if (input.organizacaoId !== organizacaoIdDoUsuario) {
        throw new ForbiddenException("Não é possível gerar token de agente pra outra organização");
      }
    } else if (input.empresaId) {
      const empresa = await this.prisma.client.empresa.findUnique({ where: { id: input.empresaId } });
      if (!empresa) throw new NotFoundException(`Empresa ${input.empresaId} não encontrada`);
      if (empresa.organizacaoId !== organizacaoIdDoUsuario) {
        throw new ForbiddenException("Essa empresa não pertence à sua organização");
      }
    }

    const tokenBruto = crypto.randomBytes(32).toString("base64url");
    const criado = await this.prisma.client.agenteInstalacaoToken.create({
      data: {
        nome: input.nome,
        organizacaoId: input.organizacaoId,
        empresaId: input.empresaId,
        tokenHash: hashTokenAgente(tokenBruto),
        anydeskId: input.anydeskId,
        nomeContato: input.nomeContato,
        telefoneContato: input.telefoneContato,
      },
    });

    // tokenBruto só existe aqui — nunca mais é recuperável depois disso.
    return { id: criado.id, nome: criado.nome, tokenRaw: tokenBruto, criadoEm: criado.criadoEm };
  }

  listarTokens(organizacaoId: string, incluirOcultos: boolean) {
    // Um token pode estar preso direto na organizacao (escopo "toda a
    // carteira") OU numa empresa especifica dela (escopo "um CNPJ") — sem
    // o segundo braço do OR, os tokens de empresa especifica nunca
    // apareciam aqui (bug anterior: so buscava por organizacaoId).
    return this.prisma.client.agenteInstalacaoToken.findMany({
      where: {
        OR: [{ organizacaoId }, { empresa: { organizacaoId } }],
        ...(incluirOcultos ? {} : { ocultoEm: null }),
      },
      select: {
        id: true,
        nome: true,
        organizacaoId: true,
        empresaId: true,
        status: true,
        ultimoHeartbeatEm: true,
        ultimaVersaoAgente: true,
        anydeskId: true,
        nomeContato: true,
        telefoneContato: true,
        criadoEm: true,
        ocultoEm: true,
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  /**
   * Confere que o token pertence à organização de quem está chamando —
   * sem isso, qualquer conta logada (de qualquer organização) poderia
   * revogar/excluir o token de outra só sabendo o id (IDOR entre
   * organizações, achado numa revisão de segurança automática).
   */
  private async buscarTokenDaOrganizacao(id: string, organizacaoId: string) {
    const registro = await this.prisma.client.agenteInstalacaoToken.findUnique({
      where: { id },
      include: { empresa: { select: { organizacaoId: true } } },
    });
    if (!registro) throw new NotFoundException(`Token ${id} não encontrado`);

    const orgDoToken = registro.organizacaoId ?? registro.empresa?.organizacaoId;
    if (orgDoToken !== organizacaoId) {
      throw new ForbiddenException("Esse token não pertence à sua organização");
    }
    return registro;
  }

  async revogarToken(id: string, organizacaoId: string) {
    await this.buscarTokenDaOrganizacao(id, organizacaoId);

    return this.prisma.client.agenteInstalacaoToken.update({
      where: { id },
      data: { status: "REVOGADO", revogadoEm: new Date() },
    });
  }

  /** Tira da listagem principal sem apagar nada — reversível (ver restaurarToken). */
  async ocultarToken(id: string, organizacaoId: string) {
    await this.buscarTokenDaOrganizacao(id, organizacaoId);
    return this.prisma.client.agenteInstalacaoToken.update({
      where: { id },
      data: { ocultoEm: new Date() },
    });
  }

  async restaurarToken(id: string, organizacaoId: string) {
    await this.buscarTokenDaOrganizacao(id, organizacaoId);
    return this.prisma.client.agenteInstalacaoToken.update({
      where: { id },
      data: { ocultoEm: null },
    });
  }

  /**
   * Diferente de revogar (que só invalida o token, mantendo o registro pra
   * histórico): apaga a instalação da lista de vez. Os documentos fiscais
   * já recebidos por ela não são afetados — a FK
   * (agenteInstalacaoTokenId) é SET NULL, nunca cascade delete.
   */
  async excluirToken(id: string, organizacaoId: string) {
    await this.buscarTokenDaOrganizacao(id, organizacaoId);

    await this.prisma.client.agenteInstalacaoToken.delete({ where: { id } });
    return { ok: true };
  }

  async resolverEmpresasAutorizadas(agenteToken: AgenteAutenticado) {
    if (agenteToken.empresaId) {
      const empresa = await this.prisma.client.empresa.findUnique({ where: { id: agenteToken.empresaId } });
      return empresa ? [empresa] : [];
    }
    return this.prisma.client.empresa.findMany({ where: { organizacaoId: agenteToken.organizacaoId! } });
  }

  /**
   * Tudo que o painel mostra de um agente: o que o servidor sabe por conta
   * própria (notas que esse agente mandou e foram aceitas) mais o resumo
   * que o próprio agente manda no heartbeat (fila, recusas, varredura).
   */
  async atividadeDoAgente(id: string, organizacaoId: string) {
    await this.buscarTokenDaOrganizacao(id, organizacaoId);
    const agente = await this.prisma.client.agenteInstalacaoToken.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        nome: true,
        status: true,
        ultimoHeartbeatEm: true,
        ultimaVersaoAgente: true,
        telemetria: true,
        nomeContato: true,
        telefoneContato: true,
        anydeskId: true,
      },
    });

    const agora = Date.now();
    const desde24h = new Date(agora - 24 * 60 * 60 * 1000);
    // "Hoje" no fuso de Brasília (UTC-3, sem horário de verão desde 2019).
    const brasilia = new Date(agora - 3 * 60 * 60 * 1000);
    const inicioHoje = new Date(
      Date.UTC(brasilia.getUTCFullYear(), brasilia.getUTCMonth(), brasilia.getUTCDate(), 3, 0, 0)
    );
    const doAgente = { agenteInstalacaoTokenId: id };

    const [hoje, ultimas24h, total, ultimasNotas, porEmpresa] = await Promise.all([
      this.prisma.client.documentoFiscal.count({ where: { ...doAgente, recebidoEm: { gte: inicioHoje } } }),
      this.prisma.client.documentoFiscal.count({ where: { ...doAgente, recebidoEm: { gte: desde24h } } }),
      this.prisma.client.documentoFiscal.count({ where: doAgente }),
      this.prisma.client.documentoFiscal.findMany({
        where: doAgente,
        orderBy: { recebidoEm: "desc" },
        take: 15,
        select: {
          chaveAcesso: true,
          tipo: true,
          emitidoEm: true,
          recebidoEm: true,
          empresa: { select: { razaoSocial: true } },
        },
      }),
      this.prisma.client.documentoFiscal.groupBy({
        by: ["empresaId"],
        where: { ...doAgente, recebidoEm: { gte: desde24h } },
        _count: { _all: true },
      }),
    ]);

    const empresas = await this.prisma.client.empresa.findMany({
      where: { id: { in: porEmpresa.map((p) => p.empresaId) } },
      select: { id: true, razaoSocial: true },
    });
    const nomePorId = new Map(empresas.map((e) => [e.id, e.razaoSocial]));

    return {
      agente,
      // Agente novo avisa a cada 1 min; o antigo (sem resumo) a cada 5 min.
      online: agente.ultimoHeartbeatEm
        ? agora - agente.ultimoHeartbeatEm.getTime() < (agente.telemetria ? 3 : 7) * 60 * 1000
        : false,
      servidor: {
        hoje,
        ultimas24h,
        total,
        ultimaNotaEm: ultimasNotas[0]?.recebidoEm ?? null,
        ultimasNotas: ultimasNotas.map((n) => ({
          chaveAcesso: n.chaveAcesso,
          tipo: n.tipo,
          emitidoEm: n.emitidoEm,
          recebidoEm: n.recebidoEm,
          empresa: n.empresa.razaoSocial,
        })),
        porEmpresa24h: porEmpresa
          .map((p) => ({ empresa: nomePorId.get(p.empresaId) ?? p.empresaId, quantidade: p._count._all }))
          .sort((a, b) => b.quantidade - a.quantidade),
      },
    };
  }

  async registrarHeartbeat(
    agenteToken: AgenteAutenticado,
    versaoAgente: string,
    ip: string | undefined,
    telemetria?: unknown
  ) {
    // O resumo vem do próprio agente (não é confiável nem sensível) e é só
    // exibido no painel — limita o tamanho pra um agente com bug (ou
    // alguém com o token) não encher o banco.
    const telemetriaValida =
      telemetria && typeof telemetria === "object" && JSON.stringify(telemetria).length <= 30_000
        ? (telemetria as object)
        : undefined;
    await this.prisma.client.agenteInstalacaoToken.update({
      where: { id: agenteToken.id },
      data: {
        ultimoHeartbeatEm: new Date(),
        ultimaVersaoAgente: versaoAgente,
        ultimoIpOrigem: ip,
        ...(telemetriaValida ? { telemetria: telemetriaValida } : {}),
      },
    });
    return { ok: true, servidorEm: new Date().toISOString() };
  }

  async processarLoteDocumentos(
    agenteToken: AgenteAutenticado,
    documentos: { nomeArquivoOriginal: string; xmlBase64: string }[]
  ): Promise<ResultadoItemUpload[]> {
    const empresasAutorizadas = await this.resolverEmpresasAutorizadas(agenteToken);
    const resultados: ResultadoItemUpload[] = [];

    for (const documento of documentos) {
      resultados.push(await this.processarDocumento(agenteToken, empresasAutorizadas, documento));
    }
    return resultados;
  }

  private async processarDocumento(
    agenteToken: AgenteAutenticado,
    empresasAutorizadas: Awaited<ReturnType<typeof this.resolverEmpresasAutorizadas>>,
    documento: { nomeArquivoOriginal: string; xmlBase64: string }
  ): Promise<ResultadoItemUpload> {
    const { nomeArquivoOriginal, xmlBase64 } = documento;
    let xml: string;
    try {
      xml = Buffer.from(xmlBase64, "base64").toString("utf8");
    } catch {
      return { nomeArquivoOriginal, status: "INVALIDO", motivo: "xmlBase64 não decodificável" };
    }

    const dados = extrairDadosBasicos(xml);
    if (!dados || !validarDigitoVerificadorChave(dados.chaveAcesso)) {
      return { nomeArquivoOriginal, status: "INVALIDO", motivo: "XML sem chave de acesso válida reconhecível" };
    }

    const empresa = empresasAutorizadas.find((e) => e.cnpj === dados.cnpjEmitente);
    if (!empresa) {
      return {
        nomeArquivoOriginal,
        status: "CNPJ_NAO_AUTORIZADO",
        chaveAcesso: dados.chaveAcesso,
        motivo: `CNPJ ${dados.cnpjEmitente} fora do escopo deste token`,
      };
    }

    // Segunda camada de validacao (nao confia so no filtro do agente) --
    // mesmo raciocinio ja usado pro resto do sistema: cliente pode estar
    // desatualizado ou ter o cache local errado.
    if (empresa.dataInicioMonitoramento && dados.dataEmissao && dados.dataEmissao < empresa.dataInicioMonitoramento) {
      return {
        nomeArquivoOriginal,
        status: "FORA_DO_PERIODO",
        chaveAcesso: dados.chaveAcesso,
        motivo: `Emitida antes de ${empresa.dataInicioMonitoramento.toISOString().slice(0, 10)} (data de inicio de captura dessa empresa)`,
      };
    }

    const existente = await this.prisma.client.documentoFiscal.findUnique({
      where: { chaveAcesso: dados.chaveAcesso },
    });
    if (existente) {
      // Backfill: o primeiro envio pode ter sido um XML resumo do PDV (sem
      // CFOP/valor) — se essa chamada já veio com os dados completos e o
      // registro salvo ainda está sem, preenche agora em vez de só
      // descartar como duplicado de novo (mesmo raciocínio já usado pra
      // notas de ENTRADA em documentos-fiscais.service.ts).
      // IMPORTANTE: chaveAcesso é única globalmente (não por empresa) --
      // sem essa checagem de empresaId, um token de outra empresa poderia
      // forjar um XML com a própria CNPJ autorizada mas com a chave de
      // acesso de um documento de OUTRO cliente, e sobrescrever cfop/valor
      // dele (cross-tenant write). Só faz backfill se o documento já
      // existente for mesmo dessa empresa.
      const podeBackfillarValor =
        existente.empresaId === empresa.id &&
        (!existente.cfop || existente.valorTotal === null) &&
        dados.cfop &&
        dados.valorTotal !== null;
      // Chega depois um evento de cancelamento pra uma nota que já estava
      // com os dados completos — não mexe em cfop/valor (continuam
      // mostrando o que foi vendido), só marca que foi cancelada.
      const precisaMarcarCancelada = existente.empresaId === empresa.id && dados.cancelada && !existente.cancelada;
      // O primeiro envio pode ter sido antes da SEFAZ autorizar (ou um
      // resumo sem protocolo) — se esse envio já traz o protocolo e o
      // registro salvo ainda não tem, preenche direto do XML, sem
      // precisar esperar o cron de consulta.
      const podeBackfillarProtocolo =
        existente.empresaId === empresa.id && !existente.cStatConsulta && dados.protocolo;
      if (podeBackfillarValor || precisaMarcarCancelada || podeBackfillarProtocolo) {
        await this.prisma.client.documentoFiscal.update({
          where: { id: existente.id },
          data: {
            cfop: existente.cfop ?? dados.cfop,
            valorTotal: existente.valorTotal ?? dados.valorTotal,
            nomeEmitente: existente.nomeEmitente ?? dados.nomeEmitente,
            cancelada: existente.cancelada || dados.cancelada,
            ...(podeBackfillarProtocolo
              ? {
                  cStatConsulta: dados.protocolo!.cStat,
                  xMotivoConsulta: dados.protocolo!.xMotivo,
                  consultadoEm: new Date(),
                }
              : {}),
          },
        });
        if (podeBackfillarValor && (dados.tipo === "NFE" || dados.tipo === "NFCE")) {
          try {
            await this.itensDocumentoFiscal.extrairEPersistirItens(existente.id, xml);
          } catch (err) {
            this.logger.warn(`Falha ao extrair itens no backfill do documento ${existente.id}: ${err}`);
          }
        }
      }
      return {
        nomeArquivoOriginal,
        status: "DUPLICADO",
        chaveAcesso: dados.chaveAcesso,
        documentoFiscalId: existente.id,
      };
    }

    const objetoStorageXml = `${empresa.cnpj}/${dados.chaveAcesso}.xml`;
    await this.storage.putObject(BUCKET_DOCUMENTOS_FISCAIS, objetoStorageXml, Buffer.from(xml, "utf8"));

    try {
      const criado = await this.prisma.client.documentoFiscal.create({
        data: {
          empresaId: empresa.id,
          chaveAcesso: dados.chaveAcesso,
          tipo: dados.tipo,
          direcao: "SAIDA",
          nomeEmitente: dados.nomeEmitente,
          cfop: dados.cfop,
          valorTotal: dados.valorTotal,
          cancelada: dados.cancelada,
          objetoStorageXml,
          emitidoEm: dados.dataEmissao,
          agenteInstalacaoTokenId: agenteToken.id,
          // Protocolo já vem no XML autorizado (ver xml-documento-fiscal.ts)
          // na maioria das vendas de PDV — grava direto, sem precisar
          // esperar o cron diário de consulta à SEFAZ.
          ...(dados.protocolo
            ? {
                cStatConsulta: dados.protocolo.cStat,
                xMotivoConsulta: dados.protocolo.xMotivo,
                consultadoEm: new Date(),
              }
            : {}),
        },
      });

      if (dados.tipo === "NFE" || dados.tipo === "NFCE") {
        try {
          await this.itensDocumentoFiscal.extrairEPersistirItens(criado.id, xml);
        } catch (err) {
          // Não derruba o upload da nota por isso — fica sem itens até o
          // próximo reprocessamento em lote (ver documentos-fiscais.controller.ts).
          this.logger.warn(`Falha ao extrair itens do documento ${criado.id}: ${err}`);
        }
      }

      return {
        nomeArquivoOriginal,
        status: "ACEITO",
        chaveAcesso: dados.chaveAcesso,
        documentoFiscalId: criado.id,
      };
    } catch (err) {
      // P2002 = corrida entre duas chamadas simultaneas pra mesma chave
      // (ex: dois lotes concorrentes) — trata como duplicado, nao como erro.
      const codigo = (err as { code?: string }).code;
      if (codigo === "P2002") {
        const jaExiste = await this.prisma.client.documentoFiscal.findUnique({
          where: { chaveAcesso: dados.chaveAcesso },
        });
        return {
          nomeArquivoOriginal,
          status: "DUPLICADO",
          chaveAcesso: dados.chaveAcesso,
          documentoFiscalId: jaExiste?.id,
        };
      }
      this.logger.error(`Falha ao gravar documento ${dados.chaveAcesso}: ${err}`);
      throw err;
    }
  }

  /**
   * Registra uma nova versão do agente como vigente. O arquivo .exe em si
   * precisa já estar no storage (bucket afe-agente-desktop-releases, chave
   * "agente-fiscal-<versao>.exe") antes de chamar isso — publicar uma
   * versão é um processo manual (poucas vezes por mês), não justifica um
   * endpoint de upload de arquivo grande.
   */
  publicarVersao(input: { versao: string; obrigatoria?: boolean; notas?: string }) {
    if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(input.versao)) {
      throw new BadRequestException('Versão deve seguir o formato "X.Y.Z" (ex: 1.2.3)');
    }
    return this.prisma.client.versaoAgente.create({
      data: {
        versao: input.versao,
        objetoStorageExe: `agente-fiscal-${input.versao}.exe`,
        obrigatoria: input.obrigatoria ?? false,
        notas: input.notas,
      },
    });
  }

  obterVersaoMaisRecente() {
    return this.prisma.client.versaoAgente.findFirst({ orderBy: { publicadoEm: "desc" } });
  }

  async obterArquivoVersao(versao: string): Promise<Buffer> {
    const registro = await this.prisma.client.versaoAgente.findUnique({ where: { versao } });
    if (!registro) throw new NotFoundException(`Versão ${versao} não encontrada`);
    return this.storage.getObject(BUCKET_AGENTE_RELEASES, registro.objetoStorageExe);
  }
}
