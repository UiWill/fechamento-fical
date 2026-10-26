/**
 * Processo principal do Electron — substitui o antigo main.ts (Node SEA
 * puro). O "motor" de verdade (watcher, upload, heartbeat, atualização)
 * continua sendo exatamente o mesmo código de `src/*.ts`; o que muda aqui
 * é a casca: em vez de diálogos do PowerShell e uma paginazinha HTTP em
 * 127.0.0.1, agora tem janelas de verdade, ícone na bandeja do sistema e
 * instalador de verdade (NSIS, via electron-builder).
 *
 * Continua rodando em segundo plano sem nenhuma janela visível por padrão
 * — só abre uma janela quando a pessoa pede (ícone da bandeja) ou na
 * primeira configuração.
 */
import { app, BrowserWindow, Tray, Menu, ipcMain, dialog, shell, nativeImage } from "electron";
import path from "node:path";
import { carregarConfig, salvarConfig, type ConfigAgente } from "../src/config";
import { buscarEscopo, enviarHeartbeat, buscarVersaoMaisRecente } from "../src/api-client";
import { observarPastas } from "../src/watcher";
import { criarFilaDeEnvio } from "../src/upload";
import { notificar } from "../src/notify";
import { verificarAtualizacao, notificarSeFoiAtualizadoAgora, type InfoUltimaAtualizacao } from "../src/updater";
import { habilitarVigiaPeriodica } from "../src/watchdog";
import { registrarInicioEContarReinicios, registrarErroFatal, lerELimparUltimoErroFatal, pastasInacessiveis } from "../src/diagnostico";
import {
  instalarLogEmArquivo,
  configurarTelemetria,
  registrarHeartbeatOk,
  resumoParaHeartbeat,
  estadoCompleto,
  atualizarPastasInacessiveis,
  atualizarVigiaAtiva,
  ARQUIVO_LOG,
} from "../src/telemetria";

const INTERVALO_FLUSH_MS = 5_000;
const INTERVALO_HEARTBEAT_MS = 60_000;
const INTERVALO_ATUALIZACAO_MS = 6 * 60 * 60_000;
// Reconfere (e recria, se preciso) a Tarefa Agendada do vigia enquanto o
// app já está rodando — sem isso, só se garantia a proteção uma vez, no
// início; se antivírus/política/o próprio usuário apagasse a tarefa
// depois, o agente ficava sem vigia pro resto da execução sem ninguém
// perceber (pedido explícito do usuário em 2026-10-23, depois de achar 3
// agentes sem vigia nenhum travados há dias sem religar sozinhos).
const INTERVALO_REVERIFICAR_VIGIA_MS = 60 * 60_000;

const ICONE = path.join(__dirname, "../assets/agente-fiscal.ico");
const EH_VIGIA = process.argv.includes("--vigia");

let janelaSetup: BrowserWindow | null = null;
let janelaStatus: BrowserWindow | null = null;
let tray: Tray | null = null;
let pausado = false;
let pararObservador: (() => void) | null = null;
let infoUltimaAtualizacao: InfoUltimaAtualizacao | null = null;

// Rede de segurança — sem isso, qualquer exceção não prevista em algum
// lugar (ex: um XML com um formato nunca visto antes) derruba o processo
// INTEIRO sem log nenhum, e como o chokidar sempre varre a pasta na mesma
// ordem, o mesmo arquivo quebra de novo a cada reinício — crash-loop
// permanente e silencioso (achado em 2026-10-22, investigando um agente
// que ficou dias sem mandar nota nenhuma; ver também o try/catch
// específico em upload.ts, que é o fix principal — isto aqui é só o
// último recurso pra qualquer coisa que escape dele). Registrar um
// handler already impede o Node de sair sozinho — não precisa (nem deve)
// chamar process.exit aqui.
process.on("uncaughtException", (err) => {
  console.error(`[main] EXCEÇÃO NÃO TRATADA (agente continua rodando): ${err?.stack ?? err}`);
  registrarErroFatal("uncaughtException", err);
});
process.on("unhandledRejection", (motivo) => {
  console.error(`[main] PROMISE REJEITADA SEM CATCH (agente continua rodando): ${motivo}`);
  registrarErroFatal("unhandledRejection", motivo);
});

function criarJanela(arquivoHtml: string, opcoes: { largura: number; altura: number; titulo: string }): BrowserWindow {
  const janela = new BrowserWindow({
    width: opcoes.largura,
    height: opcoes.altura,
    title: opcoes.titulo,
    icon: ICONE,
    resizable: false,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    backgroundColor: "#0b0b0d",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  janela.loadFile(path.join(__dirname, "renderer", arquivoHtml));
  return janela;
}

function abrirJanelaSetup(): void {
  if (janelaSetup) {
    janelaSetup.focus();
    return;
  }
  janelaSetup = criarJanela("setup.html", { largura: 460, altura: 560, titulo: "Configurar Agente Fiscal" });
  janelaSetup.on("closed", () => {
    janelaSetup = null;
  });
}

function abrirJanelaStatus(): void {
  if (janelaStatus) {
    janelaStatus.focus();
    return;
  }
  janelaStatus = criarJanela("status.html", { largura: 520, altura: 640, titulo: "Agente Fiscal" });
  janelaStatus.on("closed", () => {
    janelaStatus = null;
  });
}

/** Apaga token, pasta e o histórico de chaves já enviadas, e reinicia o app do zero (volta pra tela de configuração). */
function limparConfiguracaoEReiniciar(): void {
  const config = carregarConfig();
  salvarConfig({
    token: null,
    pastasMonitoradas: [],
    chavesEnviadas: {},
    versaoAgente: config.versaoAgente,
    ultimoHeartbeatEm: null,
    escopoEmpresas: [],
    arquivosAntigosIgnorados: {},
    arquivosJaEnviados: {},
    ultimaVersaoAlvoAtualizacao: null,
    tentativasAtualizacaoFalhas: 0,
  });
  app.relaunch();
  app.exit(0);
}

function montarMenuTray(): Menu {
  return Menu.buildFromTemplate([
    { label: "Abrir painel", click: abrirJanelaStatus },
    { label: "Configurações", click: abrirJanelaSetup },
    {
      label: "Reconfigurar (limpar tudo)",
      click: () => {
        const resposta = dialog.showMessageBoxSync({
          type: "warning",
          title: "Agente Fiscal",
          message: "Limpar a configuração atual?",
          detail: "Apaga o código de instalação e a pasta monitorada deste PC — o agente volta pra tela inicial de configuração, como se fosse instalado agora.",
          buttons: ["Cancelar", "Limpar e reconfigurar"],
          defaultId: 0,
          cancelId: 0,
        });
        if (resposta === 1) limparConfiguracaoEReiniciar();
      },
    },
    { type: "separator" },
    {
      label: pausado ? "Retomar monitoramento" : "Pausar monitoramento",
      click: () => {
        pausado = !pausado;
        tray?.setContextMenu(montarMenuTray());
        notificar("Agente Fiscal", pausado ? "Monitoramento pausado." : "Monitoramento retomado.");
      },
    },
    { label: "Abrir arquivo de log", click: () => shell.openPath(ARQUIVO_LOG) },
    { type: "separator" },
    { label: "Sair", click: () => app.quit() },
  ]);
}

function criarTray(): void {
  tray = new Tray(nativeImage.createFromPath(ICONE));
  tray.setToolTip("Agente Fiscal");
  tray.setContextMenu(montarMenuTray());
  tray.on("double-click", abrirJanelaStatus);
}

/** Registra os handlers que as janelas (setup/status) chamam via IPC — ver preload.ts e os scripts de cada página. */
function registrarIpc(): void {
  ipcMain.handle("escolher-pasta", async () => {
    const resultado = await dialog.showOpenDialog({
      title: "Selecione a pasta onde as notas fiscais de saída (NF-e/NFC-e/CT-e) são salvas",
      properties: ["openDirectory"],
    });
    return resultado.canceled ? null : resultado.filePaths[0];
  });

  ipcMain.handle("validar-token", async (_evento, token: string) => {
    try {
      const { cnpjs } = await buscarEscopo(token);
      return { ok: true as const, cnpjs };
    } catch (err) {
      return { ok: false as const, erro: err instanceof Error ? err.message : String(err) };
    }
  });

  ipcMain.handle("salvar-configuracao", async (_evento, dados: { token: string; pasta: string }) => {
    const config = carregarConfig();
    config.token = dados.token;
    config.pastasMonitoradas = [dados.pasta];
    salvarConfig(config);
    // Reinicia o processo inteiro em vez de só chamar iniciarMotor de novo:
    // se o motor já estava rodando com a config antiga (ex: token de uma
    // instalação anterior nesse PC), iniciarMotor desiste cedo (já tem um
    // observador rodando) e o token/pasta novos nunca entravam em vigor de
    // verdade. Reiniciar garante que o app sempre sobe com exatamente o
    // que acabou de ser salvo, do zero.
    app.relaunch();
    app.exit(0);
    return { ok: true };
  });

  ipcMain.handle("limpar-configuracao", () => limparConfiguracaoEReiniciar());

  ipcMain.handle("obter-configuracao-atual", () => {
    const config = carregarConfig();
    return { pasta: config.pastasMonitoradas[0] ?? null };
  });

  ipcMain.handle("obter-status", () => estadoCompleto());

  ipcMain.handle("obter-versao-mais-recente", async () => {
    const config = carregarConfig();
    if (!config.token) return { versaoAtual: config.versaoAgente, versaoMaisRecente: null };
    try {
      const info = await buscarVersaoMaisRecente(config.token, config.versaoAgente);
      return { versaoAtual: config.versaoAgente, versaoMaisRecente: info.versao };
    } catch (err) {
      console.error(`[main] falha ao consultar versão mais recente: ${err}`);
      return { versaoAtual: config.versaoAgente, versaoMaisRecente: null };
    }
  });

  ipcMain.handle("atualizar-agora", async () => {
    const config = carregarConfig();
    if (!config.token) return { ok: false as const, erro: "Agente ainda não configurado." };
    try {
      await verificarAtualizacao(config.token);
      return { ok: true as const };
    } catch (err) {
      return { ok: false as const, erro: err instanceof Error ? err.message : String(err) };
    }
  });
}

/** Liga o "motor" de verdade — observar pastas, enviar em lote, heartbeat, checar atualização. Chamado uma vez após a configuração existir. */
async function iniciarMotor(configInicial: ConfigAgente): Promise<void> {
  if (pararObservador) return; // já está rodando, não duplica

  try {
    const { cnpjs, empresas } = await buscarEscopo(configInicial.token!);
    console.log(`[main] token autorizado para ${cnpjs.length} CNPJ(s): ${cnpjs.join(", ")}`);
    configInicial.escopoEmpresas = empresas ?? [];
    salvarConfig(configInicial);
  } catch (err) {
    console.error(`[main] não consegui validar o token com o servidor: ${err}`);
    if (!EH_VIGIA) {
      dialog.showErrorBox(
        "Agente Fiscal",
        "Não consegui confirmar o código de instalação com o servidor.\n\n" +
          "Confira se este computador está com internet e tente de novo. Se persistir, gere um código novo no painel."
      );
    }
    return;
  }

  const vigiaAtiva = habilitarVigiaPeriodica(app.getPath("exe"));
  app.setLoginItemSettings({ openAtLogin: true, path: app.getPath("exe") });

  // habilitarVigiaPeriodica usa /f (força recriar), então chamar de novo
  // periodicamente é seguro e idempotente — é a mesma função, só que
  // repetida, pra pegar o caso de alguém/algo apagar a tarefa DEPOIS do
  // início (não só garantir uma vez e esquecer).
  setInterval(() => {
    atualizarVigiaAtiva(habilitarVigiaPeriodica(app.getPath("exe")));
  }, INTERVALO_REVERIFICAR_VIGIA_MS);

  // Espera o check de atualização terminar ANTES de começar a varrer a
  // pasta (chokidar) — se tem versão nova, ela quase sempre consegue
  // baixar e trocar antes de qualquer coisa ter chance de travar o
  // processo. Antes esse check só era disparado (não esperado) e corria
  // em paralelo com a varredura; se o processo morresse por qualquer
  // motivo durante a varredura, a atualização em andamento morria junto,
  // deixando o agente preso na versão antiga pra sempre (achado
  // investigando um agente em crash-loop há dias sem atualizar, em
  // 2026-10-22/23). Tempo limite de 25s pra não travar o início pra
  // sempre se a rede estiver ruim — o ciclo de 6h abaixo ainda cobre esse caso.
  await Promise.race([
    verificarAtualizacao(configInicial.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`)),
    new Promise((resolve) => setTimeout(resolve, 25_000)),
  ]);

  setInterval(() => {
    verificarAtualizacao(configInicial.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`));
  }, INTERVALO_ATUALIZACAO_MS);

  const fila = criarFilaDeEnvio(configInicial.token!);
  const cortesConhecidos = configInicial.escopoEmpresas
    .map((e) => e.dataInicioMonitoramento)
    .filter((d): d is string => Boolean(d))
    .sort();
  configurarTelemetria({
    versao: configInicial.versaoAgente,
    pastas: configInicial.pastasMonitoradas,
    filaPendente: fila.tamanhoFila,
    dataInicioMonitoramento: cortesConhecidos[0] ?? null,
    ultimaAtualizacao: infoUltimaAtualizacao,
    reiniciosRecentes: registrarInicioEContarReinicios(),
    ultimoErroFatal: lerELimparUltimoErroFatal(),
    pastasInacessiveis: pastasInacessiveis(configInicial.pastasMonitoradas),
    vigiaAtiva,
  });

  observarPastas(configInicial.pastasMonitoradas, (caminho) => {
    if (!pausado) fila.enfileirar(caminho);
  });
  pararObservador = () => undefined; // chokidar não expõe um "parar" simples aqui — ver watcher.ts se precisar no futuro

  setInterval(() => void fila.flush(), INTERVALO_FLUSH_MS);

  // Checagem periódica (não só no início) — rede/disco removido NO MEIO
  // da execução só se percebe se alguém conferir de novo, não só uma vez
  // no start (achado numa varredura de QA em 2026-10-23).
  setInterval(
    () => atualizarPastasInacessiveis(pastasInacessiveis(configInicial.pastasMonitoradas)),
    10 * 60_000
  );

  const mandarHeartbeat = () =>
    enviarHeartbeat(configInicial.token!, configInicial.versaoAgente, resumoParaHeartbeat())
      .then(({ comando }) => {
        registrarHeartbeatOk();
        if (comando === "REINICIAR") {
          console.log("[main] comando remoto: reiniciar — aplicando agora.");
          app.relaunch();
          app.exit(0);
        } else if (comando === "ATUALIZAR") {
          console.log("[main] comando remoto: verificar atualização — checando agora.");
          void verificarAtualizacao(configInicial.token!).catch((err) =>
            console.error(`[main] falha ao verificar atualização (via comando remoto): ${err}`)
          );
        }
      })
      .catch((err) => console.error(`[main] falha no heartbeat: ${err}`));
  setInterval(() => void mandarHeartbeat(), INTERVALO_HEARTBEAT_MS);
  void mandarHeartbeat();

  console.log(`[main] agente rodando, observando: ${configInicial.pastasMonitoradas.join(", ")}`);
  if (!EH_VIGIA) notificar("Agente Fiscal", "Iniciado e monitorando notas de saída.");
}

async function main(): Promise<void> {
  // Single instance de verdade via API do Electron — mais confiável que o
  // esquema antigo baseado em PID num arquivo (ver histórico do projeto:
  // PID reaproveitado pelo Windows depois de reiniciar podia enganar a
  // trava antiga e fazer o agente desistir de abrir achando que já tinha
  // outra cópia rodando).
  const temALock = app.requestSingleInstanceLock();
  if (!temALock) {
    app.quit();
    return;
  }
  // "argv" aqui é da SEGUNDA tentativa (a que acabou de tentar abrir e
  // perdeu a trava), não da nossa — checar EH_VIGIA (calculado uma vez do
  // NOSSO próprio process.argv, lá em cima) sempre dava "não é vigia" pra
  // instância principal e abria a tela sozinha a cada 5 minutos, toda vez
  // que a tarefa agendada de vigia tentava religar (ver watchdog.ts) e
  // encontrava o app já rodando. Precisa checar o argv de quem tentou abrir
  // agora, não o nosso.
  app.on("second-instance", (_evento, argvDaTentativa) => {
    if (!argvDaTentativa.includes("--vigia")) abrirJanelaStatus();
  });

  await app.whenReady();

  instalarLogEmArquivo();
  infoUltimaAtualizacao = notificarSeFoiAtualizadoAgora();
  registrarIpc();
  criarTray();

  const config = carregarConfig();
  if (!config.token || config.pastasMonitoradas.length === 0) {
    abrirJanelaSetup();
  } else {
    await iniciarMotor(config);
  }
}

// Sem isso o app teria um ícone no dock do macOS e fecharia sozinho
// quando a última janela fosse fechada — queremos continuar rodando na
// bandeja mesmo sem nenhuma janela aberta.
app.on("window-all-closed", () => {
  // não faz nada — continua rodando em segundo plano
});

main().catch((err) => {
  console.error(`[main] erro fatal: ${err}`);
  if (!EH_VIGIA) {
    dialog.showErrorBox("Agente Fiscal", `O Agente Fiscal não conseguiu iniciar.\n\n${err instanceof Error ? err.message : String(err)}`);
  }
  app.quit();
});
