import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { consultarProtocolo } from "../acbr/client";
import { assertInternalRequest } from "../config";

const bodySchema = z.object({
  codigoUf: z.number().int().positive(),
  ambiente: z.union([z.literal(1), z.literal(2)]),
  chaveAcesso: z.string().regex(/^\d{44}$/),
  certificado: z.object({
    pfxBase64: z.string().min(1),
    senha: z.string().min(1),
  }),
});

export async function consultarProtocoloRoutes(app: FastifyInstance) {
  app.post("/nfe/consultar-protocolo", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      const resultado = await consultarProtocolo(body);
      return resultado;
    } catch (error) {
      request.log.error({ err: error, chaveAcesso: body.chaveAcesso }, "Falha ao consultar protocolo");
      reply.code(502);
      return {
        error: "CONSULTA_PROTOCOLO_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
