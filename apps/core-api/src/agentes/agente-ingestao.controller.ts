import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import { uploadDocumentoAgenteSchema } from "@afe/shared";
import { Public } from "../auth/public.decorator";
import { AgenteTokenGuard, type AgenteAuthenticatedRequest } from "./agente-token.guard";
import { AgentesService } from "./agentes.service";

/**
 * Rotas chamadas pelo agente desktop (nunca por um humano) — autenticadas
 * pelo AgenteTokenGuard (header x-agente-token), não pelo JwtAuthGuard
 * global. @Public() aqui só isenta do JwtAuthGuard; o guard de agente
 * continua obrigatório em cada rota.
 */
@Controller("agente-ingestao")
@Public()
@UseGuards(AgenteTokenGuard)
export class AgenteIngestaoController {
  constructor(private readonly service: AgentesService) {}

  @Post("heartbeat")
  heartbeat(@Body() body: { versaoAgente?: string }, @Req() request: AgenteAuthenticatedRequest) {
    return this.service.registrarHeartbeat(request.agenteToken!, body.versaoAgente ?? "desconhecida", request.ip);
  }

  @Get("escopo")
  async escopo(@Req() request: AgenteAuthenticatedRequest) {
    const empresas = await this.service.resolverEmpresasAutorizadas(request.agenteToken!);
    return { cnpjs: empresas.map((e) => e.cnpj) };
  }

  @Post("documentos")
  async documentos(@Body() body: unknown, @Req() request: AgenteAuthenticatedRequest) {
    const input = uploadDocumentoAgenteSchema.parse(body);
    const resultados = await this.service.processarLoteDocumentos(request.agenteToken!, input.documentos);
    return { resultados };
  }

  @Get("versoes/mais-recente")
  async versaoMaisRecente() {
    const registro = await this.service.obterVersaoMaisRecente();
    if (!registro) return { versao: null, obrigatoria: false, urlDownload: null };
    return {
      versao: registro.versao,
      obrigatoria: registro.obrigatoria,
      urlDownload: `/agente-ingestao/versoes/${registro.versao}/download`,
    };
  }

  @Get("versoes/:versao/download")
  async baixarVersao(@Param("versao") versao: string, @Res() reply: FastifyReply) {
    const buffer = await this.service.obterArquivoVersao(versao);
    reply
      .header("Content-Type", "application/octet-stream")
      .header("Content-Disposition", `attachment; filename="agente-fiscal-${versao}.exe"`)
      .send(buffer);
  }

  /**
   * Link único de "baixar instalador" pro admin-web mostrar pro cliente —
   * resolve a versão mais recente sozinho, pra não precisar saber o
   * número da versão de antemão. Pensado pra ser clicado direto no
   * navegador (token vem via query string, ver AgenteTokenGuard).
   */
  @Get("instalador")
  async baixarInstalador(@Res() reply: FastifyReply) {
    const registro = await this.service.obterVersaoMaisRecente();
    if (!registro) {
      reply.status(404).send({ message: "Nenhuma versão do agente foi publicada ainda" });
      return;
    }
    const buffer = await this.service.obterArquivoVersao(registro.versao);
    reply
      .header("Content-Type", "application/octet-stream")
      .header("Content-Disposition", `attachment; filename="agente-fiscal-${registro.versao}.exe"`)
      .send(buffer);
  }
}
