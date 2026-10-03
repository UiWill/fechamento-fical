"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trocarSenha } from "@/lib/api";

export default function TrocarSenhaPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("afe_token");
    if (!t) {
      router.push("/login");
      return;
    }
    setToken(t);
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return;
    setErro(null);
    setSucesso(false);

    if (novaSenha.length < 8) {
      setErro("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("As duas senhas novas não são iguais.");
      return;
    }

    setSalvando(true);
    try {
      await trocarSenha(senhaAtual, novaSenha, token);
      setSucesso(true);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível trocar a senha agora.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="entra mx-auto max-w-md space-y-6">
      <div>
        <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
          Trocar senha
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Confirme a senha atual pra definir uma nova.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Senha atual
          </label>
          <input
            type="password"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
            autoComplete="current-password"
            className="campo text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Nova senha
          </label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="campo text-sm"
          />
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            Mínimo 8 caracteres.
          </p>
        </div>
        <div>
          <label className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Confirmar nova senha
          </label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            autoComplete="new-password"
            className="campo text-sm"
          />
        </div>

        {erro && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erro}
          </p>
        )}
        {sucesso && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            Senha alterada com sucesso.
          </p>
        )}

        <button
          type="submit"
          disabled={salvando}
          className="botao-principal disabled:opacity-30"
          style={{ width: "auto", paddingInline: "1.5rem" }}
        >
          {salvando && <span className="spinner" />}
          {salvando ? "Salvando…" : "Salvar nova senha"}
        </button>
      </form>
    </div>
  );
}
