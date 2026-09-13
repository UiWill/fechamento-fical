import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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
}
