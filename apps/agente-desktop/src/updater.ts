/**
 * Atualização automática e silenciosa — sem perguntar nada pro cliente.
 * Baixa a versão nova, e como o Windows não deixa sobrescrever um .exe
 * rodando, dispara um script PowerShell destacado que espera este
 * processo terminar, copia o novo por cima, reabre, e só então avisa (a
 * notificação vem do processo NOVO, depois de confirmar que subiu — nunca
 * pergunta antes).
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { buscarVersaoMaisRecente, baixarVersao } from "./api-client";
import { carregarConfig, salvarConfig } from "./config";
import { notificar } from "./notify";

const PASTA_ATUALIZACAO = path.join(os.tmpdir(), "afe-agente-update");
const ARQUIVO_FLAG_POS_ATUALIZACAO = path.join(PASTA_ATUALIZACAO, "atualizado.flag");

function compararVersoes(a: string, b: string): number {
  const partesA = a.split(".").map(Number);
  const partesB = b.split(".").map(Number);
  for (let i = 0; i < Math.max(partesA.length, partesB.length); i++) {
    const diferenca = (partesA[i] ?? 0) - (partesB[i] ?? 0);
    if (diferenca !== 0) return diferenca;
  }
  return 0;
}

/** Chamado uma vez no início do processo — se essa execução é resultado de uma auto-atualização, notifica e limpa a flag. */
export function notificarSeFoiAtualizadoAgora(): void {
  if (!fs.existsSync(ARQUIVO_FLAG_POS_ATUALIZACAO)) return;
  try {
    const versao = fs.readFileSync(ARQUIVO_FLAG_POS_ATUALIZACAO, "utf8").trim();
    notificar("Agente Fiscal", `Atualizado para a versão ${versao}.`);
  } finally {
    fs.rmSync(ARQUIVO_FLAG_POS_ATUALIZACAO, { force: true });
  }
}

export async function verificarAtualizacao(token: string): Promise<void> {
  if (process.platform !== "win32") {
    return; // auto-atualização só faz sentido no binário empacotado (Windows)
  }

  const config = carregarConfig();
  let info;
  try {
    info = await buscarVersaoMaisRecente(token);
  } catch (err) {
    console.error(`[updater] falha ao verificar versão: ${err}`);
    return;
  }

  if (!info.versao || compararVersoes(info.versao, config.versaoAgente) <= 0) return;

  console.log(`[updater] nova versão disponível: ${info.versao} (atual: ${config.versaoAgente})`);

  fs.mkdirSync(PASTA_ATUALIZACAO, { recursive: true });
  const novoExecutavel = path.join(PASTA_ATUALIZACAO, `agente-fiscal-${info.versao}.exe`);

  let conteudo: Buffer;
  try {
    conteudo = await baixarVersao(token, info.versao);
  } catch (err) {
    console.error(`[updater] falha ao baixar a versão ${info.versao}: ${err}`);
    return;
  }
  fs.writeFileSync(novoExecutavel, conteudo);

  // Grava a versão nova ANTES de reiniciar — se o processo novo checar de
  // novo, já não acha versão mais nova (evita loop de atualização).
  config.versaoAgente = info.versao;
  salvarConfig(config);
  fs.writeFileSync(ARQUIVO_FLAG_POS_ATUALIZACAO, info.versao);

  const executavelAtual = process.execPath;
  const scriptAtualizacao = path.join(PASTA_ATUALIZACAO, "atualizar.ps1");
  const pidAtual = process.pid;

  fs.writeFileSync(
    scriptAtualizacao,
    [
      "$ErrorActionPreference = 'SilentlyContinue'",
      `Wait-Process -Id ${pidAtual} -Timeout 30`,
      "Start-Sleep -Seconds 1",
      `Copy-Item -Path '${novoExecutavel}' -Destination '${executavelAtual}' -Force`,
      `Start-Process -FilePath '${executavelAtual}'`,
      `Remove-Item -Path '${novoExecutavel}' -Force`,
      `Remove-Item -Path '${scriptAtualizacao}' -Force`,
    ].join("\n")
  );

  console.log("[updater] aplicando atualização e reiniciando...");
  const helper = spawn("powershell.exe", ["-NoProfile", "-WindowStyle", "Hidden", "-File", scriptAtualizacao], {
    detached: true,
    stdio: "ignore",
  });
  helper.unref();

  process.exit(0);
}
