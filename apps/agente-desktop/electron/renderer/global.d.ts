export {};

declare global {
  interface Window {
    agenteApi: {
      escolherPasta(): Promise<string | null>;
      validarToken(token: string): Promise<{ ok: true; cnpjs: string[] } | { ok: false; erro: string }>;
      salvarConfiguracao(dados: { token: string; pasta: string }): Promise<{ ok: boolean }>;
      obterConfiguracaoAtual(): Promise<{ pasta: string | null }>;
      obterStatus(): Promise<EstadoAgente>;
      limparConfiguracao(): Promise<void>;
      obterVersaoMaisRecente(): Promise<{ versaoAtual: string; versaoMaisRecente: string | null }>;
      atualizarAgora(): Promise<{ ok: true } | { ok: false; erro: string }>;
    };
  }

  interface EventoAgenteStatus {
    em: string;
    arquivo?: string;
    status: "ACEITO" | "DUPLICADO" | "CNPJ_NAO_AUTORIZADO" | "INVALIDO" | "IGNORADO" | "ERRO_REDE" | "FORA_DO_PERIODO";
    detalhe?: string;
  }

  interface EstadoAgente {
    versao: string;
    iniciadoEm: string;
    pastas: string[];
    dataInicioMonitoramento: string | null;
    contadores: { lidos: number; aceitos: number; duplicados: number; recusados: number; ignorados: number; antigos: number };
    filaPendente: number;
    ultimoEnvioEm: string | null;
    ultimaNotaAceitaEm: string | null;
    ultimoErro: { em: string; mensagem: string } | null;
    ultimoHeartbeatOkEm: string | null;
    varreduraConcluida: boolean;
    arquivosNaVarredura: number;
    eventos: EventoAgenteStatus[];
    recusas: EventoAgenteStatus[];
    arquivoLog: string;
  }
}
