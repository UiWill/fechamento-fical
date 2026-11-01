"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  listarRegrasFiscais,
  criarRegraFiscal,
  listarEmpresas,
  type RegraFiscal,
  type EmpresaResumo,
  type CondicaoPagamento,
} from "@/lib/api";
import { SeletorAcumulador } from "@/components/SeletorAcumulador";

export default function RegrasFiscaisPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [organizacaoId, setOrganizacaoId] = useState<string | null>(null);
  const [regras, setRegras] = useState<RegraFiscal[]>([]);
  const [empresas, setEmpresas] = useState<EmpresaResumo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [cfopEntrada, setCfopEntrada] = useState("");
  const [cfopSaidaEsperado, setCfopSaidaEsperado] = useState("");
  const [condicaoPagamento, setCondicaoPagamento] = useState<CondicaoPagamento | "">("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [acumulador, setAcumulador] = useState("");
  const [aplicacao, setAplicacao] = useState<"TODAS" | "UMA" | "SELECIONADAS">("TODAS");
  const [empresaId, setEmpresaId] = useState("");
  const [empresaIdsSelecionadas, setEmpresaIdsSelecionadas] = useState<string[]>([]);
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

  function aplicacaoDaRegra(regra: RegraFiscal): string {
    if (regra.empresaId) {
      return empresas.find((e) => e.id === regra.empresaId)?.razaoSocial ?? "Empresa removida";
    }
    if (regra.empresaIds.length > 0) {
      const nomes = regra.empresaIds.map((id) => empresas.find((e) => e.id === id)?.razaoSocial ?? "Empresa removida");
      return `${regra.empresaIds.length} empresas selecionadas: ${nomes.join(", ")}`;
    }
    return "Toda a organização";
  }

  function alternarEmpresaSelecionada(id: string) {
    setEmpresaIdsSelecionadas((atual) => (atual.includes(id) ? atual.filter((e) => e !== id) : [...atual, id]));
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
      setErroForm("CFOP de entrada deve ter 4 dígitos.");
      return;
    }
    if (cfopSaidaEsperado && !/^\d{4}$/.test(cfopSaidaEsperado)) {
      setErroForm("CFOP de saída esperado deve ter 4 dígitos.");
      return;
    }
    if (!descricao.trim()) {
      setErroForm("Descrição é obrigatória.");
      return;
    }
    if (aplicacao === "SELECIONADAS" && empresaIdsSelecionadas.length === 0) {
      setErroForm("Selecione ao menos uma empresa.");
      return;
    }

    setSalvando(true);
    try {
      await criarRegraFiscal(
        {
          organizacaoId,
          empresaId: aplicacao === "UMA" ? empresaId : null,
          empresaIds: aplicacao === "SELECIONADAS" ? empresaIdsSelecionadas : undefined,
          cfopEntrada,
          cfopSaidaEsperado: cfopSaidaEsperado || undefined,
          condicaoPagamento: condicaoPagamento || undefined,
          descricao: descricao.trim(),
          observacao: observacao.trim() || undefined,
          acumulador: acumulador.trim() || undefined,
        },
        token
      );
      setCfopEntrada("");
      setCfopSaidaEsperado("");
      setCondicaoPagamento("");
      setDescricao("");
      setObservacao("");
      setAcumulador("");
      setAplicacao("TODAS");
      setEmpresaId("");
      setEmpresaIdsSelecionadas([]);
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
          Cada CFOP (de um documento de entrada ou de saída) mapeia pra uma observação e/ou
          acumulador. Escolha "Toda a organização" pra criar a regra padrão (vale pra todo CNPJ
          que não tiver uma regra própria), "Uma empresa" quando o mesmo CFOP precisar de
          tratamento diferente só pra ela, ou "Empresas selecionadas" quando um grupo de
          empresas (não todas) precisa do mesmo tratamento — prioridade: empresa específica &gt;
          grupo selecionado &gt; padrão da organização. O "CFOP de saída esperado" é opcional e
          alimenta a checagem de divergência nas telas de Apuração do ICMS e Apuração do
          IBS/CBS (destaca quando o CFOP real de um item não é um dos esperados por nenhuma
          regra ativa).
        </p>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          A "Condição de pagamento" é opcional e serve pro mesmo CFOP precisar de acumuladores
          diferentes dependendo se a venda/compra foi à vista ou a prazo (é assim que o Domínio
          classifica alguns casos) — deixe em "Qualquer" quando o CFOP sempre usa o mesmo
          acumulador independente disso; uma regra com condição específica tem prioridade sobre
          uma regra "Qualquer" pro mesmo CFOP.
        </p>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          O campo "Acumulador" busca no catálogo oficial do Domínio (código + nome) em vez de
          digitar livre — evita salvar o mesmo acumulador escrito de dois jeitos diferentes em
          regras distintas.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="entra-suave grid gap-4 rounded-lg border p-5 sm:grid-cols-2"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            CFOP (de entrada ou de saída)
          </label>
          <input
            value={cfopEntrada}
            onChange={(e) => setCfopEntrada(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="1102 ou 5102"
            className="campo"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            CFOP de saída esperado (opcional)
          </label>
          <input
            value={cfopSaidaEsperado}
            onChange={(e) => setCfopSaidaEsperado(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="5102"
            className="campo"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Condição de pagamento (opcional)
          </label>
          <select
            value={condicaoPagamento}
            onChange={(e) => setCondicaoPagamento(e.target.value as CondicaoPagamento | "")}
            className="campo"
          >
            <option value="">Qualquer (padrão)</option>
            <option value="AVISTA">À vista</option>
            <option value="APRAZO">A prazo</option>
          </select>
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
          <SeletorAcumulador value={acumulador} onChange={setAcumulador} />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
            Aplicação
          </label>
          <div className="flex overflow-hidden rounded-md border" style={{ borderColor: "var(--border)", width: "fit-content" }}>
            {(
              [
                ["TODAS", "Toda a organização"],
                ["UMA", "Uma empresa"],
                ["SELECIONADAS", "Empresas selecionadas"],
              ] as const
            ).map(([valor, rotulo]) => (
              <button
                key={valor}
                type="button"
                onClick={() => setAplicacao(valor)}
                className="px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors"
                style={{
                  background: aplicacao === valor ? "var(--paper)" : "transparent",
                  color: aplicacao === valor ? "var(--void, #0a0a0a)" : "var(--muted)",
                }}
              >
                {rotulo}
              </button>
            ))}
          </div>

          {aplicacao === "UMA" && (
            <select value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} className="campo mt-2">
              <option value="">Selecione a empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.razaoSocial}
                </option>
              ))}
            </select>
          )}

          {aplicacao === "SELECIONADAS" && (
            <div
              className="mt-2 max-h-40 space-y-1 overflow-auto rounded-md border p-2"
              style={{ borderColor: "var(--border)" }}
            >
              {empresas.length === 0 && (
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Nenhuma empresa cadastrada ainda.
                </p>
              )}
              {empresas.map((empresa) => (
                <label key={empresa.id} className="flex items-center gap-2 text-sm" style={{ color: "var(--paper)" }}>
                  <input
                    type="checkbox"
                    checked={empresaIdsSelecionadas.includes(empresa.id)}
                    onChange={() => alternarEmpresaSelecionada(empresa.id)}
                  />
                  {empresa.razaoSocial}
                </label>
              ))}
            </div>
          )}
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
                <th className="px-4 py-3 font-medium">CFOP saída esperado</th>
                <th className="px-4 py-3 font-medium">Condição</th>
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
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {regra.cfopSaidaEsperado ?? "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {regra.condicaoPagamento === "AVISTA"
                      ? "À vista"
                      : regra.condicaoPagamento === "APRAZO"
                        ? "A prazo"
                        : "Qualquer"}
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
                    {aplicacaoDaRegra(regra)}
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
