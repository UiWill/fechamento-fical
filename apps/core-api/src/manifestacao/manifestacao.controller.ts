import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import type { TipoEventoManifestacao } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { ManifestacaoService } from "./manifestacao.service";

@Controller("empresas/:empresaId/manifestacoes")
export class ManifestacaoController {
  constructor(
    private readonly service: ManifestacaoService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  async listar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.listarPorEmpresa(empresaId);
  }

  @Post()
  async enviar(
    @Param("empresaId") empresaId: string,
    @Req() request: AuthenticatedRequest,
    @Body()
    body: {
      documentoFiscalId: string;
      tipo: TipoEventoManifestacao;
      justificativa?: string;
    }
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.enviar(empresaId, body.documentoFiscalId, body.tipo, body.justificativa);
  }
}
