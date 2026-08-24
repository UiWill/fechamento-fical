import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { distribuicaoDFePorUltNSU } from "../acbr/client";
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

export async function distribuicaoDfeRoutes(app: FastifyInstance) {
  app.post("/distribuicao-dfe", async (request, reply) => {
    assertInternalRequest(request.headers["x-internal-key"] as string | undefined);

    const body = bodySchema.parse(request.body);

    try {
      const resultado = await distribuicaoDFePorUltNSU(body);
      return resultado;
    } catch (error) {
      request.log.error({ err: error, cnpj: body.cnpj }, "Falha na Distribuição DFe");
      reply.code(502);
      return {
        error: "DISTRIBUICAO_DFE_FALHOU",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });
}
