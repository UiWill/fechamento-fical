/**
 * "Vigia" contra o agente ser encerrado (ex: alguém abre o Gerenciador de
 * Tarefas e clica em "Finalizar tarefa" sem saber o que é aquilo). Não dá
 * pra um processo já morto se religar sozinho — precisa de outra coisa
 * verificando de fora. Uma Tarefa Agendada do Windows, criada só pro
 * usuário atual (sem precisar de administrador), resolve isso: a cada
 * poucos minutos ela tenta abrir o .exe de novo. Se já tiver uma cópia
 * rodando, essa nova se fecha sozinha na hora (ver instancia-unica.ts) —
 * só quando a cópia anterior foi mesmo encerrada é que essa nova segue
 * em frente, e aí ela *é* o religamento automático.
 */
import { execFileSync } from "node:child_process";

const NOME_TAREFA = "AfeAgenteDesktopVigia";

export function habilitarVigiaPeriodica(caminhoExecutavel: string): void {
  if (process.platform !== "win32") {
    console.log("[watchdog] plataforma não é Windows — pulando tarefa de vigia.");
    return;
  }
  try {
    execFileSync("schtasks", [
      "/create",
      "/tn",
      NOME_TAREFA,
      "/tr",
      `"${caminhoExecutavel}" --vigia`,
      "/sc",
      "minute",
      "/mo",
      "5",
      "/f",
    ]);
    console.log("[watchdog] tarefa de vigia habilitada (confere a cada 5 minutos).");
  } catch (err) {
    console.error(`[watchdog] falha ao habilitar tarefa de vigia: ${err}`);
  }
}
