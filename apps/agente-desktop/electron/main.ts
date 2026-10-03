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
import { verificarAtualizacao, notificarSeFoiAtualizadoAgora } from "../src/updater";
import { habilitarVigiaPeriodica } from "../src/watchdog";
import {
  instalarLogEmArquivo,
  configurarTelemetria,
  registrarHeartbeatOk,
  resumoParaHeartbeat,
  estadoCompleto,
  ARQUIVO_LOG,
} from "../src/telemetria";

const INTERVALO_FLUSH_MS = 5_000;
const INTERVALO_HEARTBEAT_MS = 60_000;
const INTERVALO_ATUALIZACAO_MS = 6 * 60 * 60_000;

const ICONE = path.join(__dirname, "../assets/agente-fiscal.ico");
const EH_VIGIA = process.argv.includes("--vigia");

let janelaSetup: BrowserWindow | null = null;
let janelaStatus: BrowserWindow | null = null;
let tray: Tray | null = null;
let pausado = false;
let pararObservador: (() => void) | null = null;

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
  salvarConfig({ token: null, pastasMonitoradas: [], chavesEnviadas: {}, versaoAgente: config.versaoAgente, ultimoHeartbeatEm: null });
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
    const { cnpjs } = await buscarEscopo(configInicial.token!);
    console.log(`[main] token autorizado para ${cnpjs.length} CNPJ(s): ${cnpjs.join(", ")}`);
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

  habilitarVigiaPeriodica(app.getPath("exe"));
  app.setLoginItemSettings({ openAtLogin: true, path: app.getPath("exe") });

  void verificarAtualizacao(configInicial.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`));
  setInterval(() => {
    verificarAtualizacao(configInicial.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`));
  }, INTERVALO_ATUALIZACAO_MS);

  const fila = criarFilaDeEnvio(configInicial.token!);
  configurarTelemetria({ versao: configInicial.versaoAgente, pastas: configInicial.pastasMonitoradas, filaPendente: fila.tamanhoFila });

  observarPastas(configInicial.pastasMonitoradas, (caminho) => {
    if (!pausado) fila.enfileirar(caminho);
  });
  pararObservador = () => undefined; // chokidar não expõe um "parar" simples aqui — ver watcher.ts se precisar no futuro

  setInterval(() => void fila.flush(), INTERVALO_FLUSH_MS);

  const mandarHeartbeat = () =>
    enviarHeartbeat(configInicial.token!, configInicial.versaoAgente, resumoParaHeartbeat())
      .then(() => registrarHeartbeatOk())
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
  app.on("second-instance", () => {
    if (!EH_VIGIA) abrirJanelaStatus();
  });

  await app.whenReady();

  instalarLogEmArquivo();
  notificarSeFoiAtualizadoAgora();
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
