/**
 * Ponte segura entre as janelas (HTML/JS comum, sem acesso a Node) e o
 * processo principal — `contextIsolation` fica ligado (padrão recomendado
 * pelo próprio Electron), então as páginas só enxergam exatamente essas
 * funções, nada além disso.
 */
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("agenteApi", {
  escolherPasta: (): Promise<string | null> => ipcRenderer.invoke("escolher-pasta"),
  validarToken: (token: string): Promise<{ ok: true; cnpjs: string[] } | { ok: false; erro: string }> =>
    ipcRenderer.invoke("validar-token", token),
  salvarConfiguracao: (dados: { token: string; pasta: string }): Promise<{ ok: boolean }> =>
    ipcRenderer.invoke("salvar-configuracao", dados),
  obterConfiguracaoAtual: (): Promise<{ pasta: string | null }> => ipcRenderer.invoke("obter-configuracao-atual"),
  obterStatus: (): Promise<unknown> => ipcRenderer.invoke("obter-status"),
});
