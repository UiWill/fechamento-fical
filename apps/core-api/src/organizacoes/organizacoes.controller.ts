import { Controller, ForbiddenException, Get, NotFoundException, Param, Post, Req } from "@nestjs/common";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { OrganizacoesService } from "./organizacoes.service";

/**
 * Cada conta só enxerga a própria organização. Antes, GET /organizacoes
 * devolvia todas as organizações do sistema (nome, CNPJ e e-mail de todos os
 * clientes) pra qualquer usuário logado, e POST criava organização solta.
 * Novas organizações nascem só pelo cadastro público (/auth/registrar).
 */
@Controller("organizacoes")
export class OrganizacoesController {
  constructor(
    private readonly service: OrganizacoesService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  async listar(@Req() request: AuthenticatedRequest) {
    const propria = await this.service.buscarPorId(this.acesso.organizacaoDoUsuario(request));
    return [propria];
  }

  @Get(":id")
  buscarPorId(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    if (id !== this.acesso.organizacaoDoUsuario(request)) {
      throw new NotFoundException(`Organização ${id} não encontrada`);
    }
    return this.service.buscarPorId(id);
  }

  @Post()
  criar() {
    throw new ForbiddenException("Organizações são criadas pelo cadastro público de conta");
  }
}
