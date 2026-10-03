/**
 * Notificação nativa do Windows — agora via API do próprio Electron
 * (`Notification`), que usa o Central de Ações do Windows de verdade (as
 * mesmas notificações de qualquer app instalado). Antes disso rodávamos
 * PowerShell/WinForms pra simular um balão porque o executável era Node
 * puro sem esse tipo de API — não precisa mais desse rodeio.
 */
import { Notification } from "electron";

export function notificar(titulo: string, mensagem: string): void {
  if (!Notification.isSupported()) {
    console.log(`[notify] ${titulo}: ${mensagem}`);
    return;
  }
  try {
    new Notification({ title: titulo, body: mensagem }).show();
  } catch (err) {
    // Notificação é só um "extra" — nunca deve derrubar o agente.
    console.error(`[notify] falha ao notificar: ${err}`);
  }
}
