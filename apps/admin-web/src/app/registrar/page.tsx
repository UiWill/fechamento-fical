"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validarDigitosCnpj } from "@afe/shared";
import { registrarConta, ContaJaExisteError, ApiInalcancavelError } from "@/lib/api";

export default function RegistrarPage() {
  const router = useRouter();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (!validarDigitosCnpj(cnpjLimpo)) {
      setErro("CNPJ inválido — confira os números digitados.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      const resultado = await registrarConta({
        razaoSocial,
        cnpj: cnpjLimpo,
        nomeResponsavel,
        email,
        senha,
      });
      localStorage.setItem("afe_token", resultado.token);
      localStorage.setItem("afe_organizacao_id", resultado.usuario.organizacaoId ?? "");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ContaJaExisteError) {
        setErro(err.message);
      } else if (err instanceof ApiInalcancavelError) {
        setErro("Não foi possível contatar o servidor. Verifique sua conexão.");
      } else {
        setErro("Algo deu errado ao criar a conta. Tente de novo em instantes.");
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
            Criar conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="entra space-y-6" style={{ animationDelay: "90ms" }}>
          <div className="space-y-1.5">
            <label
              htmlFor="razaoSocial"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Razão social
            </label>
            <input
              id="razaoSocial"
              required
              value={razaoSocial}
              onChange={(event) => setRazaoSocial(event.target.value)}
              className="campo"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="cnpj"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              CNPJ
            </label>
            <input
              id="cnpj"
              required
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
              className="campo"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="nomeResponsavel"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Seu nome
            </label>
            <input
              id="nomeResponsavel"
              required
              value={nomeResponsavel}
              onChange={(event) => setNomeResponsavel(event.target.value)}
              className="campo"
            />
          </div>

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
            <input
              id="senha"
              type="password"
              required
              autoComplete="new-password"
              minLength={6}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="campo"
            />
          </div>

          {erro && (
            <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
              {erro}
            </p>
          )}

          <button type="submit" disabled={carregando} className="botao-principal">
            {carregando && <span className="spinner" />}
            {carregando ? "Criando conta" : "Criar conta"}
          </button>
        </form>

        <p
          className="entra-suave mt-10 text-center text-xs"
          style={{ color: "var(--muted-2)", animationDelay: "300ms" }}
        >
          Já tem conta?{" "}
          <Link href="/login" className="underline underline-offset-4" style={{ color: "var(--muted)" }}>
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
