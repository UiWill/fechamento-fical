"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validarDigitosCnpj } from "@afe/shared";
import { criarEmpresa, consultarCnpj, CnpjNaoEncontradoError } from "@/lib/api";
import { UFS } from "@/lib/uf";
import { mascararCnpjParcial } from "@/lib/format";

export default function NovaEmpresaPage() {
  const router = useRouter();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [uf, setUf] = useState("MG");
  const [ambiente, setAmbiente] = useState<"HOMOLOGACAO" | "PRODUCAO">("HOMOLOGACAO");
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const [consultando, setConsultando] = useState(false);
  const [statusConsulta, setStatusConsulta] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("afe_token")) {
      router.push("/login");
    }
  }, [router]);

  async function handleCnpjBlur() {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) return;

    if (!validarDigitosCnpj(cnpjLimpo)) {
      setStatusConsulta("CNPJ inválido — confira os dígitos.");
      return;
    }

    const token = localStorage.getItem("afe_token");
    if (!token) return;

    setConsultando(true);
    setStatusConsulta("Buscando dados na Receita Federal…");
    try {
      const dados = await consultarCnpj(cnpjLimpo, token);
      setRazaoSocial(dados.razaoSocial);
      setUf(dados.uf);
      setStatusConsulta(
        `Encontrado: ${dados.razaoSocial}${
          dados.situacaoCadastral ? ` (${dados.situacaoCadastral})` : ""
        }. Confira antes de salvar.`
      );
    } catch (err) {
      setStatusConsulta(
        err instanceof CnpjNaoEncontradoError
          ? "CNPJ não encontrado na Receita Federal — preencha os dados manualmente."
          : "Não foi possível buscar os dados agora — preencha manualmente."
      );
    } finally {
      setConsultando(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (!validarDigitosCnpj(cnpjLimpo)) {
      setErro("CNPJ inválido — confira os dígitos digitados.");
      return;
    }

    const token = localStorage.getItem("afe_token");
    const organizacaoId = localStorage.getItem("afe_organizacao_id");
    if (!token || !organizacaoId) {
      router.push("/login");
      return;
    }

    const estado = UFS.find((item) => item.sigla === uf);
    if (!estado) {
      setErro("Selecione um estado válido.");
      return;
    }

    setSalvando(true);
    try {
      await criarEmpresa(
        {
          organizacaoId,
          cnpj: cnpjLimpo,
          razaoSocial,
          uf: estado.sigla,
          codigoUf: estado.codigoIbge,
          ambiente,
        },
        token
      );
      router.push("/dashboard");
    } catch {
      setErro("Não foi possível cadastrar esse CNPJ. Confira os dados e tente de novo.");
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="entra">
        <Link
          href="/dashboard"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          ← Carteira de clientes
        </Link>
        <h1 className="mt-3 font-display text-2xl" style={{ color: "var(--paper)" }}>
          Nova empresa
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="entra max-w-lg space-y-7"
        style={{ animationDelay: "70ms" }}
      >
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
            value={cnpj}
            onChange={(event) => setCnpj(mascararCnpjParcial(event.target.value))}
            onBlur={handleCnpjBlur}
            className="campo chave-mascarada"
            placeholder="00.000.000/0000-00"
          />
          {statusConsulta && (
            <p
              className="entra-suave flex items-center gap-2 text-xs"
              style={{ color: "var(--muted)" }}
            >
              {consultando && <span className="spinner" />}
              {statusConsulta}
            </p>
          )}
        </div>

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
            placeholder="Preenchido automaticamente após o CNPJ, se encontrado"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="uf"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Estado
            </label>
            <select
              id="uf"
              value={uf}
              onChange={(event) => setUf(event.target.value)}
              className="campo"
            >
              {UFS.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.sigla} — {estado.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="ambiente"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Ambiente SEFAZ
            </label>
            <select
              id="ambiente"
              value={ambiente}
              onChange={(event) => setAmbiente(event.target.value as "HOMOLOGACAO" | "PRODUCAO")}
              className="campo"
            >
              <option value="HOMOLOGACAO">Homologação</option>
              <option value="PRODUCAO">Produção</option>
            </select>
          </div>
        </div>

        {erro && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erro}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={salvando} className="botao-principal">
            {salvando && <span className="spinner" />}
            {salvando ? "Cadastrando" : "Cadastrar empresa"}
          </button>
        </div>
      </form>
    </div>
  );
}
