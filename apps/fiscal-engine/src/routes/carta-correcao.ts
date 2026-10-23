import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { enviarCartaCorrecao } from "../nfe/carta-correcao";
import { assertInternalRequest } from "../config";

const bodySchema = z.object({
  codigoUf: z.number().int().positive(),
  ambiente: z.union([z.literal(1), z.literal(2)]),
  cnpj: z.string().regex(/^\d{14}$/),
  chaveAcesso: z.string().regex(/^\d{44}$/),
  numeroSequencial: z.number().int().min(1).max(20),
  xCorrecao: z.string().min(15).max(1000),
  certificado: z.object({
    pfxBase64: z.string().min(1),
    senha: z.string().min(1),
  }),
});

export async function cartaCorrecaoRoutes(app: FastifyInstance) {
  app.post("/nfe/carta-correcao", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      const resultado = await enviarCartaCorrecao(body);
      return resultado;
    } catch (error) {
      request.log.error({ err: error, chaveAcesso: body.chaveAcesso }, "Falha ao enviar carta de correção");
      reply.code(502);
      return {
        error: "CARTA_CORRECAO_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
