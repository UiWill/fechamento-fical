import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import type { FastifyReply } from "fastify";
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

  @Get(":id/arquivo")
  async baixarArquivo(
    @Param("empresaId") empresaId: string,
    @Param("id") id: string,
    @Res() reply: FastifyReply
  ) {
    const { buffer, nomeArquivo } = await this.service.obterArquivo(empresaId, id);
    reply
      .header("Content-Type", "text/plain; charset=iso-8859-1")
      .header("Content-Disposition", `attachment; filename="${nomeArquivo}"`)
      .send(buffer);
  }
}
