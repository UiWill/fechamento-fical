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

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
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
