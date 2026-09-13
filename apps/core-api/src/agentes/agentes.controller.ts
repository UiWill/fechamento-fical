import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req } from "@nestjs/common";
import { criarAgenteTokenSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AgentesService } from "./agentes.service";

/**
 * Rotas administrativas (protegidas pelo JwtAuthGuard global, igual todo o
 * resto do core-api) — emitir/listar/revogar tokens de instalação do
 * agente desktop. Diferente do resto do sistema hoje (que não checa
 * `papel` em lugar nenhum), aqui vale a pena um mínimo de RBAC: emitir um
 * token é emitir uma credencial que injeta documentos fiscais no sistema.
 */
@Controller("agentes")
export class AgentesController {
  constructor(private readonly service: AgentesService) {}

  @Post("tokens")
  gerarToken(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    if (request.usuario?.papel === "OPERADOR") {
      throw new ForbiddenException("Apenas administradores podem gerar tokens de agente");
    }
    const input = criarAgenteTokenSchema.parse(body);
    return this.service.gerarToken(input);
  }

  @Get("tokens")
  listarTokens(@Query("organizacaoId") organizacaoId: string) {
    return this.service.listarTokens(organizacaoId);
  }

  @Post("tokens/:id/revogar")
  revogarToken(@Param("id") id: string) {
    return this.service.revogarToken(id);
  }

  /**
   * Registra uma versão nova como vigente. O .exe já precisa estar no
   * MinIO antes de chamar isso — ver comentário em agentes.service.ts.
   */
  @Post("versoes")
  publicarVersao(
    @Body() body: { versao: string; obrigatoria?: boolean; notas?: string },
    @Req() request: AuthenticatedRequest
  ) {
    if (request.usuario?.papel === "OPERADOR") {
      throw new ForbiddenException("Apenas administradores podem publicar versões do agente");
    }
    return this.service.publicarVersao(body);
  }
}
