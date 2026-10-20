// Empacota o app Electron com esbuild: processo principal + preload (Node,
// sem bundlar o próprio pacote "electron") e as duas telas (navegador).
// Depois disso, `electron-builder` (script "dist") empacota tudo isso +
// node_modules num instalador NSIS de verdade.
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raizApp = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const saida = path.join(raizApp, "dist-electron");

mkdirSync(saida, { recursive: true });

// A versão embutida no build vira o "de onde eu vim" que o updater usa pra
// comparar com a versão publicada no servidor — fonte da verdade é o
// package.json (AFE_AGENTE_VERSAO_BUILD deixa sobrescrever em builds de teste).
const packageJson = JSON.parse(readFileSync(path.join(raizApp, "package.json"), "utf8"));
const versaoAgente = process.env.AFE_AGENTE_VERSAO_BUILD ?? packageJson.version;
// api.fechafiscal.com.br (2026-10-19) fica atras da Cloudflare com uma
// Origin Rule (porta 443 do visitante -> porta 8443 do servidor aqui por
// baixo) -- diferente do fiscal-api.dnotas.com.br:8443 antigo, essa porta
// 443 padrao passa direto por VPN/firewall corporativo que bloqueia
// portas nao-padrao (motivo de alguns clientes nao conseguirem usar o
// agente em VPN). O dominio antigo continua no ar (nao foi desligado).
const urlApi = process.env.AFE_CORE_API_URL_BUILD ?? "https://api.fechafiscal.com.br";

async function main() {
  console.log(`[build] versão ${versaoAgente}, API ${urlApi}`);

  await build({
    entryPoints: [path.join(raizApp, "electron/main.ts")],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    external: ["electron"],
    define: {
      "process.env.AFE_CORE_API_URL": JSON.stringify(urlApi),
      "process.env.AFE_AGENTE_VERSAO_BUILD": JSON.stringify(versaoAgente),
    },
    outfile: path.join(saida, "main.js"),
  });

  await build({
    entryPoints: [path.join(raizApp, "electron/preload.ts")],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    external: ["electron"],
    outfile: path.join(saida, "preload.js"),
  });

  for (const tela of ["setup", "status"]) {
    await build({
      entryPoints: [path.join(raizApp, `electron/renderer/${tela}.ts`)],
      bundle: true,
      platform: "browser",
      format: "iife",
      target: "chrome120",
      outfile: path.join(saida, `renderer/${tela}.js`),
    });
    cpSync(path.join(raizApp, `electron/renderer/${tela}.html`), path.join(saida, `renderer/${tela}.html`));
  }

  // Ícone fica em apps/agente-desktop/assets/ (não precisa copiar: tanto o
  // main.ts em runtime quanto o electron-builder na hora de empacotar
  // leem direto de lá, relativo à raiz do projeto).
  // package.json mínimo dentro do asar — electron-builder já cuida disso a
  // partir do "main" do package.json real, isso aqui é só pro `pnpm dev`.
  writeFileSync(
    path.join(saida, "package.json"),
    JSON.stringify({ name: "agente-fiscal", version: versaoAgente, main: "main.js" }, null, 2)
  );

  console.log(`[build] pronto em ${saida}`);
}

main().catch((err) => {
  console.error("[build] falhou:", err);
  process.exit(1);
});
