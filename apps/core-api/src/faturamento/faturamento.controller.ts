import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FaturamentoService } from "./faturamento.service";

@Controller("faturamento")
export class FaturamentoController {
  constructor(private readonly service: FaturamentoService) {}

  @Get()
  listar(@Query("organizacaoId") organizacaoId: string) {
    return this.service.listarPorOrganizacao(organizacaoId);
  }

  @Post("gerar")
  gerar(@Body() body: { organizacaoId: string; ano: number; mes: number }) {
    return this.service.gerarFaturaDoMes(body.organizacaoId, body.ano, body.mes);
  }
}
