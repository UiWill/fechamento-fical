import { carregarConfig } from "./config";
import { rodarConfiguracaoInicial } from "./setup";
import { habilitarInicioAutomatico } from "./autostart";
import { observarPastas } from "./watcher";
import { criarFilaDeEnvio } from "./upload";
import { enviarHeartbeat, buscarEscopo } from "./api-client";
import { notificar } from "./notify";

const INTERVALO_FLUSH_MS = 5_000;
const INTERVALO_HEARTBEAT_MS = 5 * 60_000;

async function main() {
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

  const fila = criarFilaDeEnvio(config.token!);

  observarPastas(config.pastasMonitoradas, (caminho) => fila.enfileirar(caminho));

  setInterval(() => void fila.flush(), INTERVALO_FLUSH_MS);

  setInterval(() => {
    enviarHeartbeat(config.token!, config.versaoAgente).catch((err) =>
      console.error(`[main] falha no heartbeat: ${err}`)
    );
  }, INTERVALO_HEARTBEAT_MS);
  void enviarHeartbeat(config.token!, config.versaoAgente).catch((err) =>
    console.error(`[main] falha no heartbeat inicial: ${err}`)
  );

  console.log(`[main] agente rodando, observando: ${config.pastasMonitoradas.join(", ")}`);
  notificar("Agente Fiscal", "Iniciado e monitorando notas de saída.");
}

main().catch((err) => {
  console.error(`[main] erro fatal: ${err}`);
  process.exit(1);
});
