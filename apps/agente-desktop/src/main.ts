import { carregarConfig } from "./config";
import { rodarConfiguracaoInicial } from "./setup";
import { habilitarInicioAutomatico } from "./autostart";
import { habilitarVigiaPeriodica } from "./watchdog";
import { encerrarSeJaTiverOutraCopia } from "./instancia-unica";
import { observarPastas } from "./watcher";
import { criarFilaDeEnvio } from "./upload";
import { enviarHeartbeat, buscarEscopo } from "./api-client";
import { notificar } from "./notify";
import { verificarAtualizacao, notificarSeFoiAtualizadoAgora } from "./updater";
import { instalarLogEmArquivo, configurarTelemetria, registrarHeartbeatOk, resumoParaHeartbeat } from "./telemetria";
import { iniciarPainelLocal, criarAtalhoNaAreaDeTrabalho } from "./painel-local";

const INTERVALO_FLUSH_MS = 5_000;
const INTERVALO_HEARTBEAT_MS = 60_000;
const INTERVALO_ATUALIZACAO_MS = 6 * 60 * 60_000;

async function main() {
  // Primeira coisa de todas: se já tem outra cópia rodando, essa aqui se
  // fecha na hora, sem gastar rede nem tempo com mais nada (e, se foi uma
  // pessoa que abriu, mostra a página de status da cópia que já roda).
  encerrarSeJaTiverOutraCopia();
  instalarLogEmArquivo();

  notificarSeFoiAtualizadoAgora();

  let config = carregarConfig();

  if (!config.token || config.pastasMonitoradas.length === 0) {
    if (process.platform === "win32") {
      await rodarConfiguracaoInicial();
      config = carregarConfig();
    } else {
      console.error(
        "Configuração incompleta. Preencha token/pastasMonitoradas no config.json " +
          "(a configuração interativa só roda no Windows) antes de rodar de novo."
      );
      process.exit(1);
    }
  }

  try {
    const { cnpjs } = await buscarEscopo(config.token!);
    console.log(`[main] token autorizado para ${cnpjs.length} CNPJ(s): ${cnpjs.join(", ")}`);
  } catch (err) {
    console.error(`[main] não consegui validar o token com o servidor: ${err}`);
    process.exit(1);
  }

  habilitarInicioAutomatico(process.execPath);
  habilitarVigiaPeriodica(process.execPath);

  void verificarAtualizacao(config.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`));
  setInterval(() => {
    verificarAtualizacao(config.token!).catch((err) => console.error(`[main] falha ao verificar atualização: ${err}`));
  }, INTERVALO_ATUALIZACAO_MS);

  const fila = criarFilaDeEnvio(config.token!);
  configurarTelemetria({ versao: config.versaoAgente, pastas: config.pastasMonitoradas, filaPendente: fila.tamanhoFila });

  void iniciarPainelLocal().then((porta) => {
    if (porta) criarAtalhoNaAreaDeTrabalho(porta);
  });

  observarPastas(config.pastasMonitoradas, (caminho) => fila.enfileirar(caminho));

  setInterval(() => void fila.flush(), INTERVALO_FLUSH_MS);

  const mandarHeartbeat = () =>
    enviarHeartbeat(config.token!, config.versaoAgente, resumoParaHeartbeat())
      .then(() => registrarHeartbeatOk())
      .catch((err) => console.error(`[main] falha no heartbeat: ${err}`));
  setInterval(() => void mandarHeartbeat(), INTERVALO_HEARTBEAT_MS);
  void mandarHeartbeat();

  console.log(`[main] agente rodando, observando: ${config.pastasMonitoradas.join(", ")}`);
  notificar("Agente Fiscal", "Iniciado e monitorando notas de saída.");
}

main().catch((err) => {
  console.error(`[main] erro fatal: ${err}`);
  process.exit(1);
});
