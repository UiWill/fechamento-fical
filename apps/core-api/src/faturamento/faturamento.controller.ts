import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { FaturamentoService } from "./faturamento.service";

@Controller("faturamento")
export class FaturamentoController {
  constructor(
    private readonly service: FaturamentoService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  listar(@Req() request: AuthenticatedRequest) {
    return this.service.listarPorOrganizacao(this.acesso.organizacaoDoUsuario(request));
  }

  @Post("gerar")
  gerar(@Body() body: { ano: number; mes: number }, @Req() request: AuthenticatedRequest) {
    return this.service.gerarFaturaDoMes(this.acesso.organizacaoDoUsuario(request), body.ano, body.mes);
  }
}
