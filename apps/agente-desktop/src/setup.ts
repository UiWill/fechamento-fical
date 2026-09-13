/**
 * Configuração inicial via diálogos nativos do Windows (PowerShell +
 * WinForms/VisualBasic, que já vêm com qualquer instalação do Windows) —
 * nenhuma biblioteca de interface pra empacotar, só isso.
 */
import { execFileSync } from "node:child_process";
import { buscarEscopo } from "./api-client";
import { carregarConfig, salvarConfig } from "./config";

function escaparAspasSimples(texto: string): string {
  return texto.replace(/'/g, "''");
}

function executarPowerShell(script: string): string {
  return execFileSync("powershell.exe", ["-NoProfile", "-Command", script], { encoding: "utf8" }).trim();
}

function mostrarInputBox(mensagem: string, titulo: string): string | null {
  const script = `
    Add-Type -AssemblyName Microsoft.VisualBasic
    [Microsoft.VisualBasic.Interaction]::InputBox('${escaparAspasSimples(mensagem)}', '${escaparAspasSimples(titulo)}')
  `;
  const resultado = executarPowerShell(script);
  return resultado || null;
}

function mostrarSeletorDePasta(mensagem: string): string | null {
  const script = `
    Add-Type -AssemblyName System.Windows.Forms
    $dialogo = New-Object System.Windows.Forms.FolderBrowserDialog
    $dialogo.Description = '${escaparAspasSimples(mensagem)}'
    if ($dialogo.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
      Write-Output $dialogo.SelectedPath
    }
  `;
  const resultado = executarPowerShell(script);
  return resultado || null;
}

/** Roda o fluxo de primeira configuração e já grava o resultado no config local. */
export async function rodarConfiguracaoInicial(): Promise<void> {
  if (process.platform !== "win32") {
    throw new Error(
      "Configuração interativa só funciona no Windows. Edite o config.json manualmente pra testar em outra plataforma."
    );
  }

  console.log("[setup] iniciando configuração...");

  let token: string | null = null;
  while (!token) {
    const digitado = mostrarInputBox(
      "Cole aqui o código de instalação gerado no painel (menu Agentes desktop → Gerar token):",
      "Configuração do Agente Fiscal"
    );
    if (!digitado) {
      throw new Error("Configuração cancelada pelo usuário.");
    }
    try {
      const { cnpjs } = await buscarEscopo(digitado);
      console.log(`[setup] token válido — autorizado para ${cnpjs.length} CNPJ(s).`);
      token = digitado;
    } catch {
      mostrarInputBox(
        "Esse código não é válido ou não foi possível confirmar com o servidor. Cole novamente:",
        "Código inválido"
      );
    }
  }

  const pasta = mostrarSeletorDePasta("Selecione a pasta onde as notas fiscais de saída (NF-e/NFC-e/CT-e) são salvas");
  if (!pasta) {
    throw new Error("Nenhuma pasta selecionada — configuração cancelada.");
  }

  const config = carregarConfig();
  config.token = token;
  config.pastasMonitoradas = [pasta];
  salvarConfig(config);

  console.log(`[setup] configuração concluída — observando: ${pasta}`);
}
