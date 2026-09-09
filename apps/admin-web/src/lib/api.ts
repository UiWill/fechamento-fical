const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    papel: string;
    organizacaoId: string | null;
  };
}

export class CredenciaisInvalidasError extends Error {}
export class ApiInalcancavelError extends Error {}

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
  const response = await fetch(`${API_URL}/empresas?organizacaoId=${organizacaoId}`, {
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
  const response = await fetch(`${API_URL}/empresas`, {
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
  const response = await fetch(`${API_URL}/empresas/consulta-cnpj/${cnpj}`, {
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
}

export async function buscarEmpresa(id: string, token: string): Promise<EmpresaDetalhe> {
  const response = await fetch(`${API_URL}/empresas/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Não foi possível carregar essa empresa.");
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
  const response = await fetch(`${API_URL}/certificados/por-empresa/${empresaId}`, {
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
  validoAte: string;
}

export async function uploadCertificado(
  input: UploadCertificadoInput,
  token: string
): Promise<CertificadoResumo> {
  const response = await fetch(`${API_URL}/certificados`, {
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

export interface DocumentoFiscal {
  id: string;
  chaveAcesso: string;
  tipo: "NFE" | "NFCE";
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
}

export async function listarDocumentosFiscais(
  empresaId: string,
  token: string
): Promise<DocumentoFiscal[]> {
  const response = await fetch(`${API_URL}/empresas/${empresaId}/documentos-fiscais`, {
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
  const response = await fetch(
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
  const response = await fetch(`${API_URL}/regras-fiscais?organizacaoId=${organizacaoId}`, {
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
  const response = await fetch(`${API_URL}/regras-fiscais`, {
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
  const response = await fetch(`${API_URL}/regras-fiscais/classificar/${empresaId}`, {
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
  const response = await fetch(`${API_URL}/empresas/${empresaId}/manifestacoes`, {
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
