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

export interface EmpresaDetalhe extends EmpresaResumo {
  organizacaoId: string;
  codigoUf: number;
  ambiente: "PRODUCAO" | "HOMOLOGACAO";
  ativadaEm: string;
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
