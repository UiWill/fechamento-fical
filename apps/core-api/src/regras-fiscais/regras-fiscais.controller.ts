import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { criarRegraFiscalSchema } from "@afe/shared";
import { RegrasFiscaisService } from "./regras-fiscais.service";

@Controller("regras-fiscais")
export class RegrasFiscaisController {
  constructor(private readonly service: RegrasFiscaisService) {}

  @Get()
  listar(@Query("organizacaoId") organizacaoId: string) {
    return this.service.listarPorOrganizacao(organizacaoId);
  }

  @Post()
  criar(@Body() body: unknown) {
    const input = criarRegraFiscalSchema.parse(body);
    return this.service.criar(input);
  }
}
