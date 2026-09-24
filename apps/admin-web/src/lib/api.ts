export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    papel: string;
    organizacaoId: string | null;
    organizacaoNome: string | null;
  };
}

export class SessaoExpiradaError extends Error {}

const CHAVES_SESSAO = ["afe_token", "afe_organizacao_id", "afe_organizacao_nome"];

export function limparSessao(): void {
  try {
    for (const chave of CHAVES_SESSAO) localStorage.removeItem(chave);
  } catch {
    // storage indisponível: nada a limpar
  }
}

export function sairDaConta(): void {
  limparSessao();
  window.location.href = "/login";
}

/**
 * fetch pras rotas autenticadas: se a API responder 401 o token venceu (ou
 * foi invalidado), então limpa a sessão e volta pro login em vez de deixar
 * a tela presa numa mensagem de erro genérica. Não usar em login/registrar,
 * onde 401 significa "senha errada" e não "sessão expirada".
 */
async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  if (response.status === 401 && typeof window !== "undefined") {
    limparSessao();
    window.location.href = "/login";
    throw new SessaoExpiradaError();
  }
  return response;
}

export class CredenciaisInvalidasError extends Error {}
export class ApiInalcancavelError extends Error {}
export class ContaJaExisteError extends Error {}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
  } catch {
    // fetch só lança aqui por falha de rede/DNS/CORS — nunca por senha errada
    throw new ApiInalcancavelError(`Não foi possível contatar ${API_URL}`);
  }

  if (response.status === 401) {
    throw new CredenciaisInvalidasError();
  }
  if (!response.ok) {
    throw new Error(`API respondeu ${response.status}`);
  }

  return response.json();
}

export interface RegistrarContaInput {
  razaoSocial: string;
  cnpj: string;
  nomeResponsavel: string;
  email: string;
  senha: string;
}

export async function registrarConta(input: RegistrarContaInput): Promise<LoginResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/registrar`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ApiInalcancavelError(`Não foi possível contatar ${API_URL}`);
  }

  if (response.status === 409) {
    const corpo = await response.json().catch(() => null);
    throw new ContaJaExisteError(corpo?.message ?? "Já existe uma conta com esses dados.");
  }
  if (!response.ok) {
    const corpo = await response.json().catch(() => null);
    throw new Error(corpo?.message || `API respondeu ${response.status}`);
  }

  return response.json();
}

export interface EmpresaResumo {
  id: string;
  cnpj: string;
  razaoSocial: string;
  status: "ATIVA" | "INATIVA";
  uf: string;
}

export async function listarEmpresas(
  organizacaoId: string,
  token: string
): Promise<EmpresaResumo[]> {
  const response = await apiFetch(`${API_URL}/empresas?organizacaoId=${organizacaoId}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar empresas");
  }

  return response.json();
}

export interface CriarEmpresaInput {
  organizacaoId: string;
  cnpj: string;
  razaoSocial: string;
  uf: string;
  codigoUf: number;
  ambiente: "PRODUCAO" | "HOMOLOGACAO";
}

export async function criarEmpresa(
  input: CriarEmpresaInput,
  token: string
): Promise<EmpresaResumo> {
  const response = await apiFetch(`${API_URL}/empresas`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }

  return response.json();
}

export interface DadosCnpjConsultado {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  uf: string;
  codigoUf: number;
  situacaoCadastral: string | null;
}

export class CnpjNaoEncontradoError extends Error {}

export async function consultarCnpj(
  cnpj: string,
  token: string
): Promise<DadosCnpjConsultado> {
  const response = await apiFetch(`${API_URL}/empresas/consulta-cnpj/${cnpj}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    throw new CnpjNaoEncontradoError();
  }
  if (!response.ok) {
    throw new Error("Consulta de CNPJ indisponível no momento.");
  }

  return response.json();
}

export interface EmpresaDetalhe extends EmpresaResumo {
  organizacaoId: string;
  codigoUf: number;
  ambiente: "PRODUCAO" | "HOMOLOGACAO";
  ativadaEm: string;
  ultimaSincronizacaoEm: string | null;
  ultimoCStatSefaz: string | null;
  ultimoXMotivoSefaz: string | null;
}

export async function buscarEmpresa(id: string, token: string): Promise<EmpresaDetalhe> {
  const response = await apiFetch(`${API_URL}/empresas/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível carregar essa empresa.");
  }
  return response.json();
}

export async function alterarAmbienteEmpresa(
  id: string,
  ambiente: "PRODUCAO" | "HOMOLOGACAO",
  token: string
): Promise<EmpresaDetalhe> {
  const response = await apiFetch(`${API_URL}/empresas/${id}/ambiente`, {
    method: "PATCH",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({ ambiente }),
  });
  if (!response.ok) {
    throw new Error("Não foi possível trocar o ambiente dessa empresa.");
  }
  return response.json();
}

export interface CertificadoResumo {
  id: string;
  nomeArquivoOriginal: string;
  validoAte: string;
  criadoEm: string;
}

export async function buscarCertificado(
  empresaId: string,
  token: string
): Promise<CertificadoResumo | null> {
  const response = await apiFetch(`${API_URL}/certificados/por-empresa/${empresaId}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível verificar o certificado dessa empresa.");
  }
  return response.json();
}

export interface UploadCertificadoInput {
  empresaId: string;
  nomeArquivoOriginal: string;
  pfxBase64: string;
  senha: string;
}

export async function uploadCertificado(
  input: UploadCertificadoInput,
  token: string
): Promise<CertificadoResumo> {
  const response = await apiFetch(`${API_URL}/certificados`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const corpo = await response.json().catch(() => null);
    throw new Error(corpo?.message || `API respondeu ${response.status}`);
  }
  return response.json();
}

export interface DocumentoFiscal {
  id: string;
  chaveAcesso: string;
  tipo: "NFE" | "NFCE" | "CTE";
  direcao: "ENTRADA" | "SAIDA";
  status: string;
  nomeEmitente: string | null;
  cfop: string | null;
  observacao: string | null;
  acumulador: string | null;
  classificadoEm: string | null;
  valorTotal: string | null;
  emitidoEm: string | null;
  recebidoEm: string;
  /** Só existe pra documentos de SAIDA — de qual instalação do agente desktop veio. */
  agenteInstalacaoToken: { nome: string } | null;
}

export async function listarDocumentosFiscais(
  empresaId: string,
  token: string
): Promise<DocumentoFiscal[]> {
  const response = await apiFetch(`${API_URL}/empresas/${empresaId}/documentos-fiscais`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível carregar os documentos fiscais.");
  }
  return response.json();
}

export interface SincronizacaoResultado {
  documentosNovos: number;
  ultimoNsu: number;
  cStat: string;
  xMotivo: string;
  limiteSefazAtingido: boolean;
  bloqueadoPelaSefaz: boolean;
  ultimaSincronizacaoEm: string;
}

export async function sincronizarDocumentos(
  empresaId: string,
  token: string
): Promise<SincronizacaoResultado> {
  const response = await apiFetch(
    `${API_URL}/empresas/${empresaId}/documentos-fiscais/sincronizar`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

export interface RegraFiscal {
  id: string;
  organizacaoId: string;
  empresaId: string | null;
  cfopEntrada: string;
  descricao: string;
  observacao: string | null;
  acumulador: string | null;
  ativa: boolean;
}

export async function listarRegrasFiscais(
  organizacaoId: string,
  token: string
): Promise<RegraFiscal[]> {
  const response = await apiFetch(`${API_URL}/regras-fiscais?organizacaoId=${organizacaoId}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível carregar as regras fiscais.");
  }
  return response.json();
}

export interface CriarRegraFiscalInput {
  organizacaoId: string;
  empresaId?: string | null;
  cfopEntrada: string;
  descricao: string;
  observacao?: string;
  acumulador?: string;
}

export async function criarRegraFiscal(
  input: CriarRegraFiscalInput,
  token: string
): Promise<RegraFiscal> {
  const response = await apiFetch(`${API_URL}/regras-fiscais`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

export interface ClassificacaoResultado {
  total: number;
  classificados: number;
  semRegra: number;
  semCfop: number;
}

export async function classificarPendentes(
  empresaId: string,
  token: string
): Promise<ClassificacaoResultado> {
  const response = await apiFetch(`${API_URL}/regras-fiscais/classificar/${empresaId}`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

export type TipoEventoManifestacao =
  | "CONFIRMACAO_OPERACAO"
  | "CIENCIA_OPERACAO"
  | "DESCONHECIMENTO_OPERACAO"
  | "OPERACAO_NAO_REALIZADA";

export const ROTULO_EVENTO_MANIFESTACAO: Record<TipoEventoManifestacao, string> = {
  CIENCIA_OPERACAO: "Ciência da Operação",
  CONFIRMACAO_OPERACAO: "Confirmação da Operação",
  DESCONHECIMENTO_OPERACAO: "Desconhecimento da Operação",
  OPERACAO_NAO_REALIZADA: "Operação não Realizada",
};

export interface ManifestacaoResultado {
  id: string;
  status: "PENDENTE" | "ENVIADA" | "AUTORIZADA" | "REJEITADA";
  protocoloSefaz: string | null;
  motivoSefaz: string | null;
}

export async function enviarManifestacao(
  empresaId: string,
  input: { documentoFiscalId: string; tipo: TipoEventoManifestacao; justificativa?: string },
  token: string
): Promise<ManifestacaoResultado> {
  const response = await apiFetch(`${API_URL}/empresas/${empresaId}/manifestacoes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

export interface ExportacaoTxtResultado {
  id: string;
  status: "PENDENTE" | "PROCESSANDO" | "CONCLUIDA" | "ERRO";
  totalDocumentos: number;
  erro: string | null;
  documentosIgnorados?: number;
}

export async function gerarExportacaoTxt(
  empresaId: string,
  periodoInicio: string,
  periodoFim: string,
  token: string
): Promise<ExportacaoTxtResultado> {
  const response = await apiFetch(`${API_URL}/empresas/${empresaId}/exportacoes-txt`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ periodoInicio, periodoFim }),
  });
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

/** Baixa o TXT gerado direto pelo navegador (o link precisa do token, então não dá pra ser um <a href> simples). */
export async function baixarExportacaoTxt(
  empresaId: string,
  exportacaoId: string,
  token: string
): Promise<void> {
  const response = await apiFetch(
    `${API_URL}/empresas/${empresaId}/exportacoes-txt/${exportacaoId}/arquivo`,
    { headers: { authorization: `Bearer ${token}` } }
  );
  if (!response.ok) {
    throw new Error("Não foi possível baixar o arquivo TXT.");
  }
  const disposicao = response.headers.get("content-disposition");
  const nomeArquivo = disposicao?.match(/filename="(.+)"/)?.[1] ?? "exportacao-dominio.txt";

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Baixa um .zip com os XMLs do periodo/direcao/tipo filtrados na tela. */
export async function baixarXmlsZip(
  empresaId: string,
  direcao: "ENTRADA" | "SAIDA",
  inicio: string,
  fim: string,
  token: string,
  tipo?: "NFE" | "NFCE" | "CTE"
): Promise<void> {
  const params = new URLSearchParams({ direcao, inicio, fim });
  if (tipo) params.set("tipo", tipo);
  const response = await apiFetch(`${API_URL}/empresas/${empresaId}/documentos-fiscais/xml-zip?${params}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Não foi possível baixar os XMLs.");
  }
  const disposicao = response.headers.get("content-disposition");
  const nomeArquivo = disposicao?.match(/filename="(.+)"/)?.[1] ?? `xmls-${direcao.toLowerCase()}.zip`;

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function zerarNsu(empresaId: string, token: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/empresas/${empresaId}/documentos-fiscais/nsu/zerar`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Não foi possível zerar o NSU.");
  }
}

export interface AgenteInstalacao {
  id: string;
  nome: string;
  organizacaoId: string | null;
  empresaId: string | null;
  status: "ATIVO" | "REVOGADO";
  ultimoHeartbeatEm: string | null;
  ultimaVersaoAgente: string | null;
  anydeskId: string | null;
  nomeContato: string | null;
  telefoneContato: string | null;
  criadoEm: string;
}

export async function listarAgentes(organizacaoId: string, token: string): Promise<AgenteInstalacao[]> {
  const response = await apiFetch(`${API_URL}/agentes/tokens?organizacaoId=${organizacaoId}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível carregar os agentes.");
  }
  return response.json();
}

export interface GerarAgenteTokenInput {
  nome: string;
  organizacaoId?: string;
  empresaId?: string;
  anydeskId?: string;
  nomeContato?: string;
  telefoneContato?: string;
}

export async function gerarTokenAgente(
  input: GerarAgenteTokenInput,
  token: string
): Promise<{ id: string; nome: string; tokenRaw: string; criadoEm: string }> {
  const response = await apiFetch(`${API_URL}/agentes/tokens`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const corpo = await response.text();
    throw new Error(corpo || `API respondeu ${response.status}`);
  }
  return response.json();
}

export async function revogarTokenAgente(id: string, token: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/agentes/tokens/${id}/revogar`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Não foi possível revogar esse token.");
  }
}

export async function excluirTokenAgente(id: string, token: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/agentes/tokens/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Não foi possível excluir esse agente.");
  }
}
