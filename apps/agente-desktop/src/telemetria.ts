/**
 * Estado "ao vivo" do agente (contadores, últimos eventos, recusas) e log
 * em arquivo. Alimenta duas coisas: a página local do PC (painel-local.ts)
 * e o resumo que vai junto do heartbeat pro portal.
 *
 * Tudo em memória com tamanho limitado (anel de eventos) e o arquivo de log
 * gira sozinho ao passar de 2 MB — nada aqui cresce sem parar no PC do
 * cliente.
 */
import fs from "node:fs";
import path from "node:path";
import { format } from "node:util";
import { PASTA_CONFIG } from "./config";

export type StatusEvento =
  | "ACEITO"
  | "DUPLICADO"
  | "CNPJ_NAO_AUTORIZADO"
  | "INVALIDO"
  | "IGNORADO"
  | "ERRO_REDE";

export interface EventoAgente {
  em: string;
  arquivo?: string;
  status: StatusEvento;
  detalhe?: string;
}

const TAMANHO_MAX_LOG = 2 * 1024 * 1024;
const MAX_EVENTOS = 200;
const MAX_RECUSAS = 30;

const ARQUIVO_LOG = path.join(PASTA_CONFIG, "agente.log");

const estado = {
  iniciadoEm: new Date().toISOString(),
  versao: "",
  pastas: [] as string[],
  contadores: { lidos: 0, aceitos: 0, duplicados: 0, recusados: 0, ignorados: 0 },
  filaPendente: () => 0,
  ultimoEnvioEm: null as string | null,
  ultimaNotaAceitaEm: null as string | null,
  ultimoErro: null as { em: string; mensagem: string } | null,
  ultimoHeartbeatOkEm: null as string | null,
  varreduraConcluida: false,
  arquivosNaVarredura: 0,
  eventos: [] as EventoAgente[],
  recusas: [] as EventoAgente[],
};

let escritasDesdeChecagem = 0;

function nomeCurto(caminho: string | undefined): string | undefined {
  if (!caminho) return undefined;
  // "C:\pasta\x.zip > interno/nota.xml" -> mantém só o final de cada parte
  return caminho
    .split(" > ")
    .map((parte) => parte.split(/[\\/]/).pop() ?? parte)
    .join(" > ");
}

function escreverLog(nivel: "INFO" | "AVISO" | "ERRO", mensagem: string): void {
  try {
    fs.mkdirSync(PASTA_CONFIG, { recursive: true });
    if (++escritasDesdeChecagem >= 100) {
      escritasDesdeChecagem = 0;
      const tamanho = fs.existsSync(ARQUIVO_LOG) ? fs.statSync(ARQUIVO_LOG).size : 0;
      if (tamanho > TAMANHO_MAX_LOG) fs.renameSync(ARQUIVO_LOG, `${ARQUIVO_LOG}.1`);
    }
    fs.appendFileSync(ARQUIVO_LOG, `${new Date().toISOString()} ${nivel} ${mensagem}\n`, "utf8");
  } catch {
    // log nunca pode derrubar o agente
  }
}

/** Redireciona o console.* (que hoje vai pra lugar nenhum, já que o .exe não tem janela) pro arquivo de log. */
export function instalarLogEmArquivo(): void {
  const original = { log: console.log, warn: console.warn, error: console.error };
  const formatar = (args: unknown[]) => format(...(args as [unknown, ...unknown[]]));
  console.log = (...args) => {
    escreverLog("INFO", formatar(args));
    original.log(...args);
  };
  console.warn = (...args) => {
    escreverLog("AVISO", formatar(args));
    original.warn(...args);
  };
  console.error = (...args) => {
    escreverLog("ERRO", formatar(args));
    original.error(...args);
  };
}

export function configurarTelemetria(dados: { versao: string; pastas: string[]; filaPendente: () => number }): void {
  estado.versao = dados.versao;
  estado.pastas = dados.pastas;
  estado.filaPendente = dados.filaPendente;
}

export function registrarEvento(evento: Omit<EventoAgente, "em">): void {
  const completo: EventoAgente = { em: new Date().toISOString(), ...evento, arquivo: nomeCurto(evento.arquivo) };
  estado.eventos.unshift(completo);
  if (estado.eventos.length > MAX_EVENTOS) estado.eventos.length = MAX_EVENTOS;

  const c = estado.contadores;
  switch (evento.status) {
    case "ACEITO":
      c.aceitos += 1;
      estado.ultimaNotaAceitaEm = completo.em;
      break;
    case "DUPLICADO":
      c.duplicados += 1;
      break;
    case "IGNORADO":
      c.ignorados += 1;
      break;
    case "CNPJ_NAO_AUTORIZADO":
    case "INVALIDO":
      c.recusados += 1;
      break;
    default:
      break;
  }

  if (evento.status === "CNPJ_NAO_AUTORIZADO" || evento.status === "INVALIDO" || evento.status === "IGNORADO") {
    estado.recusas.unshift(completo);
    if (estado.recusas.length > MAX_RECUSAS) estado.recusas.length = MAX_RECUSAS;
  }
}

export function contarLido(): void {
  estado.contadores.lidos += 1;
}

export function registrarEnvioConcluido(): void {
  estado.ultimoEnvioEm = new Date().toISOString();
  estado.ultimoErro = null;
}

export function registrarErroDeRede(mensagem: string): void {
  estado.ultimoErro = { em: new Date().toISOString(), mensagem };
  registrarEvento({ status: "ERRO_REDE", detalhe: mensagem });
}

export function registrarHeartbeatOk(): void {
  estado.ultimoHeartbeatOkEm = new Date().toISOString();
}

export function contarArquivoNaVarredura(): void {
  if (!estado.varreduraConcluida) estado.arquivosNaVarredura += 1;
}

export function marcarVarreduraConcluida(): void {
  estado.varreduraConcluida = true;
  escreverLog("INFO", `Varredura inicial concluída (${estado.arquivosNaVarredura} arquivo(s) vistos).`);
}

/** Estado completo pra página local do PC. */
export function estadoCompleto() {
  return {
    versao: estado.versao,
    iniciadoEm: estado.iniciadoEm,
    pastas: estado.pastas,
    contadores: estado.contadores,
    filaPendente: estado.filaPendente(),
    ultimoEnvioEm: estado.ultimoEnvioEm,
    ultimaNotaAceitaEm: estado.ultimaNotaAceitaEm,
    ultimoErro: estado.ultimoErro,
    ultimoHeartbeatOkEm: estado.ultimoHeartbeatOkEm,
    varreduraConcluida: estado.varreduraConcluida,
    arquivosNaVarredura: estado.arquivosNaVarredura,
    eventos: estado.eventos,
    recusas: estado.recusas,
    arquivoLog: ARQUIVO_LOG,
  };
}

/** Resumo enxuto que vai junto do heartbeat pro portal (bem menor que o estado completo). */
export function resumoParaHeartbeat() {
  return {
    v: 1,
    iniciadoEm: estado.iniciadoEm,
    pastas: estado.pastas,
    contadores: estado.contadores,
    filaPendente: estado.filaPendente(),
    ultimoEnvioEm: estado.ultimoEnvioEm,
    ultimaNotaAceitaEm: estado.ultimaNotaAceitaEm,
    ultimoErro: estado.ultimoErro,
    varreduraConcluida: estado.varreduraConcluida,
    arquivosNaVarredura: estado.arquivosNaVarredura,
    recusasRecentes: estado.recusas.slice(0, 10),
  };
}
