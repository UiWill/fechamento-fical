import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { ExportacaoTxtService } from "./exportacao-txt.service";

@Controller("empresas/:empresaId/exportacoes-txt")
export class ExportacaoTxtController {
  constructor(
    private readonly service: ExportacaoTxtService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  async listar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.listarPorEmpresa(empresaId);
  }

  @Post()
  async gerar(
    @Param("empresaId") empresaId: string,
    @Req() request: AuthenticatedRequest,
    @Body() body: { periodoInicio: string; periodoFim: string }
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
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
    @Req() request: AuthenticatedRequest,
    @Res() reply: FastifyReply
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    const { buffer, nomeArquivo } = await this.service.obterArquivo(empresaId, id);
    reply
      .header("Content-Type", "text/plain; charset=iso-8859-1")
      .header("Content-Disposition", `attachment; filename="${nomeArquivo}"`)
      .send(buffer);
  }
}
