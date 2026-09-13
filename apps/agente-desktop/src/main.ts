import { carregarConfig, ARQUIVO_CONFIG } from "./config";
import { observarPastas } from "./watcher";
import { criarFilaDeEnvio } from "./upload";
import { enviarHeartbeat, buscarEscopo } from "./api-client";

const INTERVALO_FLUSH_MS = 5_000;
const INTERVALO_HEARTBEAT_MS = 5 * 60_000;

async function main() {
  const config = carregarConfig();

  // Fase 2: sem tela de configuração ainda (isso vem na Fase 3) — token e
  // pastas são editados a mão neste arquivo.
  if (!config.token || config.pastasMonitoradas.length === 0) {
    console.error(
      `Configuração incompleta. Edite ${ARQUIVO_CONFIG} preenchendo "token" (gerado no admin) ` +
        `e "pastasMonitoradas" (lista de pastas a observar) antes de rodar de novo.`
    );
    process.exit(1);
  }

  try {
    const { cnpjs } = await buscarEscopo(config.token);
    console.log(`[main] token autorizado para ${cnpjs.length} CNPJ(s): ${cnpjs.join(", ")}`);
  } catch (err) {
    console.error(`[main] não consegui validar o token com o servidor: ${err}`);
    process.exit(1);
  }

  const fila = criarFilaDeEnvio(config.token);

  observarPastas(config.pastasMonitoradas, (caminho) => fila.enfileirar(caminho));

  setInterval(() => void fila.flush(), INTERVALO_FLUSH_MS);

  setInterval(() => {
    enviarHeartbeat(config.token!, config.versaoAgente).catch((err) =>
      console.error(`[main] falha no heartbeat: ${err}`)
    );
  }, INTERVALO_HEARTBEAT_MS);
  void enviarHeartbeat(config.token, config.versaoAgente).catch((err) =>
    console.error(`[main] falha no heartbeat inicial: ${err}`)
  );

  console.log(`[main] agente rodando, observando: ${config.pastasMonitoradas.join(", ")}`);
}

main().catch((err) => {
  console.error(`[main] erro fatal: ${err}`);
  process.exit(1);
});
