import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { CteDistribuicaoService } from "./cte-distribuicao.service";

@Controller("empresas/:empresaId/cte-distribuicao")
export class CteDistribuicaoController {
  constructor(
    private readonly service: CteDistribuicaoService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  async listar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.listar(empresaId);
  }

  @Post("sincronizar")
  async sincronizar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.sincronizar(empresaId);
  }

  @Post("nsu/zerar")
  async zerarNsu(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.zerarNsu(empresaId);
  }

  @Post(":documentoId/consultar")
  async consultarSituacao(
    @Param("empresaId") empresaId: string,
    @Param("documentoId") documentoId: string,
    @Req() request: AuthenticatedRequest
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.consultarSituacao(empresaId, documentoId);
  }
}
