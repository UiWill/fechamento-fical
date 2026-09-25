/** Cliente HTTP fino pras rotas do agente no core-api (autenticação via header x-agente-token, não JWT). */
import type { StatusArquivoEnviado } from "./config";

const API_URL = process.env.AFE_CORE_API_URL ?? "http://localhost:3000";

export interface ItemDocumentoUpload {
  nomeArquivoOriginal: string;
  xmlBase64: string;
}

export interface ResultadoItemUpload {
  nomeArquivoOriginal: string;
  status: StatusArquivoEnviado;
  chaveAcesso?: string;
  documentoFiscalId?: string;
  motivo?: string;
}

function cabecalhos(token: string): Record<string, string> {
  return { "content-type": "application/json", "x-agente-token": token };
}

export async function buscarEscopo(token: string): Promise<{ cnpjs: string[] }> {
  const resposta = await fetch(`${API_URL}/agente-ingestao/escopo`, { headers: cabecalhos(token) });
  if (!resposta.ok) throw new Error(`Falha ao buscar escopo (${resposta.status})`);
  return resposta.json() as Promise<{ cnpjs: string[] }>;
}

export async function enviarHeartbeat(token: string, versaoAgente: string, telemetria?: unknown): Promise<void> {
  const resposta = await fetch(`${API_URL}/agente-ingestao/heartbeat`, {
    method: "POST",
    headers: cabecalhos(token),
    body: JSON.stringify({ versaoAgente, telemetria }),
  });
  if (!resposta.ok) throw new Error(`Falha ao enviar heartbeat (${resposta.status})`);
}

export async function enviarLoteDocumentos(
  token: string,
  documentos: ItemDocumentoUpload[]
): Promise<ResultadoItemUpload[]> {
  const resposta = await fetch(`${API_URL}/agente-ingestao/documentos`, {
    method: "POST",
    headers: cabecalhos(token),
    body: JSON.stringify({ documentos }),
  });
  if (!resposta.ok) {
    const corpo = await resposta.text();
    throw new Error(`Falha ao enviar lote de documentos (${resposta.status}): ${corpo}`);
  }
  const dados = (await resposta.json()) as { resultados: ResultadoItemUpload[] };
  return dados.resultados;
}

export interface InfoVersaoMaisRecente {
  versao: string | null;
  obrigatoria: boolean;
  urlDownload: string | null;
}

export async function buscarVersaoMaisRecente(token: string): Promise<InfoVersaoMaisRecente> {
  const resposta = await fetch(`${API_URL}/agente-ingestao/versoes/mais-recente`, { headers: cabecalhos(token) });
  if (!resposta.ok) throw new Error(`Falha ao buscar versão mais recente (${resposta.status})`);
  return resposta.json() as Promise<InfoVersaoMaisRecente>;
}

export async function baixarVersao(token: string, versao: string): Promise<Buffer> {
  const resposta = await fetch(`${API_URL}/agente-ingestao/versoes/${versao}/download`, {
    headers: cabecalhos(token),
  });
  if (!resposta.ok) throw new Error(`Falha ao baixar versão ${versao} (${resposta.status})`);
  const arrayBuffer = await resposta.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
