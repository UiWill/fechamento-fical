/**
 * Estado local do agente — token, pastas monitoradas e o registro de quais
 * chaves já foram enviadas (é isso que evita reenviar o histórico inteiro
 * toda vez que o PC reinicia: o chokidar sempre revarre a pasta inteira ao
 * iniciar, mas cada chave já registrada aqui é pulada antes de qualquer
 * chamada de rede).
 *
 * Nesta fase (2), token e pastas são editados manualmente neste arquivo —
 * a telinha de configuração (Fase 3) ainda não existe.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PASTA_CONFIG = process.env.LOCALAPPDATA
  ? path.join(process.env.LOCALAPPDATA, "AfeAgenteDesktop")
  : path.join(os.homedir(), ".afe-agente-desktop");

const ARQUIVO_CONFIG = path.join(PASTA_CONFIG, "config.json");

export type StatusArquivoEnviado = "ACEITO" | "DUPLICADO" | "CNPJ_NAO_AUTORIZADO" | "INVALIDO" | "FORA_DO_PERIODO";

export interface EstadoArquivoEnviado {
  status: StatusArquivoEnviado;
  enviadoEm: string;
  // false quando o XML enviado não tinha CFOP/valor (ex: PDV mandou um
  // resumo antes do XML completo) — permite reenviar essa mesma chave se
  // uma versão mais completa aparecer depois. undefined (registros
  // antigos, de antes desse campo existir) é tratado como "completo" pra
  // não disparar reenvio em massa de histórico já processado.
  completo?: boolean;
}

export interface EmpresaEscopoLocal {
  cnpj: string;
  dataInicioMonitoramento: string | null;
}

export interface ConfigAgente {
  token: string | null;
  pastasMonitoradas: string[];
  chavesEnviadas: Record<string, EstadoArquivoEnviado>;
  versaoAgente: string;
  ultimoHeartbeatEm: string | null;
  // Snapshot do ultimo /escopo -- usado pra saber a partir de quando
  // captar cada empresa sem precisar perguntar o servidor por arquivo.
  escopoEmpresas: EmpresaEscopoLocal[];
  // Caminho absoluto -> quando foi avaliado como "antigo demais" (pulado
  // sem precisar reler o arquivo nas proximas varreduras).
  arquivosAntigosIgnorados: Record<string, { mtimeMs: number; cortadoEm: string }>;
  // Caminho absoluto -> ja enviado com sucesso (ACEITO ou DUPLICADO) com
  // esse mtime exato. Sem isso, toda varredura (todo reinicio do PC) lia
  // e reprocessava o CONTEUDO de todo arquivo ja enviado so pra
  // redescobrir a mesma chave de acesso e so entao pular pelo
  // chavesEnviadas -- trabalho de CPU/disco repetido a toa em PC fraco
  // com anos de XML na pasta. Com isso, pula sem nem abrir o arquivo,
  // mesmo padrao ja usado em arquivosAntigosIgnorados (pedido do usuario
  // em 2026-10-22: tirar peso do PC do cliente sempre que der, sem mudar
  // o resultado final).
  arquivosJaEnviados: Record<string, { mtimeMs: number; chaveAcesso: string }>;
  // Freio de segurança contra loop de atualização — ver updater.ts. Se o
  // alvo não muda entre tentativas, a versão nunca avançou de verdade
  // (instalador não substituiu o binário por algum motivo), e depois de
  // algumas tentativas seguidas o agente desiste de tentar sozinho em vez
  // de ficar baixando e reinstalando pra sempre (achado em 2026-10-26).
  ultimaVersaoAlvoAtualizacao: string | null;
  tentativasAtualizacaoFalhas: number;
}

// Embutido em tempo de build (ver build-exe.mjs) com a versão real que
// vai ser publicada — sem isso, todo .exe novo nascia achando que era a
// "0.1.0" até a primeira verificação de atualização se autocorrigir,
// baixando e reiniciando por nada (a versão que ele já era).
const VERSAO_PADRAO = process.env.AFE_AGENTE_VERSAO_BUILD ?? "0.1.0";

const CONFIG_PADRAO: ConfigAgente = {
  token: null,
  pastasMonitoradas: [],
  chavesEnviadas: {},
  versaoAgente: VERSAO_PADRAO,
  ultimoHeartbeatEm: null,
  escopoEmpresas: [],
  arquivosAntigosIgnorados: {},
  arquivosJaEnviados: {},
  ultimaVersaoAlvoAtualizacao: null,
  tentativasAtualizacaoFalhas: 0,
};

export function carregarConfig(): ConfigAgente {
  if (!fs.existsSync(ARQUIVO_CONFIG)) return { ...CONFIG_PADRAO };
  try {
    const bruto = fs.readFileSync(ARQUIVO_CONFIG, "utf8");
    // versaoAgente sempre vem do build atual (VERSAO_PADRAO), nunca do
    // arquivo salvo — sem isso, um config.json deixado por uma instalação
    // anterior (ex: trocar de versão 1.x pra 2.x no mesmo PC) fazia o
    // programa achar pra sempre que ainda era a versão velha, mesmo
    // rodando o .exe novo, até o primeiro ciclo de auto-atualização bem
    // sucedido reescrever o campo.
    return { ...CONFIG_PADRAO, ...JSON.parse(bruto), versaoAgente: VERSAO_PADRAO };
  } catch {
    // Config corrompida — melhor comecar do zero (vai revarrer a pasta e
    // reenviar tudo, mas o servidor trata reenvio como DUPLICADO) do que
    // travar o agente pra sempre.
    return { ...CONFIG_PADRAO };
  }
}

/** Escrita atômica (arquivo temporário + rename) — nunca deixa o config pela metade se o processo morrer no meio da gravação. */
export function salvarConfig(config: ConfigAgente): void {
  fs.mkdirSync(PASTA_CONFIG, { recursive: true });
  const arquivoTemp = `${ARQUIVO_CONFIG}.tmp`;
  fs.writeFileSync(arquivoTemp, JSON.stringify(config, null, 2), "utf8");
  fs.renameSync(arquivoTemp, ARQUIVO_CONFIG);
}

export { ARQUIVO_CONFIG, PASTA_CONFIG };
