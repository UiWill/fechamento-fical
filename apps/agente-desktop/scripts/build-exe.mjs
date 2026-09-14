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
import { copyFileSync, mkdirSync, writeFileSync, chmodSync, readSync, writeSync, openSync, closeSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rcedit } from "rcedit";

const IMAGE_SUBSYSTEM_WINDOWS_CUI = 3; // console - abre janela de terminal preta
const IMAGE_SUBSYSTEM_WINDOWS_GUI = 2; // "janela" - roda sem abrir janela nenhuma

/**
 * Troca o "subsistema" do PE de Console pra GUI direto nos bytes do
 * executavel, sem precisar do Visual Studio Build Tools (que teria o
 * `editbin`, a ferramenta "oficial" pra isso). O campo Subsystem fica no
 * mesmo offset (0x44 dentro do Optional Header) tanto em PE32 quanto em
 * PE32+ (64-bit) - BaseOfData(4 bytes, so existe em PE32) e removido e
 * ImageBase vira 8 bytes em vez de 4 no PE32+, entao os bytes antes do
 * Subsystem somam igual nos dois formatos. Console.log/error continuam
 * existindo no codigo - no Windows, escrever num stdout sem console
 * anexado so retorna silenciosamente, nao derruba o processo.
 */
function removerJanelaDeConsole(caminhoExecutavel) {
  const fd = openSync(caminhoExecutavel, "r+");
  try {
    const bufOffsetPe = Buffer.alloc(4);
    readSync(fd, bufOffsetPe, 0, 4, 0x3c);
    const offsetPe = bufOffsetPe.readUInt32LE(0);

    const assinatura = Buffer.alloc(4);
    readSync(fd, assinatura, 0, 4, offsetPe);
    if (assinatura.toString("ascii") !== "PE\0\0") {
      throw new Error(`Assinatura PE inesperada em ${caminhoExecutavel} - abortando pra nao corromper o binario.`);
    }

    const offsetSubsystem = offsetPe + 4 /* assinatura */ + 20 /* COFF header */ + 0x44;
    const bufSubsystem = Buffer.alloc(2);
    readSync(fd, bufSubsystem, 0, 2, offsetSubsystem);
    const subsystemAtual = bufSubsystem.readUInt16LE(0);

    if (subsystemAtual === IMAGE_SUBSYSTEM_WINDOWS_GUI) {
      console.log("[build-exe] subsistema já é GUI, nada a fazer.");
      return;
    }
    if (subsystemAtual !== IMAGE_SUBSYSTEM_WINDOWS_CUI) {
      throw new Error(
        `Subsystem atual (${subsystemAtual}) não é o esperado (Console=3) - abortando pra não corromper o binário.`
      );
    }

    const novoValor = Buffer.alloc(2);
    novoValor.writeUInt16LE(IMAGE_SUBSYSTEM_WINDOWS_GUI, 0);
    writeSync(fd, novoValor, 0, 2, offsetSubsystem);
    console.log("[build-exe] subsistema trocado pra GUI - não abre janela de console mais.");
  } finally {
    closeSync(fd);
  }
}

const raizApp = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pastaSea = path.join(raizApp, "dist-sea");
const nomeExecutavel = process.platform === "win32" ? "agente-fiscal.exe" : "agente-fiscal";
const caminhoExecutavel = path.join(pastaSea, nomeExecutavel);

// URL do core-api embutida no binario em tempo de build (nao da pra
// depender de variavel de ambiente no PC do cliente - ninguem la vai
// configurar isso). Pode trocar via env var só na hora de gerar o build
// (ex: build de teste apontando pro localhost), nunca em runtime no
// cliente final.
const URL_API_PADRAO = "https://fiscal-api.dnotas.com.br:8443";
const urlApi = process.env.AFE_CORE_API_URL_BUILD ?? URL_API_PADRAO;

// A versao que vai ser publicada via POST /agentes/versoes precisa bater
// com a que fica embutida aqui, senao o agente nasce achando que e uma
// versao antiga e se auto-atualiza pra ele mesmo, a toa, na primeira
// verificacao. Fonte da verdade: version do package.json — lembrar de
// atualizar os dois juntos ao publicar uma versao nova.
const packageJson = JSON.parse(readFileSync(path.join(raizApp, "package.json"), "utf8"));
const versaoAgente = process.env.AFE_AGENTE_VERSAO_BUILD ?? packageJson.version;

async function main() {
  mkdirSync(pastaSea, { recursive: true });

  console.log(`[build-exe] empacotando com esbuild (API: ${urlApi}, versão: ${versaoAgente})...`);
  await build({
    entryPoints: [path.join(raizApp, "src/main.ts")],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node22",
    define: {
      "process.env.AFE_CORE_API_URL": JSON.stringify(urlApi),
      "process.env.AFE_AGENTE_VERSAO_BUILD": JSON.stringify(versaoAgente),
    },
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

  if (process.platform === "win32") {
    // Tem que ser ANTES do postject injetar o blob do SEA: o rcedit
    // trava (nao da erro, so fica parado pra sempre) quando o PE ja tem
    // aquela secao extra injetada - ele so lida bem com um PE "normal",
    // igual o node.exe original antes de virar SEA.
    const caminhoIcone = path.join(raizApp, "assets", "agente-fiscal.ico");
    if (existsSync(caminhoIcone)) {
      console.log("[build-exe] aplicando ícone (antes de injetar o blob)...");
      await rcedit(caminhoExecutavel, { icon: caminhoIcone });
    } else {
      console.log("[build-exe] ícone não encontrado em assets/agente-fiscal.ico — pulando (não é obrigatório).");
    }
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
  // No Windows, "npx" e um .cmd, e execFileSync so resolve isso com
  // shell:true (sem isso da ENOENT mesmo com o npx instalado e no PATH -
  // e um comportamento conhecido do child_process no Windows).
  execFileSync("npx", argsPostject, { stdio: "inherit", shell: process.platform === "win32" });

  if (process.platform === "darwin") {
    console.log("[build-exe] reassinando (ad-hoc)...");
    execFileSync("codesign", ["--sign", "-", caminhoExecutavel]);
  }

  if (process.platform === "win32") {
    console.log("[build-exe] removendo janela de console (roda em segundo plano)...");
    removerJanelaDeConsole(caminhoExecutavel);
  }

  console.log(`[build-exe] pronto: ${caminhoExecutavel}`);
}

main().catch((err) => {
  console.error("[build-exe] falhou:", err);
  process.exit(1);
});
