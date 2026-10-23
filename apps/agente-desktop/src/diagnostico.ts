/**
 * Diagnóstico que sobrevive ao processo morrer — tudo que telemetria.ts
 * guarda fica só em memória (se perde quando o processo cai), e isso é
 * exatamente a informação que falta nos casos mais graves: um crash-loop
 * (processo morre a cada poucos minutos, sempre antes de conseguir contar
 * a própria história pro servidor). Esses dois arquivos pequenos (contador
 * de reinícios recentes, último erro fatal) ficam na pasta de config
 * (sobrevive a reinício do PC) e são lidos no próximo start bem-sucedido —
 * é o que permite o painel mostrar "esse agente está em crash-loop" e o
 * motivo, sem precisar pedir o log pro cliente manualmente (achado
 * investigando um agente que ficou dias sem mandar nota nenhuma, em
 * 2026-10-22 — ver upload.ts pelo fix do crash em si).
 */
import fs from "node:fs";
import path from "node:path";
import { PASTA_CONFIG } from "./config";

const ARQUIVO_REINICIOS = path.join(PASTA_CONFIG, "reinicios.json");
const ARQUIVO_ULTIMO_ERRO_FATAL = path.join(PASTA_CONFIG, "ultimo-erro-fatal.json");
const JANELA_CRASH_LOOP_MS = 30 * 60_000;

/** Chamado uma vez por start — registra o instante e devolve quantos starts aconteceram na última meia hora (incluindo esse). */
export function registrarInicioEContarReinicios(): number {
  let lista: number[] = [];
  try {
    lista = JSON.parse(fs.readFileSync(ARQUIVO_REINICIOS, "utf8"));
    if (!Array.isArray(lista)) lista = [];
  } catch {
    lista = [];
  }
  const agora = Date.now();
  lista = lista.filter((t) => typeof t === "number" && agora - t < JANELA_CRASH_LOOP_MS);
  lista.push(agora);
  try {
    fs.mkdirSync(PASTA_CONFIG, { recursive: true });
    fs.writeFileSync(ARQUIVO_REINICIOS, JSON.stringify(lista), "utf8");
  } catch {
    // diagnóstico nunca pode travar o agente
  }
  return lista.length;
}

export interface ErroFatal {
  em: string;
  origem: string;
  mensagem: string;
  stack?: string;
}

/** Chamado pelos handlers globais (uncaughtException/unhandledRejection) — persiste ANTES de qualquer coisa, pro próximo start conseguir ler mesmo se o processo morrer logo em seguida. */
export function registrarErroFatal(origem: string, erro: unknown): void {
  const info: ErroFatal = {
    em: new Date().toISOString(),
    origem,
    mensagem: erro instanceof Error ? erro.message : String(erro),
    stack: erro instanceof Error ? erro.stack : undefined,
  };
  try {
    fs.mkdirSync(PASTA_CONFIG, { recursive: true });
    fs.writeFileSync(ARQUIVO_ULTIMO_ERRO_FATAL, JSON.stringify(info), "utf8");
  } catch {
    // melhor esforço
  }
}

/** Lido uma vez no start seguinte — devolve o erro fatal da execução anterior (se teve) e já limpa, pra não reportar a mesma coisa pra sempre. */
export function lerELimparUltimoErroFatal(): ErroFatal | null {
  try {
    const bruto = fs.readFileSync(ARQUIVO_ULTIMO_ERRO_FATAL, "utf8");
    fs.rmSync(ARQUIVO_ULTIMO_ERRO_FATAL, { force: true });
    return JSON.parse(bruto) as ErroFatal;
  } catch {
    return null;
  }
}

/** Pastas configuradas que sumiram/ficaram inacessíveis (disco removido, pasta renomeada, rede caiu) — sem isso o agente fica "online" no heartbeat mas nunca mais vê nota nenhuma, sem nenhum aviso. */
export function pastasInacessiveis(pastas: string[]): string[] {
  return pastas.filter((p) => {
    try {
      return !fs.statSync(p).isDirectory();
    } catch {
      return true;
    }
  });
}
