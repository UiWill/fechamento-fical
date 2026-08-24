import path from "node:path";

export const config = {
  port: Number(process.env.FISCAL_ENGINE_PORT ?? 3100),
  // 1 = produção, 2 = homologação (padrão SEFAZ)
  ambientePadrao: Number(process.env.ACBR_AMBIENTE ?? 2),
  libPath: path.resolve(__dirname, "..", "lib", "libacbrnfe64.so"),
  schemasPath: path.resolve(__dirname, "..", "lib", "Schemas", "NFe"),
  // Chave interna simples entre core-api e fiscal-engine — o fiscal-engine
  // NUNCA deve ficar exposto publicamente (fica só na rede interna do compose).
  internalApiKey: process.env.FISCAL_ENGINE_INTERNAL_KEY,
};

export function assertInternalRequest(headerValue: string | undefined): void {
  if (!config.internalApiKey) return; // dev sem chave configurada
  if (headerValue !== config.internalApiKey) {
    const err = new Error("Não autorizado");
    (err as Error & { statusCode?: number }).statusCode = 401;
    throw err;
  }
}
