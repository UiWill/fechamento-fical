import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import crypto from "node:crypto";
import { extrairDadosBasicos, validarDigitoVerificadorChave, type CriarAgenteTokenInput } from "@afe/shared";
import { PrismaService } from "../common/prisma/prisma.service";
import { BUCKET_DOCUMENTOS_FISCAIS, ObjectStorageService } from "../common/storage/object-storage.service";
import type { AgenteAutenticado } from "./agente-token.guard";
import { hashTokenAgente } from "./agente-token.guard";

export type StatusItemUpload = "ACEITO" | "DUPLICADO" | "CNPJ_NAO_AUTORIZADO" | "INVALIDO";

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
    private readonly storage: ObjectStorageService
  ) {}

  async gerarToken(input: CriarAgenteTokenInput) {
    if (input.organizacaoId) {
      const organizacao = await this.prisma.client.organizacao.findUnique({
        where: { id: input.organizacaoId },
      });
      if (!organizacao) throw new NotFoundException(`Organização ${input.organizacaoId} não encontrada`);
    } else if (input.empresaId) {
      const empresa = await this.prisma.client.empresa.findUnique({ where: { id: input.empresaId } });
      if (!empresa) throw new NotFoundException(`Empresa ${input.empresaId} não encontrada`);
    }

    const tokenBruto = crypto.randomBytes(32).toString("base64url");
    const criado = await this.prisma.client.agenteInstalacaoToken.create({
      data: {
        nome: input.nome,
        organizacaoId: input.organizacaoId,
        empresaId: input.empresaId,
        tokenHash: hashTokenAgente(tokenBruto),
      },
    });

    // tokenBruto só existe aqui — nunca mais é recuperável depois disso.
    return { id: criado.id, nome: criado.nome, tokenRaw: tokenBruto, criadoEm: criado.criadoEm };
  }

  listarTokens(organizacaoId: string) {
    return this.prisma.client.agenteInstalacaoToken.findMany({
      where: { organizacaoId },
      select: {
        id: true,
        nome: true,
        organizacaoId: true,
        empresaId: true,
        status: true,
        ultimoHeartbeatEm: true,
        ultimaVersaoAgente: true,
        criadoEm: true,
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  async revogarToken(id: string) {
    const registro = await this.prisma.client.agenteInstalacaoToken.findUnique({ where: { id } });
    if (!registro) throw new NotFoundException(`Token ${id} não encontrado`);

    return this.prisma.client.agenteInstalacaoToken.update({
      where: { id },
      data: { status: "REVOGADO", revogadoEm: new Date() },
    });
  }

  async resolverEmpresasAutorizadas(agenteToken: AgenteAutenticado) {
    if (agenteToken.empresaId) {
      const empresa = await this.prisma.client.empresa.findUnique({ where: { id: agenteToken.empresaId } });
      return empresa ? [empresa] : [];
    }
    return this.prisma.client.empresa.findMany({ where: { organizacaoId: agenteToken.organizacaoId! } });
  }

  async registrarHeartbeat(agenteToken: AgenteAutenticado, versaoAgente: string, ip: string | undefined) {
    await this.prisma.client.agenteInstalacaoToken.update({
      where: { id: agenteToken.id },
      data: { ultimoHeartbeatEm: new Date(), ultimaVersaoAgente: versaoAgente, ultimoIpOrigem: ip },
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

    const existente = await this.prisma.client.documentoFiscal.findUnique({
      where: { chaveAcesso: dados.chaveAcesso },
    });
    if (existente) {
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
          objetoStorageXml,
          emitidoEm: dados.dataEmissao,
          agenteInstalacaoTokenId: agenteToken.id,
        },
      });
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
}
