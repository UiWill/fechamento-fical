/**
 * "Vigia" contra o agente ser encerrado (ex: alguém abre o Gerenciador de
 * Tarefas e clica em "Finalizar tarefa" sem saber o que é aquilo, ou o
 * processo crasha num PC de cliente leigo que não saberia reabrir
 * sozinho). Não dá pra um processo já morto se religar sozinho — precisa
 * de outra coisa verificando de fora. Uma Tarefa Agendada do Windows,
 * criada só pro usuário atual (sem precisar de administrador — decisão
 * deliberada: um Serviço do Windows seria mais robusto em teoria, mas
 * exige elevação de admin pra instalar e roda isolado da área de
 * trabalho do usuário logado, então não consegue reabrir o app COM a
 * notificação/ícone normal sem engenharia extra; não vale o risco de
 * quebrar a instalação justamente no cliente leigo que isso protege —
 * decisão com o usuário em 2026-10-23), resolve isso: a cada poucos
 * minutos ela tenta abrir o .exe de novo. Se já tiver uma cópia rodando,
 * essa nova se fecha sozinha na hora (ver instancia-unica.ts) — só
 * quando a cópia anterior foi mesmo encerrada é que essa nova segue em
 * frente, e aí ela *é* o religamento automático.
 */
import { execFileSync } from "node:child_process";

const NOME_TAREFA = "AfeAgenteDesktopVigia";
// 1 minuto (era 5) — pedido explícito do usuário em 2026-10-23: cliente
// leigo não sabe religar o app sozinho, então o tempo até religar
// automaticamente precisa ser o menor possível.
const INTERVALO_MINUTOS = "1";

/**
 * Devolve se a tarefa ficou registrada — sem isso, uma falha aqui
 * (antivírus bloqueando schtasks, política corporativa desabilitando
 * Tarefas Agendadas, serviço "Agendador de Tarefas" do Windows
 * desligado) ficava só num log local que ninguém olha, e o agente perdia
 * TODA a proteção contra travamento sem nenhum aviso em lugar nenhum
 * (achado numa varredura de QA em 2026-10-23, depois do crash-loop da
 * Josiane — o vigia é exatamente o que deveria ter religado aquele
 * agente rápido, então uma falha silenciosa aqui é especialmente grave).
 */
export function habilitarVigiaPeriodica(caminhoExecutavel: string): boolean {
  if (process.platform !== "win32") {
    console.log("[watchdog] plataforma não é Windows — pulando tarefa de vigia.");
    return false;
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
      INTERVALO_MINUTOS,
      "/f",
    ]);
    console.log(`[watchdog] tarefa de vigia habilitada (confere a cada ${INTERVALO_MINUTOS} minuto(s)).`);
    return true;
  } catch (err) {
    console.error(`[watchdog] FALHA ao habilitar tarefa de vigia — agente SEM proteção contra travamento: ${err}`);
    return false;
  }
}
