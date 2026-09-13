// Empacota o agente num executavel unico via Node SEA (Single Executable
// Applications, nativo do Node - nao usamos `pkg`/`nexe` porque o projeto
// nao tem dependencia nativa nenhuma pra empacotar, e SEA e mantido pelo
// proprio time do Node, ao contrario de `pkg` que esta sem manutencao).
//
// Passos (documentados oficialmente pelo Node): bundlar tudo num arquivo
// so com esbuild -> gerar o blob SEA -> copiar o binario do node -> injetar
// o blob nessa copia com postject. No Windows nao precisa de mais nada; no
// macOS a copia do node vem assinada e precisa ter a assinatura removida
// antes de injetar o blob, e reassinada (ad-hoc) depois - por isso o passo
// de assinatura so roda condicionalmente.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync, chmodSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raizApp = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pastaSea = path.join(raizApp, "dist-sea");
const nomeExecutavel = process.platform === "win32" ? "agente-fiscal.exe" : "agente-fiscal";
const caminhoExecutavel = path.join(pastaSea, nomeExecutavel);

async function main() {
  mkdirSync(pastaSea, { recursive: true });

  console.log("[build-exe] empacotando com esbuild...");
  await build({
    entryPoints: [path.join(raizApp, "src/main.ts")],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node22",
    outfile: path.join(pastaSea, "bundle.js"),
  });

  const configSea = {
    main: path.join(pastaSea, "bundle.js"),
    output: path.join(pastaSea, "sea-prep.blob"),
    disableExperimentalSEAWarning: true,
  };
  const caminhoConfigSea = path.join(pastaSea, "sea-config.json");
  writeFileSync(caminhoConfigSea, JSON.stringify(configSea, null, 2));

  console.log("[build-exe] gerando blob SEA...");
  execFileSync(process.execPath, ["--experimental-sea-config", caminhoConfigSea]);

  console.log("[build-exe] copiando binario do node...");
  copyFileSync(process.execPath, caminhoExecutavel);
  chmodSync(caminhoExecutavel, 0o755);

  if (process.platform === "darwin") {
    console.log("[build-exe] removendo assinatura (necessario no macOS antes de injetar)...");
    execFileSync("codesign", ["--remove-signature", caminhoExecutavel]);
  }

  console.log("[build-exe] injetando o blob no executavel...");
  const argsPostject = [
    "postject",
    caminhoExecutavel,
    "NODE_SEA_BLOB",
    configSea.output,
    "--sentinel-fuse",
    "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
  ];
  if (process.platform === "darwin") {
    argsPostject.push("--macho-segment-name", "NODE_SEA");
  }
  execFileSync("npx", argsPostject, { stdio: "inherit" });

  if (process.platform === "darwin") {
    console.log("[build-exe] reassinando (ad-hoc)...");
    execFileSync("codesign", ["--sign", "-", caminhoExecutavel]);
  }

  console.log(`[build-exe] pronto: ${caminhoExecutavel}`);
}

main().catch((err) => {
  console.error("[build-exe] falhou:", err);
  process.exit(1);
});
