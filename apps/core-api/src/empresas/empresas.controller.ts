import { BadRequestException, Body, Controller, ForbiddenException, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { criarEmpresaSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { EmpresasService } from "./empresas.service";

@Controller("empresas")
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  private organizacaoIdDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode acessar empresas");
    }
    return request.usuario.organizacaoId;
  }

  @Get()
  listar(@Req() request: AuthenticatedRequest) {
    return this.service.listarPorOrganizacao(this.organizacaoIdDoUsuario(request));
  }

  @Get("consulta-cnpj/:cnpj")
  consultarCnpj(@Param("cnpj") cnpj: string) {
    return this.service.consultarCnpj(cnpj);
  }

  @Get(":id")
  buscarPorId(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.service.buscarPorId(id, this.organizacaoIdDoUsuario(request));
  }

  @Post()
  criar(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    const input = criarEmpresaSchema.parse(body);
    const organizacaoId = this.organizacaoIdDoUsuario(request);
    if (input.organizacaoId !== organizacaoId) {
      throw new ForbiddenException("Não é possível cadastrar empresa em outra organização");
    }
    return this.service.criar(input);
  }

  @Patch(":id/ativar")
  ativar(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.service.ativar(id, this.organizacaoIdDoUsuario(request));
  }

  @Patch(":id/desativar")
  desativar(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.service.desativar(id, this.organizacaoIdDoUsuario(request));
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
