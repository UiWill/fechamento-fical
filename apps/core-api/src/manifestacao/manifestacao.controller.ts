import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { TipoEventoManifestacao } from "@afe/shared";
import { ManifestacaoService } from "./manifestacao.service";

@Controller("empresas/:empresaId/manifestacoes")
export class ManifestacaoController {
  constructor(private readonly service: ManifestacaoService) {}

  @Get()
  listar(@Param("empresaId") empresaId: string) {
    return this.service.listarPorEmpresa(empresaId);
  }

  @Post()
  enviar(
    @Param("empresaId") empresaId: string,
    @Body()
    body: {
      documentoFiscalId: string;
      tipo: TipoEventoManifestacao;
      justificativa?: string;
    }
  ) {
    return this.service.enviar(empresaId, body.documentoFiscalId, body.tipo, body.justificativa);
  }
}
