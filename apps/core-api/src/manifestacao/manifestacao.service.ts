import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import type { TipoEventoManifestacao } from "@afe/shared";

// cStat de sucesso para eventos de NF-e — 135 (evento vinculado à NF-e) e
// 136 (evento registrado, mas não vinculado por a NF-e ainda não ter sido
// recebida pela SEFAZ) são os códigos documentados no Manual de Orientação
// do Contribuinte. Qualquer outro cStat é tratado como rejeição.
const CSTAT_AUTORIZADO = new Set(["135", "136"]);

@Injectable()
export class ManifestacaoService {
  private readonly logger = new Logger(ManifestacaoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly certificados: CertificadosService,
    private readonly fiscalEngine: FiscalEngineClient
  ) {}

  listarPorEmpresa(empresaId: string) {
    return this.prisma.client.manifestacaoEvento.findMany({
      where: { empresaId },
      orderBy: { criadoEm: "desc" },
    });
  }

  /**
   * Envia um evento de Manifestação do Destinatário para um documento
   * fiscal já recebido.
   *
   * ⚠️ Primeira implementação — sem precedente validado em nenhum projeto
   * seu (ver aviso em apps/fiscal-engine/src/acbr/client.ts). O mapeamento
   * de cStat -> AUTORIZADA/REJEITADA acima também é best-effort; revalide
   * contra retornos reais da SEFAZ de homologação antes de confiar em
   * produção.
   */
  async enviar(
    empresaId: string,
    documentoFiscalId: string,
    tipo: TipoEventoManifestacao,
    justificativa?: string
  ) {
    const [empresa, documento] = await Promise.all([
      this.prisma.client.empresa.findUnique({ where: { id: empresaId } }),
      this.prisma.client.documentoFiscal.findUnique({ where: { id: documentoFiscalId } }),
    ]);

    if (!empresa) throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    if (!documento || documento.empresaId !== empresaId) {
      throw new NotFoundException(
        `Documento fiscal ${documentoFiscalId} não encontrado para essa empresa`
      );
    }

    const tentativasAnteriores = await this.prisma.client.manifestacaoEvento.count({
      where: { documentoFiscalId },
    });
    const numeroSequencial = tentativasAnteriores + 1;

    const certificado = await this.certificados.obterParaUso(empresaId);

    const evento = await this.prisma.client.manifestacaoEvento.create({
      data: {
        empresaId,
        documentoFiscalId,
        tipoEvento: tipo,
        status: "PENDENTE",
      },
    });

    try {
      const resultado = await this.fiscalEngine.enviarEvento({
        cnpj: empresa.cnpj,
        codigoUf: empresa.codigoUf,
        ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
        chaveAcesso: documento.chaveAcesso,
        tipoEvento: tipo,
        numeroSequencial,
        justificativa,
        certificado,
      });

      const autorizado = CSTAT_AUTORIZADO.has(resultado.cStat);

      const eventoAtualizado = await this.prisma.client.manifestacaoEvento.update({
        where: { id: evento.id },
        data: {
          status: autorizado ? "AUTORIZADA" : "REJEITADA",
          protocoloSefaz: resultado.protocolo,
          motivoSefaz: resultado.xMotivo,
          enviadoEm: new Date(),
        },
      });

      if (autorizado) {
        await this.prisma.client.documentoFiscal.update({
          where: { id: documentoFiscalId },
          data: { status: "MANIFESTADO" },
        });
      }

      return eventoAtualizado;
    } catch (error) {
      this.logger.error(
        { err: error, documentoFiscalId, tipo },
        "Falha ao enviar manifestação para a SEFAZ"
      );
      return this.prisma.client.manifestacaoEvento.update({
        where: { id: evento.id },
        data: {
          status: "REJEITADA",
          motivoSefaz: error instanceof Error ? error.message : "Erro desconhecido",
          enviadoEm: new Date(),
        },
      });
    }
  }
}
