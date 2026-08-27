import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { criarEmpresaSchema } from "@afe/shared";
import { EmpresasService } from "./empresas.service";

@Controller("empresas")
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

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
}
