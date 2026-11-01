import { Body, Controller, ForbiddenException, Get, Param, Post, Req } from "@nestjs/common";
import { timingSafeEqual } from "node:crypto";
import type { FastifyRequest } from "fastify";
import { z } from "zod";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { Public } from "../auth/public.decorator";
import { AcessoService } from "../common/acesso/acesso.service";
import { ROTINAS_ESPERADAS, SistemaService } from "./sistema.service";

const registrarRotinaSchema = z.object({
  sucesso: z.boolean(),
  detalhe: z.string().optional(),
});

const NOMES_VALIDOS = new Set(ROTINAS_ESPERADAS.map((r) => r.nome));

// Comparação em tempo constante — evita vazar quanto da chave bateu através
// do tempo de resposta (timing attack). Tamanhos diferentes já são
// suficiente pra dizer "não bate" sem comparar bytes.
function chaveConfere(recebida: string, esperada: string): boolean {
  const a = Buffer.from(recebida);
  const b = Buffer.from(esperada);
  return a.length === b.length && timingSafeEqual(a, b);
}

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
  // então fica @Public().
  //
  // ⚠️ NÃO confiar só no IP de origem aqui: o core-api fica atrás do Caddy
  // (reverse proxy), e toda requisição que chega por ele — inclusive vinda
  // da internet, pelo domínio público — aparece pro Fastify como vinda de
  // 127.0.0.1 (é o Caddy conectando via loopback no core-api, não o
  // cliente real). Um IP "local" não prova que a chamada é local
  // (achado em revisão de segurança automática, 2026-11-01, antes de ir
  // pra produção — a versão anterior desse endpoint confiava só nisso).
  // A proteção de verdade é a chave compartilhada abaixo.
  @Public()
  @Post("rotinas/:nome")
  async registrarRotina(@Param("nome") nome: string, @Body() body: unknown, @Req() request: FastifyRequest) {
    const chaveEsperada = process.env.SISTEMA_INTERNO_KEY;
    const chaveRecebida = request.headers["x-internal-key"];
    if (!chaveEsperada || typeof chaveRecebida !== "string" || !chaveConfere(chaveRecebida, chaveEsperada)) {
      throw new ForbiddenException("Chave interna ausente ou inválida");
    }
    if (!NOMES_VALIDOS.has(nome)) {
      throw new ForbiddenException(`Rotina desconhecida: ${nome}`);
    }
    const input = registrarRotinaSchema.parse(body);
    await this.service.registrarRotina(nome, input.sucesso, input.detalhe);
    return { ok: true };
  }
}
