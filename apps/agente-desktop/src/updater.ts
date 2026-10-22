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
import { carregarConfig, salvarConfig, PASTA_CONFIG } from "./config";
import { notificar } from "./notify";

const PASTA_ATUALIZACAO = path.join(os.tmpdir(), "afe-agente-update");
const ARQUIVO_FLAG_POS_ATUALIZACAO = path.join(PASTA_ATUALIZACAO, "atualizado.flag");
// Fora da pasta temp (que o Windows pode limpar) — fica junto do config,
// que já sabemos que sobrevive a reinício. É o único jeito de saber o que
// aconteceu numa atualização que falhou: o processo Node já morreu antes
// do script PowerShell detectado rodar, então só esse arquivo de log
// (escrito pelo PRÓPRIO script, não pelo Node) sobra pra investigar depois
// (achado em 2026-10-21/22: um agente ficou ~2 dias sem mandar nota
// nenhuma depois de uma atualização, sem nenhum rastro de erro em lugar
// nenhum — o script antigo engolia tudo com SilentlyContinue).
const ARQUIVO_LOG_ATUALIZACAO = path.join(PASTA_CONFIG, "atualizacao.log");
const ARQUIVO_FLAG_FALHA_ATUALIZACAO = path.join(PASTA_CONFIG, "falha-atualizacao.flag");

function compararVersoes(a: string, b: string): number {
  const partesA = a.split(".").map(Number);
  const partesB = b.split(".").map(Number);
  for (let i = 0; i < Math.max(partesA.length, partesB.length); i++) {
    const diferenca = (partesA[i] ?? 0) - (partesB[i] ?? 0);
    if (diferenca !== 0) return diferenca;
  }
  return 0;
}

export interface InfoUltimaAtualizacao {
  versao: string;
  em: string;
  sucesso: boolean;
  detalhe?: string;
}

/**
 * Chamado uma vez no início do processo — se essa execução é resultado de
 * uma auto-atualização (bem ou mal sucedida), notifica, limpa as flags e
 * devolve o resultado pra entrar no próximo heartbeat (ver main.ts) — é
 * assim que o painel sabe que o agente atualizou sem precisar de nada
 * manual.
 */
export function notificarSeFoiAtualizadoAgora(): InfoUltimaAtualizacao | null {
  if (!fs.existsSync(ARQUIVO_FLAG_POS_ATUALIZACAO)) return null;
  const em = new Date().toISOString();
  let versao = "";
  try {
    versao = fs.readFileSync(ARQUIVO_FLAG_POS_ATUALIZACAO, "utf8").trim();
  } finally {
    fs.rmSync(ARQUIVO_FLAG_POS_ATUALIZACAO, { force: true });
  }

  if (fs.existsSync(ARQUIVO_FLAG_FALHA_ATUALIZACAO)) {
    const detalhe = fs.readFileSync(ARQUIVO_FLAG_FALHA_ATUALIZACAO, "utf8").trim();
    fs.rmSync(ARQUIVO_FLAG_FALHA_ATUALIZACAO, { force: true });
    notificar("Agente Fiscal", `A atualização para ${versao} teve um problema — confira o técnico responsável.`);
    return { versao, em, sucesso: false, detalhe };
  }

  notificar("Agente Fiscal", `Atualizado para a versão ${versao}.`);
  return { versao, em, sucesso: true };
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
  // Ao contrário da versão anterior (SilentlyContinue engolindo tudo), este
  // script escreve cada passo num log persistente (fora da pasta temp) e só
  // declara sucesso se o instalador saiu com código 0 E o executável
  // realmente existe depois — sem isso, uma falha no meio (instalador
  // corrompido, antivírus bloqueando, disco cheio) deixava o agente
  // simplesmente sumir, sem log nenhum em lugar nenhum pra saber o motivo.
  fs.writeFileSync(
    scriptAtualizacao,
    [
      `$logFile = '${ARQUIVO_LOG_ATUALIZACAO}'`,
      `function Log($msg) { Add-Content -Path $logFile -Value "$(Get-Date -Format o) $msg" -Encoding utf8 }`,
      "try {",
      `  Log "Atualizando para ${info.versao}: esperando processo antigo (PID ${pidAtual}) encerrar..."`,
      `  Wait-Process -Id ${pidAtual} -Timeout 30 -ErrorAction SilentlyContinue`,
      "  Start-Sleep -Seconds 1",
      "  Log 'Rodando instalador silencioso...'",
      `  $proc = Start-Process -FilePath '${instalador}' -ArgumentList '/S' -Wait -PassThru -ErrorAction Stop`,
      "  Log \"Instalador terminou com codigo de saida $($proc.ExitCode).\"",
      `  $exeExiste = Test-Path '${caminhoExeAtual}'`,
      "  if ($proc.ExitCode -ne 0 -or -not $exeExiste) {",
      "    $motivo = if (-not $exeExiste) { 'executavel nao existe apos a instalacao' } else { \"instalador saiu com codigo $($proc.ExitCode)\" }",
      "    Log \"FALHA: $motivo\"",
      `    Set-Content -Path '${ARQUIVO_FLAG_FALHA_ATUALIZACAO}' -Value $motivo -Encoding utf8`,
      "  } else {",
      "    Log 'Instalacao OK.'",
      "  }",
      "  if ($exeExiste) {",
      `    Log 'Reabrindo o app...'`,
      `    Start-Process -FilePath '${caminhoExeAtual}'`,
      "    Log 'App reaberto.'",
      "  } else {",
      "    Log 'Nao foi possivel reabrir - executavel ausente. O vigia (tarefa agendada) vai tentar de novo em ate 5 minutos, mas provavelmente vai falhar tambem ate alguem reinstalar manualmente.'",
      "  }",
      "} catch {",
      "  Log \"ERRO INESPERADO: $_\"",
      `  Set-Content -Path '${ARQUIVO_FLAG_FALHA_ATUALIZACAO}' -Value "erro inesperado: $_" -Encoding utf8`,
      "  try {",
      `    if (Test-Path '${caminhoExeAtual}') { Start-Process -FilePath '${caminhoExeAtual}' }`,
      "  } catch {}",
      "} finally {",
      `  Remove-Item -Path '${instalador}' -Force -ErrorAction SilentlyContinue`,
      `  Remove-Item -Path '${scriptAtualizacao}' -Force -ErrorAction SilentlyContinue`,
      "}",
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
