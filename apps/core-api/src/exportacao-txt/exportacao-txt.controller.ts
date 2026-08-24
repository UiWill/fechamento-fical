import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ExportacaoTxtService } from "./exportacao-txt.service";

@Controller("empresas/:empresaId/exportacoes-txt")
export class ExportacaoTxtController {
  constructor(private readonly service: ExportacaoTxtService) {}

  @Get()
  listar(@Param("empresaId") empresaId: string) {
    return this.service.listarPorEmpresa(empresaId);
  }

  @Post()
  gerar(
    @Param("empresaId") empresaId: string,
    @Body() body: { periodoInicio: string; periodoFim: string }
  ) {
    return this.service.gerar(
      empresaId,
      new Date(body.periodoInicio),
      new Date(body.periodoFim)
    );
  }
}
