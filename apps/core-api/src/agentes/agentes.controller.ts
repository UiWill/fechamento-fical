import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Req } from "@nestjs/common";
import { criarAgenteTokenSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AgentesService } from "./agentes.service";

/**
 * Rotas administrativas (protegidas pelo JwtAuthGuard global, igual todo o
 * resto do core-api) — emitir/listar/revogar tokens de instalação do
 * agente desktop. Diferente do resto do sistema hoje (que não checa
 * `papel` em lugar nenhum), aqui vale a pena um mínimo de RBAC: emitir um
 * token é emitir uma credencial que injeta documentos fiscais no sistema.
 *
 * A organização usada em cada operação vem sempre do JWT
 * (`request.usuario.organizacaoId`), nunca de query/body — usar o que o
 * cliente manda ali permitiria uma organização mexer nos tokens de outra
 * só sabendo/adivinhando o id (achado numa revisão de segurança).
 */
@Controller("agentes")
export class AgentesController {
  constructor(private readonly service: AgentesService) {}

  @Post("tokens")
  gerarToken(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    if (request.usuario?.papel === "OPERADOR") {
      throw new ForbiddenException("Apenas administradores podem gerar tokens de agente");
    }
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode gerar token de agente");
    }
    const input = criarAgenteTokenSchema.parse(body);
    return this.service.gerarToken(input, request.usuario.organizacaoId);
  }

  @Get("tokens")
  listarTokens(@Req() request: AuthenticatedRequest) {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não tem agentes pra listar");
    }
    return this.service.listarTokens(request.usuario.organizacaoId);
  }

  @Post("tokens/:id/revogar")
  revogarToken(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode revogar token de agente");
    }
    return this.service.revogarToken(id, request.usuario.organizacaoId);
  }

  @Delete("tokens/:id")
  excluirToken(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    if (request.usuario?.papel === "OPERADOR") {
      throw new ForbiddenException("Apenas administradores podem excluir instalações de agente");
    }
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode excluir instalações de agente");
    }
    return this.service.excluirToken(id, request.usuario.organizacaoId);
  }

  /**
   * Registra uma versão nova como vigente. O .exe já precisa estar no
   * storage antes de chamar isso — ver comentário em agentes.service.ts.
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
