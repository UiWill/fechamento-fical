/**
 * Atualização automática e silenciosa — sem perguntar nada pro cliente.
 *
 * Antes (Node SEA, executável único) a atualização copiava um .exe por
 * cima do outro via PowerShell. Agora o app é instalado de verdade (NSIS,
 * em Program Files, via electron-builder) — então "atualizar" passa a ser
 * baixar o instalador novo e rodar ele em modo silencioso (`/S`), que é a
 * forma suportada pelo instalador que o electron-builder gera (ele mesmo
 * sabe fechar o app em execução antes de sobrescrever os arquivos e abrir
 * de novo no final). A versão publicada no servidor (ver
 * agentes.service.ts `publicarVersao`) passa a ser esse instalador, não
 * mais um executável solto.
 */
import { execFile } from "node:child_process";
import { app } from "electron";
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
  if (process.platform !== "win32" || !app.isPackaged) {
    return; // auto-atualização só faz sentido no app instalado (Windows)
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
  const instalador = path.join(PASTA_ATUALIZACAO, `agente-fiscal-setup-${info.versao}.exe`);

  let conteudo: Buffer;
  try {
    conteudo = await baixarVersao(token, info.versao);
  } catch (err) {
    console.error(`[updater] falha ao baixar a versão ${info.versao}: ${err}`);
    return;
  }
  fs.writeFileSync(instalador, conteudo);

  // Grava a versão nova ANTES de reiniciar — se o processo novo checar de
  // novo, já não acha versão mais nova (evita loop de atualização).
  config.versaoAgente = info.versao;
  salvarConfig(config);
  fs.writeFileSync(ARQUIVO_FLAG_POS_ATUALIZACAO, info.versao);

  console.log("[updater] rodando instalador silencioso e encerrando...");
  // /S = modo silencioso do NSIS (electron-builder gera o instalador já
  // preparado pra isso); ele mesmo fecha o app em execução, substitui os
  // arquivos em Program Files e reabre no final.
  const processoInstalador = execFile(instalador, ["/S"], { windowsHide: true });
  processoInstalador.unref();

  // Dá um instante pro instalador começar antes de sair — soltando o
  // processo na hora pode fazer o instalador tentar fechar um processo
  // que já nem existe mais e se confundir.
  setTimeout(() => app.quit(), 1500);
}
