/**
 * Garante que só existe uma cópia do agente rodando ao mesmo tempo.
 *
 * Isso é o que permite a tarefa agendada (ver watchdog.ts) simplesmente
 * tentar abrir o .exe de novo a cada poucos minutos sem se preocupar se
 * já tem uma cópia rodando: se já tiver, essa segunda cópia se detecta
 * aqui e fecha sozinha na hora, sem fazer nada — só quando a cópia
 * anterior realmente não existe mais (ex: alguém encerrou pelo
 * Gerenciador de Tarefas) que essa nova cópia segue em frente, e nesse
 * caso ela *é* o "religamento automático".
 */
import fs from "node:fs";
import path from "node:path";
import { PASTA_CONFIG } from "./config";
import { abrirPainelNoNavegador, lerPortaDoPainel } from "./painel-local";

const ARQUIVO_LOCK = path.join(PASTA_CONFIG, "instancia.lock");

function processoVivo(pid: number): boolean {
  try {
    // sinal 0 não mata nada, só confere se o PID existe — funciona no
    // Windows também, apesar do modelo de sinais ali ser diferente do
    // Unix (o Node abstrai isso).
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Se já tem outra cópia rodando, encerra este processo na hora. Quando quem
 * abriu foi uma pessoa (duplo clique no .exe), abre a página de status da
 * cópia que já está rodando — a tarefa agendada do vigia passa `--vigia`
 * pra não ficar abrindo o navegador a cada 5 minutos.
 */
export function encerrarSeJaTiverOutraCopia(): void {
  fs.mkdirSync(PASTA_CONFIG, { recursive: true });

  if (fs.existsSync(ARQUIVO_LOCK)) {
    const pidAnterior = Number(fs.readFileSync(ARQUIVO_LOCK, "utf8").trim());
    if (pidAnterior && pidAnterior !== process.pid && processoVivo(pidAnterior)) {
      if (!process.argv.includes("--vigia")) {
        const porta = lerPortaDoPainel();
        if (porta) abrirPainelNoNavegador(porta);
      }
      process.exit(0);
    }
  }

  fs.writeFileSync(ARQUIVO_LOCK, String(process.pid), "utf8");
}
