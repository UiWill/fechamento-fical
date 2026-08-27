import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { enviarEventoManifestacao } from "../acbr/client";
import { assertInternalRequest } from "../config";

const bodySchema = z.object({
  cnpj: z.string().regex(/^\d{14}$/),
  codigoUf: z.number().int().positive(),
  ambiente: z.union([z.literal(1), z.literal(2)]),
  chaveAcesso: z.string().regex(/^\d{44}$/),
  tipoEvento: z.enum([
    "CONFIRMACAO_OPERACAO",
    "CIENCIA_OPERACAO",
    "DESCONHECIMENTO_OPERACAO",
    "OPERACAO_NAO_REALIZADA",
  ]),
  numeroSequencial: z.number().int().positive(),
  justificativa: z.string().min(15).max(255).optional(),
  certificado: z.object({
    pfxBase64: z.string().min(1),
    senha: z.string().min(1),
  }),
});

export async function manifestacaoRoutes(app: FastifyInstance) {
  app.post("/manifestacao", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      return await enviarEventoManifestacao(body);
    } catch (error) {
      request.log.error({ err: error, chaveAcesso: body.chaveAcesso }, "Falha ao enviar manifestação");
      reply.code(502);
      return {
        error: "MANIFESTACAO_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
