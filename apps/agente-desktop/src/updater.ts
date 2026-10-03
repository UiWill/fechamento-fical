/**
 * Atualização automática e silenciosa — sem perguntar nada pro cliente.
 *
 * Antes (Node SEA, executável único) a atualização copiava um .exe por
 * cima do outro via PowerShell. Agora o app é instalado de verdade (NSIS,
 * via electron-builder) — "atualizar" baixa o instalador novo e roda ele
 * em modo silencioso (`/S`). O modo silencioso do NSIS NÃO fecha o app em
 * execução sozinho nem reabre no final (isso só existe na "finish page" do
 * instalador interativo) — por isso tudo é orquestrado por um script
 * PowerShell destacado (mesmo padrão da versão 1.x): espera nosso processo
 * sair de vez, só depois roda o instalador, espera ele terminar, e só
 * então reabre o app. A versão publicada no servidor (ver
 * agentes.service.ts `publicarVersao`) é esse instalador, não mais um
 * executável solto.
 */
import { spawn } from "node:child_process";
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
    info = await buscarVersaoMaisRecente(token, config.versaoAgente);
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

  // Caminho do .exe atual, capturado ANTES de reiniciar — é onde o
  // instalador vai sobrescrever (electron-builder detecta a instalação já
  // existente e reaproveita a mesma pasta), então é esse mesmo caminho que
  // reabre a versão nova depois.
  const caminhoExeAtual = app.getPath("exe");
  const pidAtual = process.pid;
  const scriptAtualizacao = path.join(PASTA_ATUALIZACAO, "atualizar.ps1");

  // IMPORTANTE: não dá pra só rodar o instalador e sair em seguida — o
  // instalador (NSIS /S) e o nosso próprio processo ficariam os DOIS
  // mexendo nos mesmos arquivos ao mesmo tempo (nós ainda de pé, segurando
  // os arquivos; ele tentando sobrescrever), e isso já deixou uma
  // instalação pela metade (ícone/recurso faltando, app parava de abrir
  // sem nem mostrar erro). Em vez disso, um script PowerShell DESTACADO
  // (sobrevive depois que a gente sai) espera nosso processo encerrar de
  // vez, só DEPOIS roda o instalador (e espera ele terminar de verdade,
  // "-Wait"), e só então abre o app novo — nada acontece em paralelo.
  fs.writeFileSync(
    scriptAtualizacao,
    [
      "$ErrorActionPreference = 'SilentlyContinue'",
      `Wait-Process -Id ${pidAtual} -Timeout 30`,
      "Start-Sleep -Seconds 1",
      `Start-Process -FilePath '${instalador}' -ArgumentList '/S' -Wait`,
      `Start-Process -FilePath '${caminhoExeAtual}'`,
      `Remove-Item -Path '${instalador}' -Force`,
      `Remove-Item -Path '${scriptAtualizacao}' -Force`,
    ].join("\n"),
    "utf8"
  );

  console.log("[updater] saindo e deixando o instalador + reabertura por conta do script destacado...");
  const helper = spawn("powershell.exe", ["-NoProfile", "-WindowStyle", "Hidden", "-File", scriptAtualizacao], {
    detached: true,
    stdio: "ignore",
  });
  helper.unref();

  app.quit();
}
