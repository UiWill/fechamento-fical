"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  listarRegrasFiscais,
  criarRegraFiscal,
  listarEmpresas,
  type RegraFiscal,
  type EmpresaResumo,
} from "@/lib/api";

export default function RegrasFiscaisPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [organizacaoId, setOrganizacaoId] = useState<string | null>(null);
  const [regras, setRegras] = useState<RegraFiscal[]>([]);
  const [empresas, setEmpresas] = useState<EmpresaResumo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [cfopEntrada, setCfopEntrada] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [acumulador, setAcumulador] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroForm, setErroForm] = useState<string | null>(null);

  const carregar = useCallback(async (orgId: string, t: string) => {
    try {
      const [regrasData, empresasData] = await Promise.all([
        listarRegrasFiscais(orgId, t),
        listarEmpresas(orgId, t),
      ]);
      setRegras(regrasData);
      setEmpresas(empresasData);
    } catch {
      setErro("Não foi possível carregar as regras fiscais agora.");
    } finally {
      setCarregando(false);
    }
  }, []);

  function nomeEmpresa(id: string | null): string {
    if (!id) return "Toda a organização";
    return empresas.find((e) => e.id === id)?.razaoSocial ?? "Empresa removida";
  }

  useEffect(() => {
    const t = localStorage.getItem("afe_token");
    const orgId = localStorage.getItem("afe_organizacao_id");
    if (!t || !orgId) {
      router.push("/login");
      return;
    }
    setToken(t);
    setOrganizacaoId(orgId);
    void carregar(orgId, t);
  }, [router, carregar]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!organizacaoId || !token) return;
    setErroForm(null);

    if (!/^\d{4}$/.test(cfopEntrada)) {
      setErroForm("CFOP deve ter 4 dígitos.");
      return;
    }
    if (!descricao.trim()) {
      setErroForm("Descrição é obrigatória.");
      return;
    }

    setSalvando(true);
    try {
      await criarRegraFiscal(
        {
          organizacaoId,
          empresaId: empresaId || null,
          cfopEntrada,
          descricao: descricao.trim(),
          observacao: observacao.trim() || undefined,
          acumulador: acumulador.trim() || undefined,
        },
        token
      );
      setCfopEntrada("");
      setDescricao("");
      setObservacao("");
      setAcumulador("");
      setEmpresaId("");
      await carregar(organizacaoId, token);
    } catch (err) {
      setErroForm(err instanceof Error ? err.message : "Não foi possível salvar a regra.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="entra">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
          Motor de classificação
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
          Regras fiscais por CFOP
        </h1>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          Cada CFOP de entrada mapeia pra uma observação e/ou acumulador. Deixe "empresa" em
          branco pra criar a regra padrão da organização (vale pra todo CNPJ que não tiver
          uma regra própria); escolha uma empresa quando o mesmo CFOP precisar de tratamento
          diferente só pra ela — a regra da empresa sempre tem prioridade sobre a padrão.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="entra-suave grid gap-4 rounded-lg border p-5 sm:grid-cols-2"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            CFOP de entrada
          </label>
          <input
            value={cfopEntrada}
            onChange={(e) => setCfopEntrada(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="1102"
            className="campo"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Descrição
          </label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Compra para comercialização"
            className="campo"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Observação (opcional)
          </label>
          <input
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="campo"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Acumulador (opcional)
          </label>
          <input
            value={acumulador}
            onChange={(e) => setAcumulador(e.target.value)}
            className="campo"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Empresa (opcional — em branco vale pra toda a organização)
          </label>
          <select value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} className="campo">
            <option value="">Toda a organização (padrão)</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razaoSocial}
              </option>
            ))}
          </select>
        </div>

        {erroForm && (
          <p className="entra-suave text-sm sm:col-span-2" style={{ color: "var(--paper)" }}>
            {erroForm}
          </p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={salvando}
            className="botao-principal"
            style={{ width: "auto", paddingInline: "1.25rem" }}
          >
            {salvando && <span className="spinner" />}
            {salvando ? "Salvando" : "Adicionar regra"}
          </button>
        </div>
      </form>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && regras.length === 0 && (
        <div className="entra rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhuma regra cadastrada ainda.
          </p>
        </div>
      )}

      {!carregando && regras.length > 0 && (
        <div className="entra overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr
                className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)", background: "var(--surface)" }}
              >
                <th className="px-4 py-3 font-medium">CFOP</th>
                <th className="px-4 py-3 font-medium">Descrição</th>
                <th className="px-4 py-3 font-medium">Observação</th>
                <th className="px-4 py-3 font-medium">Acumulador</th>
                <th className="px-4 py-3 font-medium">Aplicação</th>
              </tr>
            </thead>
            <tbody>
              {regras.map((regra, i) => (
                <tr
                  key={regra.id}
                  className="entra-suave border-t"
                  style={{ borderColor: "var(--border)", animationDelay: `${i * 40}ms` }}
                >
                  <td className="chave-mascarada px-4 py-3" style={{ color: "var(--paper)" }}>
                    {regra.cfopEntrada}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                    {regra.descricao}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {regra.observacao ?? "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {regra.acumulador ?? "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {nomeEmpresa(regra.empresaId)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
