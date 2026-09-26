import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { distribuicaoCtePorUltNSU } from "../cte/distribuicao-cte";
import { assertInternalRequest } from "../config";

const bodySchema = z.object({
  cnpj: z.string().regex(/^\d{14}$/),
  codigoUf: z.number().int().positive(),
  ambiente: z.union([z.literal(1), z.literal(2)]),
  ultimoNsu: z.string().regex(/^\d+$/),
  certificado: z.object({
    pfxBase64: z.string().min(1),
    senha: z.string().min(1),
  }),
});

export async function cteDistribuicaoRoutes(app: FastifyInstance) {
  app.post("/cte/distribuicao-dfe", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);
    const body = bodySchema.parse(request.body);

    try {
      return await distribuicaoCtePorUltNSU(body);
    } catch (error) {
      request.log.error({ err: error, cnpj: body.cnpj }, "Falha na Distribuição DFe de CT-e");
      reply.code(502);
      return {
        error: "DISTRIBUICAO_CTE_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
