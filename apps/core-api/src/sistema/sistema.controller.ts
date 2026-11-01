import { Body, Controller, ForbiddenException, Get, Param, Post, Req } from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import { z } from "zod";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { Public } from "../auth/public.decorator";
import { AcessoService } from "../common/acesso/acesso.service";
import { SistemaService } from "./sistema.service";

const registrarRotinaSchema = z.object({
  sucesso: z.boolean(),
  detalhe: z.string().optional(),
});

const IPS_LOCAIS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

@Controller("sistema")
export class SistemaController {
  constructor(
    private readonly service: SistemaService,
    private readonly acesso: AcessoService
  ) {}

  @Get("saude")
  obterSaude(@Req() request: AuthenticatedRequest) {
    return this.service.obterSaude(this.acesso.organizacaoDoUsuario(request));
  }

  // Chamado pelo backup-diario.ps1 (roda no próprio servidor, fora do Node)
  // no fim de cada execução — não tem usuário logado pra autenticar com JWT,
  // então fica @Public() e a segurança vem de só aceitar chamada vinda do
  // próprio servidor (loopback), nunca de fora.
  @Public()
  @Post("rotinas/:nome")
  async registrarRotina(@Param("nome") nome: string, @Body() body: unknown, @Req() request: FastifyRequest) {
    if (!IPS_LOCAIS.has(request.ip)) {
      throw new ForbiddenException("Essa rota só aceita chamadas do próprio servidor");
    }
    const input = registrarRotinaSchema.parse(body);
    await this.service.registrarRotina(nome, input.sucesso, input.detalhe);
    return { ok: true };
  }
}
