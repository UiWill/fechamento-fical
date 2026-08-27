import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { z } from "zod";
import { CertificadosService } from "./certificados.service";

// TODO (fase 2): trocar por upload multipart real (@fastify/multipart) em vez
// de base64 no corpo JSON — ok para o scaffold, ruim para arquivos grandes.
const cadastrarSchema = z.object({
  empresaId: z.string().cuid(),
  nomeArquivoOriginal: z.string().min(1),
  pfxBase64: z.string().min(1),
  senha: z.string().min(1),
  validoAte: z.coerce.date(),
});

@Controller("certificados")
export class CertificadosController {
  constructor(private readonly service: CertificadosService) {}

  @Post()
  async cadastrar(@Body() body: unknown) {
    const input = cadastrarSchema.parse(body);
    const certificado = await this.service.cadastrar({
      ...input,
      pfxBuffer: Buffer.from(input.pfxBase64, "base64"),
    });
    // nunca ecoar conteúdo cifrado/senha na resposta
    return { id: certificado.id, empresaId: certificado.empresaId, validoAte: certificado.validoAte };
  }

  @Get("vencendo/:dias")
  listarVencendo(@Param("dias") dias: string) {
    return this.service.listarVencendoEm(Number(dias));
  }

  @Get("por-empresa/:empresaId")
  async buscarPorEmpresa(@Param("empresaId") empresaId: string) {
    const cert = await this.service.buscarResumoPorEmpresa(empresaId);
    return cert ?? null;
  }
}
