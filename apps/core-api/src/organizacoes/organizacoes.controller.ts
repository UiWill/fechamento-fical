import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrganizacoesService } from "./organizacoes.service";

@Controller("organizacoes")
export class OrganizacoesController {
  constructor(private readonly service: OrganizacoesService) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(":id")
  buscarPorId(@Param("id") id: string) {
    return this.service.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: { razaoSocial: string; cnpj: string; emailContato: string }) {
    return this.service.criar(body);
  }
}
