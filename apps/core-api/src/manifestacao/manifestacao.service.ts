import { Injectable, NotImplementedException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import type { TipoEventoManifestacao } from "@afe/shared";

@Injectable()
export class ManifestacaoService {
  constructor(private readonly prisma: PrismaService) {}

  listarPorEmpresa(empresaId: string) {
    return this.prisma.client.manifestacaoEvento.findMany({
      where: { empresaId },
      orderBy: { criadoEm: "desc" },
    });
  }

  /**
   * FASE 2 — ainda não implementado.
   *
   * Falta: (1) endpoint /enviar-evento no fiscal-engine expondo
   * NFE_EnviarEvento da ACBrLib (nenhum projeto seu usa isso hoje — o mais
   * próximo é nfe_marketplace/src/nfe/eventSender.js, que assina e envia
   * eventos de cancelamento/CC-e "na mão" via SOAP; serve de referência para
   * o formato do evento, mas os tipos de evento de Manifestação do
   * Destinatário — 210200/210210/210220/210240 — precisam ser montados do
   * zero); (2) a lógica de negócio de quando manifestar automaticamente vs.
   * exigir confirmação manual no admin-web.
   */
  async enviar(_empresaId: string, _documentoFiscalId: string, _tipo: TipoEventoManifestacao) {
    throw new NotImplementedException(
      "Envio de Manifestação do Destinatário ainda não implementado — ver comentário em manifestacao.service.ts"
    );
  }
}
