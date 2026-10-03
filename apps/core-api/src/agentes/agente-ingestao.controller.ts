import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import { uploadDocumentoAgenteSchema } from "@afe/shared";
import { Public } from "../auth/public.decorator";
import { AgenteTokenGuard, type AgenteAuthenticatedRequest } from "./agente-token.guard";
import { AgentesService } from "./agentes.service";

/**
 * Rotas chamadas pelo agente desktop (nunca por um humano) — @Public() na
 * classe só isenta do JwtAuthGuard global (não faz sentido pedir login de
 * usuário aqui). As rotas que leem/gravam dado de cliente (heartbeat,
 * escopo, documentos) exigem AgenteTokenGuard (header x-agente-token) em
 * cada uma. As rotas de versão/instalador ficam sem esse guard de
 * propósito: o .exe é um programa genérico, sem nenhum dado de cliente
 * embutido (o token só é colado depois, na configuração inicial) — não há
 * segredo pra proteger em "qual é a versão mais recente" nem em baixar o
 * binário em si, e exigir token aqui só forçaria colocar um token de
 * verdade numa URL (link mandado por e-mail/WhatsApp, foco de
 * vazamento por logs/histórico) sem ganhar nenhuma proteção real.
 */
@Controller("agente-ingestao")
@Public()
export class AgenteIngestaoController {
  constructor(private readonly service: AgentesService) {}

  @Post("heartbeat")
  @UseGuards(AgenteTokenGuard)
  heartbeat(
    @Body() body: { versaoAgente?: string; telemetria?: unknown },
    @Req() request: AgenteAuthenticatedRequest
  ) {
    return this.service.registrarHeartbeat(
      request.agenteToken!,
      body.versaoAgente ?? "desconhecida",
      request.ip,
      body.telemetria
    );
  }

  @Get("escopo")
  @UseGuards(AgenteTokenGuard)
  async escopo(@Req() request: AgenteAuthenticatedRequest) {
    const empresas = await this.service.resolverEmpresasAutorizadas(request.agenteToken!);
    return { cnpjs: empresas.map((e) => e.cnpj) };
  }

  @Post("documentos")
  @UseGuards(AgenteTokenGuard)
  async documentos(@Body() body: unknown, @Req() request: AgenteAuthenticatedRequest) {
    const input = uploadDocumentoAgenteSchema.parse(body);
    const resultados = await this.service.processarLoteDocumentos(request.agenteToken!, input.documentos);
    return { resultados };
  }

  /**
   * Checagem de auto-atualização, chamada pelo próprio agente — fica
   * desligada de propósito (sempre "nenhuma versão nova") desde a troca
   * pra Electron/instalador NSIS (versão 2.0.0): o auto-update dos agentes
   * antigos (1.x, Node SEA) foi feito pra copiar um .exe solto por cima do
   * outro, incompatível com o instalador novo — se oferecêssemos a 2.0.0
   * aqui, um agente antigo rodando sozinho numa máquina de cliente ia
   * tentar "atualizar" baixando o instalador e abrindo ele sem ninguém
   * esperar. Essa rota não sabe nem qual token está chamando (de
   * propósito, não exige AgenteTokenGuard — ver comentário da classe), e a
   * telemetria do heartbeat também não é usada aqui, então não dá pra
   * diferenciar com segurança quem já está na 2.0.0 de quem ainda está na
   * 1.x só por essa chamada. O download manual (botão no admin-web) é uma
   * rota separada (`/instalador`) e continua funcionando normal.
   */
  @Get("versoes/mais-recente")
  versaoMaisRecente() {
    return { versao: null, obrigatoria: false, urlDownload: null };
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
   * resolve a versão mais recente sozinha, pra não precisar saber o
   * número da versão de antemão. Sem guard de propósito, ver comentário
   * da classe.
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
