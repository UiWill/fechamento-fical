/**
 * Mostra uma caixa de mensagem nativa do Windows quando o agente não
 * consegue nem começar a rodar (token inválido, sem internet, configuração
 * cancelada, etc). Sem isso, como o .exe roda sem janela nem console de
 * propósito (pra ficar em segundo plano), qualquer erro nessa fase inicial
 * morria em silêncio: a pessoa clicava duas vezes, nada aparecia na tela, e
 * não tinha como saber que algo deu errado sem abrir o agente.log à mão
 * (ninguém não-técnico vai pensar nisso sozinho).
 *
 * Só mostra quando quem chamou foi uma pessoa de verdade (duplo clique) —
 * a tarefa agendada do vigia (watchdog.ts) roda com `--vigia` e tenta de
 * novo sozinha a cada poucos minutos, então um alerta a cada tentativa
 * falha seria só ruído; o log em arquivo continua registrando tudo mesmo
 * nesse caso.
 */
import { execFileSync } from "node:child_process";

function escaparAspasSimples(texto: string): string {
  return texto.replace(/'/g, "''");
}

export function mostrarErroFatalSeForPessoa(mensagem: string): void {
  if (process.argv.includes("--vigia") || process.platform !== "win32") return;
  try {
    const script = `
      Add-Type -AssemblyName System.Windows.Forms
      [System.Windows.Forms.MessageBox]::Show('${escaparAspasSimples(mensagem)}', 'Agente Fiscal', [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error) | Out-Null
    `;
    execFileSync("powershell.exe", ["-NoProfile", "-Command", script], { windowsHide: true });
  } catch {
    // se nem isso funcionar, não tem mais nada a fazer além do que já foi pro agente.log
  }
}
