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
