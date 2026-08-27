"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, CredenciaisInvalidasError, ApiInalcancavelError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="textura-chave relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <p
            className="font-display text-2xl italic"
            style={{ color: "var(--paper)" }}
          >
            Fechamento Fiscal
          </p>
          <p
            className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
            style={{ color: "var(--paper-mut)" }}
          >
            Acesso da equipe
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-lg border p-8"
          style={{
            background: "var(--ink-900)",
            borderColor: "var(--ink-border)",
          }}
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--paper-mut)" }}
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
              className="w-full rounded border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--selo)]"
              style={{
                borderColor: "var(--ink-border)",
                color: "var(--paper)",
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="senha"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--paper-mut)" }}
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="w-full rounded border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-[var(--selo)]"
              style={{
                borderColor: "var(--ink-border)",
                color: "var(--paper)",
              }}
            />
          </div>

          {erro && (
            <p className="text-sm" style={{ color: "var(--alerta)" }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded py-2.5 text-sm font-medium tracking-wide transition-opacity disabled:opacity-50"
            style={{ background: "var(--selo)", color: "var(--ink-950)" }}
          >
            {carregando ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "var(--paper-mut)" }}
        >
          Acesso restrito à equipe autorizada.
        </p>
      </div>
    </main>
  );
}
