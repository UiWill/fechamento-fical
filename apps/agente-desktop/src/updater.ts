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
import { execFileSync } from "node:child_process";
import { app } from "electron";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { buscarVersaoMaisRecente, baixarVersao } from "./api-client";
import { carregarConfig, salvarConfig, PASTA_CONFIG } from "./config";
import { notificar } from "./notify";
import { definirErroFatalAoVivo } from "./telemetria";

// Depois dessa quantidade de tentativas seguidas seguindo pro MESMO alvo
// sem nunca avançar de verdade, desiste de tentar sozinho — ver freio de
// loop logo abaixo.
const MAX_TENTATIVAS_MESMA_VERSAO = 3;

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

// Nome da Tarefa Agendada usada só pra DISPARAR o script auxiliar (não
// tem agendamento de verdade — ver garantirTarefaAtualizador). Separada
// do vigia (AfeAgenteDesktopVigia, em watchdog.ts), que é outra tarefa
// com outro propósito (religar o app se cair).
const NOME_TAREFA_ATUALIZADOR = "AfeAgenteDesktopAtualizador";

/**
 * Garante que a tarefa existe, apontando sempre pro MESMO arquivo fixo
 * (${scriptAtualizacao} é reescrito a cada tentativa, o caminho não
 * muda) — criar com /f é idempotente, seguro chamar toda vez. O gatilho
 * "once" com horário já passado nunca dispara sozinho; só serve pra
 * schtasks aceitar criar a tarefa (ela exige algum gatilho). O disparo
 * de verdade é sempre manual, via "schtasks /run" em dispararAtualizador.
 */
function garantirTarefaAtualizador(scriptAtualizacao: string): void {
  execFileSync("schtasks", [
    "/create",
    "/tn",
    NOME_TAREFA_ATUALIZADOR,
    "/tr",
    `cmd.exe /c "${scriptAtualizacao}"`,
    "/sc",
    "once",
    "/st",
    "00:00",
    "/sd",
    "01/01/2020",
    "/f",
  ]);
}

/**
 * Dispara a tarefa AGORA, de forma 100% independente do nosso processo —
 * é o Serviço Agendador de Tarefas do Windows (svchost, não um filho do
 * nosso processo) que lança o script, não a gente diretamente. Isso
 * contorna um problema real do Windows com processos "destacados"
 * lançados via spawn/child_process: mesmo marcados como detached, eles
 * costumam ficar presos ao mesmo grupo/job do processo pai e acabam
 * sendo encerrados junto quando o Electron sai — achado em 2026-10-26,
 * testando com PowerShell E com .bat: nenhum dos dois conseguia
 * sobreviver tempo suficiente pra escrever uma linha sequer no log,
 * mesmo os dois tendo sido lançados como "destacados". A tarefa agendada
 * já é comprovadamente independente (é assim que o vigia religa o app
 * depois de um crash de verdade, sem depender do processo que caiu).
 */
function dispararAtualizador(): void {
  execFileSync("schtasks", ["/run", "/tn", NOME_TAREFA_ATUALIZADOR]);
}

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

// Em vez de esperar o próximo ciclo normal (6h, ver INTERVALO_ATUALIZACAO_MS
// em main.ts) depois de uma falha de rede/download/hash, tenta de novo bem
// mais cedo — uma queda momentânea de internet no PC do cliente não devia
// custar 6h de atraso pra pegar uma correção publicada.
const ATRASO_RETENTATIVA_MS = 15 * 60_000;

// Evita duas verificações rodando ao mesmo tempo (a nova tentativa curta
// podendo coincidir com o ciclo normal de 6h, ou com um comando remoto
// "ATUALIZAR") — sem isso, dava pra baixar/instalar duas vezes em paralelo.
let verificandoAgora = false;

function agendarNovaTentativa(token: string, motivo: string): void {
  console.log(
    `[updater] ${motivo} — tentando de novo em ${ATRASO_RETENTATIVA_MS / 60_000} min em vez de esperar o próximo ciclo.`
  );
  setTimeout(() => {
    verificarAtualizacao(token).catch((err) => console.error(`[updater] falha na nova tentativa: ${err}`));
  }, ATRASO_RETENTATIVA_MS);
}

export async function verificarAtualizacao(token: string): Promise<void> {
  if (process.platform !== "win32" || !app.isPackaged) {
    return; // auto-atualização só faz sentido no app instalado (Windows)
  }
  if (verificandoAgora) {
    console.log("[updater] já tem uma verificação em andamento, pulando essa chamada.");
    return;
  }

  verificandoAgora = true;
  try {
    await verificarAtualizacaoInterna(token);
  } finally {
    verificandoAgora = false;
  }
}

async function verificarAtualizacaoInterna(token: string): Promise<void> {
  const config = carregarConfig();
  let info;
  try {
    info = await buscarVersaoMaisRecente(token, config.versaoAgente);
  } catch (err) {
    agendarNovaTentativa(token, `falha ao verificar versão: ${err}`);
    return;
  }

  if (!info.versao || compararVersoes(info.versao, config.versaoAgente) <= 0) {
    // Já está na versão mais recente (ou não tem nenhuma nova) — se tinha
    // ficado preso tentando uma versão antes, reseta: não é mais problema.
    if (config.ultimaVersaoAlvoAtualizacao) {
      config.ultimaVersaoAlvoAtualizacao = null;
      config.tentativasAtualizacaoFalhas = 0;
      salvarConfig(config);
    }
    return;
  }

  console.log(`[updater] nova versão disponível: ${info.versao} (atual: ${config.versaoAgente})`);

  // Freio de segurança: se o alvo é o MESMO de tentativas anteriores (ou
  // seja, a versão nunca avançou de verdade — ver carregarConfig, que
  // sempre reflete a versão do binário que está de fato rodando agora),
  // depois de algumas tentativas seguidas desiste de tentar sozinho em vez
  // de ficar baixando e reinstalando pra sempre (achado em 2026-10-26: 3
  // agentes de teste entraram nesse loop quando o instalador não
  // conseguiu substituir o binário por algum motivo). Fica rodando na
  // versão atual, vivo, com o erro visível no painel.
  if (config.ultimaVersaoAlvoAtualizacao === info.versao) {
    config.tentativasAtualizacaoFalhas += 1;
  } else {
    config.ultimaVersaoAlvoAtualizacao = info.versao;
    config.tentativasAtualizacaoFalhas = 1;
  }
  salvarConfig(config);

  if (config.tentativasAtualizacaoFalhas > MAX_TENTATIVAS_MESMA_VERSAO) {
    const mensagem = `Tentou atualizar pra ${info.versao} ${config.tentativasAtualizacaoFalhas - 1}x seguidas sem a versão avançar de verdade — desistiu de tentar sozinho, continua rodando na ${config.versaoAgente}. Provavelmente o instalador não está substituindo o binário (processo antigo com arquivo ainda em uso, ou falha silenciosa do NSIS).`;
    console.error(`[updater] ${mensagem}`);
    definirErroFatalAoVivo({ em: new Date().toISOString(), origem: "updater-loop", mensagem });
    return;
  }

  fs.mkdirSync(PASTA_ATUALIZACAO, { recursive: true });
  const instalador = path.join(PASTA_ATUALIZACAO, `agente-fiscal-setup-${info.versao}.exe`);

  let conteudo: Buffer;
  try {
    conteudo = await baixarVersao(token, info.versao);
  } catch (err) {
    agendarNovaTentativa(token, `falha ao baixar a versão ${info.versao}: ${err}`);
    return;
  }

  // Confere o que foi baixado antes de rodar — mesma prática de qualquer
  // atualizador automático de verdade (Chrome, VS Code, etc.): uma rede
  // ruim no PC do cliente pode entregar um arquivo incompleto/corrompido
  // que passa pelo HTTP sem erro nenhum, e rodar um instalador corrompido
  // silenciosamente pode quebrar a instalação sem log nenhum do motivo.
  // sha256 nulo (versão publicada antes dessa checagem existir) não
  // bloqueia — só versões novas têm o hash pra conferir.
  if (info.sha256) {
    const hashBaixado = crypto.createHash("sha256").update(conteudo).digest("hex");
    if (hashBaixado !== info.sha256) {
      agendarNovaTentativa(
        token,
        `hash do download não bate (esperado ${info.sha256}, recebido ${hashBaixado}) — abortando essa tentativa`
      );
      return;
    }
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
  const scriptAtualizacao = path.join(PASTA_ATUALIZACAO, "atualizar.bat");

  // IMPORTANTE: não dá pra só rodar o instalador e sair em seguida — o
  // instalador (NSIS /S) e o nosso próprio processo ficariam os DOIS
  // mexendo nos mesmos arquivos ao mesmo tempo (nós ainda de pé, segurando
  // os arquivos; ele tentando sobrescrever), e isso já deixou uma
  // instalação pela metade (ícone/recurso faltando, app parava de abrir
  // sem nem mostrar erro). Em vez disso, um script DESTACADO (sobrevive
  // depois que a gente sai) espera nosso processo encerrar de vez, só
  // DEPOIS roda o instalador (espera ele terminar de verdade), e só então
  // abre o app novo — nada acontece em paralelo.
  //
  // É um .bat (CMD puro), não .ps1 — achado em 2026-10-26: mesmo com
  // -ExecutionPolicy Bypass, o PowerShell nunca chegava a rodar o script
  // em PC com a Política de Execução travada por Diretiva de Grupo do
  // Windows (GPO sempre tem prioridade sobre a flag de linha de comando,
  // não tem bypass nenhum pra isso) — a atualização "funcionava" (flag
  // local gravado, sem erro nenhum visível) mas o script literalmente
  // nunca executava uma linha sequer, e o vigia só reabria o binário
  // antigo, intocado, repetindo pra sempre. Script .bat não tem conceito
  // de política de execução — roda em qualquer Windows, sempre.
  fs.writeFileSync(
    scriptAtualizacao,
    [
      "@echo off",
      "setlocal EnableDelayedExpansion",
      `set "LOGFILE=${ARQUIVO_LOG_ATUALIZACAO}"`,
      `set "PID=${pidAtual}"`,
      `set "INSTALADOR=${instalador}"`,
      `set "EXEATUAL=${caminhoExeAtual}"`,
      `set "FALHAFLAG=${ARQUIVO_FLAG_FALHA_ATUALIZACAO}"`,
      "",
      `call :log "Atualizando para ${info.versao}: esperando processo antigo (PID %PID%) encerrar..."`,
      "",
      "set /a CONT=0",
      ":esperar",
      'tasklist /FI "PID eq %PID%" 2^>NUL ^| find "%PID%" >NUL',
      "if %ERRORLEVEL%==0 (",
      "  set /a CONT+=1",
      "  if !CONT! GEQ 30 goto acabouespera",
      "  timeout /t 1 /nobreak >NUL",
      "  goto esperar",
      ")",
      ":acabouespera",
      "",
      "timeout /t 1 /nobreak >NUL",
      'call :log "Rodando instalador silencioso..."',
      'start "" /wait "%INSTALADOR%" /S',
      'set "CODIGO=%ERRORLEVEL%"',
      'call :log "Instalador terminou com codigo de saida %CODIGO%."',
      "",
      'if exist "%EXEATUAL%" (set "EXEEXISTE=1") else (set "EXEEXISTE=0")',
      "",
      'if not "%CODIGO%"=="0" (',
      '  call :log "FALHA: instalador saiu com codigo %CODIGO%"',
      '  > "%FALHAFLAG%" echo instalador saiu com codigo %CODIGO%',
      ') else if "%EXEEXISTE%"=="0" (',
      '  call :log "FALHA: executavel nao existe apos a instalacao"',
      '  > "%FALHAFLAG%" echo executavel nao existe apos a instalacao',
      ") else (",
      '  call :log "Instalacao OK."',
      ")",
      "",
      'if "%EXEEXISTE%"=="1" (',
      '  call :log "Reabrindo o app..."',
      '  start "" "%EXEATUAL%"',
      '  call :log "App reaberto."',
      ") else (",
      '  call :log "Nao foi possivel reabrir - executavel ausente. O vigia vai tentar de novo em ate 1 minuto, mas provavelmente vai falhar tambem ate alguem reinstalar manualmente."',
      ")",
      "",
      'del "%INSTALADOR%" >NUL 2>&1',
      "goto fim",
      "",
      ":log",
      '>> "%LOGFILE%" echo %date% %time% %~1',
      "exit /b",
      "",
      ":fim",
      'del "%~f0" >NUL 2>&1',
    ].join("\r\n"),
    "utf8"
  );

  console.log("[updater] saindo e deixando o instalador + reabertura por conta da tarefa agendada...");
  try {
    garantirTarefaAtualizador(scriptAtualizacao);
    dispararAtualizador();
  } catch (err) {
    // Só pega falha de CRIAR/DISPARAR a tarefa em si (ex: Agendador de
    // Tarefas desabilitado por política — mesmo caso que já derruba o
    // vigia, ver watchdog.ts) — erros de DENTRO do script (instalador
    // corrompido, etc.) não chegam aqui, ficam só no atualizacao.log do
    // próprio script. Mesmo assim, melhor logar isso do que morrer em
    // silêncio total.
    console.error(`[updater] falha ao disparar a tarefa de atualização: ${err}`);
    return;
  }

  app.quit();
}
