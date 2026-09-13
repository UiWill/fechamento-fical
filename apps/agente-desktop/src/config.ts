/**
 * Estado local do agente — token, pastas monitoradas e o registro de quais
 * chaves já foram enviadas (é isso que evita reenviar o histórico inteiro
 * toda vez que o PC reinicia: o chokidar sempre revarre a pasta inteira ao
 * iniciar, mas cada chave já registrada aqui é pulada antes de qualquer
 * chamada de rede).
 *
 * Nesta fase (2), token e pastas são editados manualmente neste arquivo —
 * a telinha de configuração (Fase 3) ainda não existe.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PASTA_CONFIG = process.env.LOCALAPPDATA
  ? path.join(process.env.LOCALAPPDATA, "AfeAgenteDesktop")
  : path.join(os.homedir(), ".afe-agente-desktop");

const ARQUIVO_CONFIG = path.join(PASTA_CONFIG, "config.json");

export type StatusArquivoEnviado = "ACEITO" | "DUPLICADO" | "CNPJ_NAO_AUTORIZADO" | "INVALIDO";

export interface EstadoArquivoEnviado {
  status: StatusArquivoEnviado;
  enviadoEm: string;
}

export interface ConfigAgente {
  token: string | null;
  pastasMonitoradas: string[];
  chavesEnviadas: Record<string, EstadoArquivoEnviado>;
  versaoAgente: string;
  ultimoHeartbeatEm: string | null;
}

const CONFIG_PADRAO: ConfigAgente = {
  token: null,
  pastasMonitoradas: [],
  chavesEnviadas: {},
  versaoAgente: "0.1.0",
  ultimoHeartbeatEm: null,
};

export function carregarConfig(): ConfigAgente {
  if (!fs.existsSync(ARQUIVO_CONFIG)) return { ...CONFIG_PADRAO };
  try {
    const bruto = fs.readFileSync(ARQUIVO_CONFIG, "utf8");
    return { ...CONFIG_PADRAO, ...JSON.parse(bruto) };
  } catch {
    // Config corrompida — melhor comecar do zero (vai revarrer a pasta e
    // reenviar tudo, mas o servidor trata reenvio como DUPLICADO) do que
    // travar o agente pra sempre.
    return { ...CONFIG_PADRAO };
  }
}

/** Escrita atômica (arquivo temporário + rename) — nunca deixa o config pela metade se o processo morrer no meio da gravação. */
export function salvarConfig(config: ConfigAgente): void {
  fs.mkdirSync(PASTA_CONFIG, { recursive: true });
  const arquivoTemp = `${ARQUIVO_CONFIG}.tmp`;
  fs.writeFileSync(arquivoTemp, JSON.stringify(config, null, 2), "utf8");
  fs.renameSync(arquivoTemp, ARQUIVO_CONFIG);
}

export { ARQUIVO_CONFIG, PASTA_CONFIG };
