import path from "node:path";
import os from "node:os";

// Deploy alvo é Windows Server nativo (sem Docker/WSL2) — usa ACBrNFe64.dll.
// Mantém fallback para .so caso este projeto rode em Linux algum dia (dev
// local de outra pessoa, outro host), mas o caminho testado é o Windows.
const LIB_FILENAME = os.platform() === "win32" ? "ACBrNFe64.dll" : "libacbrnfe64.so";

export const config = {
  port: Number(process.env.FISCAL_ENGINE_PORT ?? 3100),
  // 1 = produção, 2 = homologação (padrão SEFAZ)
  ambientePadrao: Number(process.env.ACBR_AMBIENTE ?? 2),
  libPath: process.env.ACBR_LIB_PATH ?? path.resolve(__dirname, "..", "lib", LIB_FILENAME),
  schemasPath: process.env.ACBR_SCHEMAS_PATH ?? path.resolve(__dirname, "..", "lib", "Schemas", "NFe"),
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
