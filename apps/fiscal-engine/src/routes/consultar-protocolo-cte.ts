import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { consultarProtocoloCte } from "../cte/consulta-protocolo-cte";
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

export async function consultarProtocoloCteRoutes(app: FastifyInstance) {
  app.post("/cte/consultar-protocolo", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      const resultado = await consultarProtocoloCte(body);
      return resultado;
    } catch (error) {
      request.log.error({ err: error, chaveAcesso: body.chaveAcesso }, "Falha ao consultar protocolo de CT-e");
      reply.code(502);
      return {
        error: "CONSULTA_PROTOCOLO_CTE_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
