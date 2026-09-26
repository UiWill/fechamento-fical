import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { z } from "zod";
import { CertificadosService } from "./certificados.service";

// TODO (fase 2): trocar por upload multipart real (@fastify/multipart) em vez
// de base64 no corpo JSON — ok para o scaffold, ruim para arquivos grandes.
const cadastrarSchema = z.object({
  empresaId: z.string().cuid(),
  nomeArquivoOriginal: z.string().min(1),
  pfxBase64: z.string().min(1),
  senha: z.string().min(1),
});

@Controller("certificados")
export class CertificadosController {
  constructor(
    private readonly service: CertificadosService,
    private readonly acesso: AcessoService
  ) {}

  @Post()
  async cadastrar(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    const input = cadastrarSchema.parse(body);
    await this.acesso.empresaDoUsuario(request, input.empresaId);
    const certificado = await this.service.cadastrar({
      ...input,
      pfxBuffer: Buffer.from(input.pfxBase64, "base64"),
    });
    // nunca ecoar conteúdo cifrado/senha na resposta
    return { id: certificado.id, empresaId: certificado.empresaId, validoAte: certificado.validoAte };
  }

  @Get("vencendo/:dias")
  listarVencendo(@Param("dias") dias: string, @Req() request: AuthenticatedRequest) {
    return this.service.listarVencendoEm(Number(dias), this.acesso.organizacaoDoUsuario(request));
  }

  @Get("por-empresa/:empresaId")
  async buscarPorEmpresa(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    const cert = await this.service.buscarResumoPorEmpresa(empresaId);
    return cert ?? null;
  }
}
