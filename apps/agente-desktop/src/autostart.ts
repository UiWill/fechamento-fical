/**
 * Início automático com o Windows — grava direto na chave de registro
 * HKCU\...\Run (por usuário, não precisa de admin). Feito via `reg.exe`
 * (já vem com o Windows) em vez de uma biblioteca externa — é uma linha de
 * comando só, não justifica mais uma dependência.
 */
import { execFileSync } from "node:child_process";

const NOME_CHAVE = "AfeAgenteDesktop";
const CAMINHO_REGISTRO = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run";

export function habilitarInicioAutomatico(caminhoExecutavel: string): void {
  if (process.platform !== "win32") {
    console.log("[autostart] plataforma não é Windows — pulando registro de início automático.");
    return;
  }
  try {
    execFileSync("reg", [
      "add",
      CAMINHO_REGISTRO,
      "/v",
      NOME_CHAVE,
      "/t",
      "REG_SZ",
      "/d",
      `"${caminhoExecutavel}"`,
      "/f",
    ]);
    console.log("[autostart] início automático habilitado.");
  } catch (err) {
    console.error(`[autostart] falha ao habilitar início automático: ${err}`);
  }
}
