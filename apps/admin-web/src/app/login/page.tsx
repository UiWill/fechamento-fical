"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, CredenciaisInvalidasError, ApiInalcancavelError } from "@/lib/api";

function IconeOlho() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="18" height="18">
      <path d="M1.5 12s3.75-7 10.5-7 10.5 7 10.5 7-3.75 7-10.5 7-10.5-7-10.5-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconeOlhoFechado() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="18" height="18">
      <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M6.3 6.4C3.9 8 2 10.5 1.5 12c0 0 3.75 7 10.5 7 2.06 0 3.83-.55 5.3-1.3M9.9 4.24A11.6 11.6 0 0 1 12 4c6.75 0 10.5 7 10.5 7-.53 1.15-1.6 2.85-3.25 4.3" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const resultado = await login(email, senha);
      localStorage.setItem("afe_token", resultado.token);
      localStorage.setItem("afe_organizacao_id", resultado.usuario.organizacaoId ?? "");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof CredenciaisInvalidasError) {
        setErro("E-mail ou senha não conferem. Confira e tente de novo.");
      } else if (err instanceof ApiInalcancavelError) {
        setErro("Não foi possível contatar o servidor. Verifique sua conexão.");
      } else {
        setErro("Algo deu errado ao entrar. Tente de novo em instantes.");
      }
      setCarregando(false);
    }
  }

  return (
    <main className="fundo-editorial relative flex min-h-screen items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-[23rem]">
        <div className="entra mb-10 text-center" style={{ animationDelay: "0ms" }}>
          <p className="font-display text-[2.25rem] italic leading-none" style={{ color: "var(--paper)" }}>
            Fechamento Fiscal Fácil
          </p>
          <p
            className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)" }}
          >
            Acesso da equipe
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="entra space-y-7"
          style={{ animationDelay: "90ms" }}
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="campo"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="senha"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={senhaVisivel ? "text" : "password"}
                required
                autoComplete="current-password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                className="campo"
                style={{ paddingRight: "2rem" }}
              />
              <button
                type="button"
                onClick={() => setSenhaVisivel((v) => !v)}
                aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1"
                style={{ color: "var(--muted)" }}
              >
                {senhaVisivel ? <IconeOlhoFechado /> : <IconeOlho />}
              </button>
            </div>
          </div>

          {erro && (
            <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
              {erro}
            </p>
          )}

          <button type="submit" disabled={carregando} className="botao-principal">
            {carregando && <span className="spinner" />}
            {carregando ? "Entrando" : "Entrar"}
          </button>
        </form>

        <p
          className="entra-suave mt-10 text-center text-xs"
          style={{ color: "var(--muted-2)", animationDelay: "300ms" }}
        >
          Acesso restrito à equipe autorizada.
        </p>
      </div>
    </main>
  );
}
