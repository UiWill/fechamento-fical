import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { statusServico } from "../acbr/client";
import { assertInternalRequest } from "../config";

const bodySchema = z.object({
  codigoUf: z.number().int().positive(),
  ambiente: z.union([z.literal(1), z.literal(2)]),
});

export async function statusServicoRoutes(app: FastifyInstance) {
  app.post("/status-servico", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      return await statusServico(body);
    } catch (error) {
      request.log.error({ err: error }, "Falha ao consultar status do serviço SEFAZ");
      reply.code(502);
      return {
        error: "STATUS_SERVICO_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
