/**
 * Notificação nativa do Windows (balão) via PowerShell/WinForms — mesmo
 * princípio do setup.ts (usar só o que já vem com o Windows). Evitamos
 * bibliotecas tipo node-notifier de propósito: elas dependem de um
 * executável auxiliar (ex: SnoreToast) que fica num caminho relativo
 * dentro de node_modules — isso quebra assim que o agente é empacotado
 * num .exe único (Node SEA), onde não existe mais node_modules do lado de
 * fora. Rodado destacado (spawn + unref) pra não travar o processo
 * principal esperando o balão sumir.
 */
import { spawn } from "node:child_process";

function escaparAspasSimples(texto: string): string {
  return texto.replace(/'/g, "''");
}

export function notificar(titulo: string, mensagem: string): void {
  if (process.platform !== "win32") {
    console.log(`[notify] ${titulo}: ${mensagem}`);
    return;
  }

  const script = `
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    $icone = New-Object System.Windows.Forms.NotifyIcon
    $icone.Icon = [System.Drawing.SystemIcons]::Information
    $icone.Visible = $true
    $icone.BalloonTipTitle = '${escaparAspasSimples(titulo)}'
    $icone.BalloonTipText = '${escaparAspasSimples(mensagem)}'
    $icone.ShowBalloonTip(5000)
    Start-Sleep -Seconds 6
    $icone.Dispose()
  `;

  try {
    const processo = spawn("powershell.exe", ["-NoProfile", "-WindowStyle", "Hidden", "-Command", script], {
      detached: true,
      stdio: "ignore",
    });
    processo.unref();
  } catch (err) {
    // Notificação é só um "extra" — nunca deve derrubar o agente.
    console.error(`[notify] falha ao notificar: ${err}`);
  }
}
