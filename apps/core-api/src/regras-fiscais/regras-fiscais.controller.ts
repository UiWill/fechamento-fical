import { Body, Controller, ForbiddenException, Get, Param, Post, Req } from "@nestjs/common";
import { criarRegraFiscalSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { RegrasFiscaisService } from "./regras-fiscais.service";

@Controller("regras-fiscais")
export class RegrasFiscaisController {
  constructor(
    private readonly service: RegrasFiscaisService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  listar(@Req() request: AuthenticatedRequest) {
    return this.service.listarPorOrganizacao(this.acesso.organizacaoDoUsuario(request));
  }

  @Post()
  async criar(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    const input = criarRegraFiscalSchema.parse(body);
    const organizacaoId = this.acesso.organizacaoDoUsuario(request);
    if (input.organizacaoId !== organizacaoId) {
      throw new ForbiddenException("Não é possível criar regra em outra organização");
    }
    if (input.empresaId) {
      await this.acesso.garantirEmpresaDaOrganizacao(input.empresaId, organizacaoId);
    }
    return this.service.criar(input);
  }

  @Post("classificar/:empresaId")
  async classificar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.classificarPendentes(empresaId);
  }
}
