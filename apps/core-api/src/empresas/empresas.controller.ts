import { BadRequestException, Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { criarEmpresaSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { EmpresasService } from "./empresas.service";

@Controller("empresas")
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  private organizacaoIdDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode alterar empresas");
    }
    return request.usuario.organizacaoId;
  }

  @Get()
  listar(@Query("organizacaoId") organizacaoId: string) {
    return this.service.listarPorOrganizacao(organizacaoId);
  }

  @Get(":id")
  buscarPorId(@Param("id") id: string) {
    return this.service.buscarPorId(id);
  }

  @Get("consulta-cnpj/:cnpj")
  consultarCnpj(@Param("cnpj") cnpj: string) {
    return this.service.consultarCnpj(cnpj);
  }

  @Post()
  criar(@Body() body: unknown) {
    const input = criarEmpresaSchema.parse(body);
    return this.service.criar(input);
  }

  @Patch(":id/ativar")
  ativar(@Param("id") id: string) {
    return this.service.ativar(id);
  }

  @Patch(":id/desativar")
  desativar(@Param("id") id: string) {
    return this.service.desativar(id);
  }

  @Patch(":id/ambiente")
  alterarAmbiente(@Param("id") id: string, @Body() body: unknown, @Req() request: AuthenticatedRequest) {
    const ambiente = (body as { ambiente?: unknown })?.ambiente;
    if (ambiente !== "PRODUCAO" && ambiente !== "HOMOLOGACAO") {
      throw new BadRequestException('ambiente deve ser "PRODUCAO" ou "HOMOLOGACAO"');
    }
    return this.service.alterarAmbiente(id, this.organizacaoIdDoUsuario(request), ambiente);
  }
}
