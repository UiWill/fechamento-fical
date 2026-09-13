"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  listarEmpresas,
  listarAgentes,
  gerarTokenAgente,
  revogarTokenAgente,
  type EmpresaResumo,
  type AgenteInstalacao,
} from "@/lib/api";
import { mascararCnpj, formatarDataHora } from "@/lib/format";

const MINUTOS_PARA_CONSIDERAR_ATRASADO = 30;

function estaAtrasado(agente: AgenteInstalacao): boolean {
  if (!agente.ultimoHeartbeatEm) return true;
  const minutosDesdeUltimoSinal = (Date.now() - new Date(agente.ultimoHeartbeatEm).getTime()) / 60_000;
  return minutosDesdeUltimoSinal > MINUTOS_PARA_CONSIDERAR_ATRASADO;
}

function ModalNovoToken({
  empresas,
  organizacaoId,
  token,
  onFechar,
  onCriado,
}: {
  empresas: EmpresaResumo[];
  organizacaoId: string;
  token: string;
  onFechar: () => void;
  onCriado: () => void;
}) {
  const [nome, setNome] = useState("");
  const [escopo, setEscopo] = useState<"organizacao" | "empresa">("organizacao");
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id ?? "");
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [tokenGerado, setTokenGerado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function handleGerar(event: React.FormEvent) {
    event.preventDefault();
    if (!nome.trim()) {
      setErro("Dê um nome pra identificar essa instalação (ex: PC do escritório).");
      return;
    }
    setGerando(true);
    setErro(null);
    try {
      const resultado = await gerarTokenAgente(
        {
          nome: nome.trim(),
          organizacaoId: escopo === "organizacao" ? organizacaoId : undefined,
          empresaId: escopo === "empresa" ? empresaId : undefined,
        },
        token
      );
      setTokenGerado(resultado.tokenRaw);
      onCriado();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível gerar o token agora.");
    } finally {
      setGerando(false);
    }
  }

  function handleCopiar() {
    if (!tokenGerado) return;
    navigator.clipboard.writeText(tokenGerado).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !gerando) onFechar();
      }}
    >
      <div
        className="entra w-full max-w-[26rem] space-y-4 rounded-lg border p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        {tokenGerado ? (
          <>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
              Token gerado
            </p>
            <p className="text-sm" style={{ color: "var(--paper)" }}>
              Copie e cole esse código na configuração do agente desktop agora
              — <strong>ele não será mostrado de novo.</strong>
            </p>
            <div
              className="chave-mascarada break-all rounded-md border p-3 font-mono text-xs"
              style={{ borderColor: "var(--border)", color: "var(--paper)" }}
            >
              {tokenGerado}
            </div>
            <div className="flex gap-3">
              <button onClick={handleCopiar} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={onFechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)" }}
              >
                Fechar
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleGerar} className="space-y-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
              Gerar token de instalação
            </p>

            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                Nome (pra identificar depois)
              </label>
              <input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Ex: PC do escritório"
                className="campo text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                Escopo
              </label>
              <select value={escopo} onChange={(event) => setEscopo(event.target.value as "organizacao" | "empresa")} className="campo text-sm">
                <option value="organizacao">Toda a carteira (contador — todos os CNPJs)</option>
                <option value="empresa">Um CNPJ específico</option>
              </select>
            </div>

            {escopo === "empresa" && (
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Empresa
                </label>
                <select value={empresaId} onChange={(event) => setEmpresaId(event.target.value)} className="campo text-sm">
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.razaoSocial} — {mascararCnpj(empresa.cnpj)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {erro && (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                {erro}
              </p>
            )}

            <div className="flex gap-3">
              <button type="submit" disabled={gerando} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {gerando && <span className="spinner" />}
                {gerando ? "Gerando" : "Gerar token"}
              </button>
              <button
                type="button"
                onClick={onFechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AgentesPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [organizacaoId, setOrganizacaoId] = useState<string | null>(null);
  const [empresas, setEmpresas] = useState<EmpresaResumo[]>([]);
  const [agentes, setAgentes] = useState<AgenteInstalacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const carregar = useCallback(async (t: string, orgId: string) => {
    try {
      const [empresasData, agentesData] = await Promise.all([listarEmpresas(orgId, t), listarAgentes(orgId, t)]);
      setEmpresas(empresasData);
      setAgentes(agentesData);
    } catch {
      setErro("Não foi possível carregar os agentes agora.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("afe_token");
    const orgId = localStorage.getItem("afe_organizacao_id");
    if (!t || !orgId) {
      router.push("/login");
      return;
    }
    setToken(t);
    setOrganizacaoId(orgId);
    void carregar(t, orgId);
  }, [router, carregar]);

  async function handleRevogar(id: string) {
    if (!token) return;
    await revogarTokenAgente(id, token);
    if (organizacaoId) void carregar(token, organizacaoId);
  }

  function escopoDoAgente(agente: AgenteInstalacao): string {
    if (agente.organizacaoId) return "Toda a carteira";
    const empresa = empresas.find((e) => e.id === agente.empresaId);
    return empresa ? `${empresa.razaoSocial} — ${mascararCnpj(empresa.cnpj)}` : "CNPJ específico";
  }

  return (
    <div className="space-y-6">
      <div className="entra flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
            Captura de saída
          </p>
          <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
            Agentes desktop
          </h1>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
          style={{ color: "var(--paper)" }}
        >
          + Gerar token
        </button>
      </div>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && agentes.length === 0 && (
        <div className="entra rounded-lg border border-dashed p-10 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Nenhum agente instalado ainda
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            Gere um token e cole na configuração do agente desktop no PC do
            contador ou da empresa pra começar a capturar notas de saída.
          </p>
        </div>
      )}

      {(carregando || agentes.length > 0) && !erro && (
        <div className="entra overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Escopo</th>
                <th className="px-4 py-3 font-medium">Versão</th>
                <th className="px-4 py-3 font-medium">Último sinal</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {agentes.map((agente) => (
                <tr key={agente.id} className="entra-suave border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                    {agente.nome}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {escopoDoAgente(agente)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {agente.ultimaVersaoAgente ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {agente.ultimoHeartbeatEm ? formatarDataHora(agente.ultimoHeartbeatEm) : "nunca"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`selo ${
                        agente.status === "REVOGADO" ? "selo--inativa" : estaAtrasado(agente) ? "selo--inativa" : "selo--ativa"
                      }`}
                    >
                      {agente.status === "REVOGADO" ? "Revogado" : estaAtrasado(agente) ? "Atrasado" : "Ativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {agente.status === "ATIVO" && (
                      <button
                        onClick={() => void handleRevogar(agente.id)}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                        style={{ color: "var(--muted)" }}
                      >
                        Revogar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAberto && token && organizacaoId && (
        <ModalNovoToken
          empresas={empresas}
          organizacaoId={organizacaoId}
          token={token}
          onFechar={() => setModalAberto(false)}
          onCriado={() => void carregar(token, organizacaoId)}
        />
      )}
    </div>
  );
}
