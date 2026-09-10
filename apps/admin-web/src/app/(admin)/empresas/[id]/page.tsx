"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  buscarEmpresa,
  buscarCertificado,
  uploadCertificado,
  listarDocumentosFiscais,
  sincronizarDocumentos,
  classificarPendentes,
  enviarManifestacao,
  gerarExportacaoTxt,
  baixarExportacaoTxt,
  ROTULO_EVENTO_MANIFESTACAO,
  type EmpresaDetalhe,
  type CertificadoResumo,
  type DocumentoFiscal,
  type TipoEventoManifestacao,
} from "@/lib/api";
import {
  mascararCnpj,
  numeroNotaDaChave,
  formatarData,
  formatarDataHora,
  formatarMoeda,
  arquivoParaBase64,
  chaveMes,
  chaveResumida,
  mesAtual,
  rotuloMes,
  limitesDoMes,
} from "@/lib/format";
import {
  exportarNotasEntradaPdf,
  exportarNotasEntradaExcel,
} from "@/lib/exportar-relatorio";

function useToken() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("afe_token");
    if (!t) {
      router.push("/login");
      return;
    }
    setToken(t);
  }, [router]);

  return token;
}

function SecaoCertificado({
  empresaId,
  token,
  certificado,
  onCadastrado,
}: {
  empresaId: string;
  token: string;
  certificado: CertificadoResumo | null;
  onCadastrado: (cert: CertificadoResumo) => void;
}) {
  const [editando, setEditando] = useState(!certificado);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [senha, setSenha] = useState("");
  const [validoAte, setValidoAte] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!arquivo) {
      setErro("Selecione o arquivo .pfx do certificado.");
      return;
    }

    setEnviando(true);
    try {
      const pfxBase64 = await arquivoParaBase64(arquivo);
      const cert = await uploadCertificado(
        {
          empresaId,
          nomeArquivoOriginal: arquivo.name,
          pfxBase64,
          senha,
          validoAte: new Date(validoAte).toISOString(),
        },
        token
      );
      onCadastrado(cert);
      setEditando(false);
      setSenha("");
      setArquivo(null);
    } catch {
      setErro("Não foi possível cadastrar o certificado. Confira o arquivo, a senha e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (!editando && certificado) {
    return (
      <div
        className="entra flex items-center justify-between rounded-lg border p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <p className="text-sm" style={{ color: "var(--paper)" }}>
            {certificado.nomeArquivoOriginal}
          </p>
          <p className="mt-1 font-mono text-xs" style={{ color: "var(--muted)" }}>
            válido até {formatarData(certificado.validoAte)}
          </p>
        </div>
        <button
          onClick={() => setEditando(true)}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          Substituir
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="entra space-y-5 rounded-lg border p-5" style={{ borderColor: "var(--border)" }}>
      <div className="space-y-1.5">
        <label
          className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
          style={{ color: "var(--muted)" }}
        >
          Arquivo .pfx
        </label>
        <input
          type="file"
          accept=".pfx,.p12"
          required
          onChange={(event) => setArquivo(event.target.files?.[0] ?? null)}
          className="campo text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label
            className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
            style={{ color: "var(--muted)" }}
          >
            Senha do certificado
          </label>
          <input
            type="password"
            required
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="campo"
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
            style={{ color: "var(--muted)" }}
          >
            Válido até
          </label>
          <input
            type="date"
            required
            value={validoAte}
            onChange={(event) => setValidoAte(event.target.value)}
            className="campo"
          />
        </div>
      </div>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={enviando} className="botao-principal" style={{ width: "auto", paddingInline: "1.5rem" }}>
          {enviando && <span className="spinner" />}
          {enviando ? "Enviando" : "Salvar certificado"}
        </button>
        {certificado && (
          <button
            type="button"
            onClick={() => setEditando(false)}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--muted)" }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

const EXIGE_JUSTIFICATIVA: TipoEventoManifestacao[] = [
  "DESCONHECIMENTO_OPERACAO",
  "OPERACAO_NAO_REALIZADA",
];

function ManifestacaoAcao({
  empresaId,
  documento,
  token,
  onAtualizado,
}: {
  empresaId: string;
  documento: DocumentoFiscal;
  token: string;
  onAtualizado: () => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [tipo, setTipo] = useState<TipoEventoManifestacao>("CIENCIA_OPERACAO");
  const [justificativa, setJustificativa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  if (documento.direcao !== "ENTRADA") {
    return <span style={{ color: "var(--muted-2)" }}>—</span>;
  }

  if (documento.status === "MANIFESTADO") {
    return <span style={{ color: "var(--muted)" }}>já manifestado</span>;
  }

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: "var(--paper)" }}
      >
        Manifestar
      </button>
    );
  }

  async function handleEnviar() {
    const precisaJustificativa = EXIGE_JUSTIFICATIVA.includes(tipo);
    if (precisaJustificativa && justificativa.trim().length < 15) {
      setErro("A justificativa precisa ter pelo menos 15 caracteres.");
      return;
    }

    setEnviando(true);
    setErro(null);
    setResultado(null);
    try {
      const evento = await enviarManifestacao(
        empresaId,
        {
          documentoFiscalId: documento.id,
          tipo,
          justificativa: precisaJustificativa ? justificativa.trim() : undefined,
        },
        token
      );
      if (evento.status === "AUTORIZADA") {
        setResultado("Manifestação autorizada pela SEFAZ.");
        onAtualizado();
      } else {
        setErro(evento.motivoSefaz ?? "A SEFAZ rejeitou a manifestação.");
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível enviar a manifestação.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      {/* position: fixed escapa do scroll/overflow da tabela — o formulário
          nunca deve alterar a largura das colunas, senão a tabela ganha um
          scroll horizontal próprio. */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.8)" }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setAberto(false);
        }}
      >
        <div
          className="entra w-full max-w-[22rem] space-y-3 rounded-lg border p-5"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--muted-2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
          }}
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
            Manifestação do destinatário
          </p>

          <select
            value={tipo}
            onChange={(event) => setTipo(event.target.value as TipoEventoManifestacao)}
            className="campo text-xs"
          >
            {Object.entries(ROTULO_EVENTO_MANIFESTACAO).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>

          {EXIGE_JUSTIFICATIVA.includes(tipo) && (
            <textarea
              value={justificativa}
              onChange={(event) => setJustificativa(event.target.value)}
              placeholder="Justificativa (mín. 15 caracteres)"
              className="campo text-xs"
              rows={2}
            />
          )}

          {resultado && (
            <p className="text-xs" style={{ color: "var(--paper)" }}>
              {resultado}
            </p>
          )}
          {erro && (
            <p className="text-xs" style={{ color: "var(--paper)" }}>
              {erro}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleEnviar}
              disabled={enviando}
              className="botao-principal"
              style={{ width: "auto", paddingInline: "1rem", paddingBlock: "0.4rem", fontSize: "0.75rem" }}
            >
              {enviando && <span className="spinner" />}
              {enviando ? "Enviando" : "Confirmar"}
            </button>
            <button
              onClick={() => setAberto(false)}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
              style={{ color: "var(--muted)" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function EmpresaDetalhePage() {
  const params = useParams<{ id: string }>();
  const token = useToken();

  const [empresa, setEmpresa] = useState<EmpresaDetalhe | null>(null);
  const [certificado, setCertificado] = useState<CertificadoResumo | null>(null);
  const [documentos, setDocumentos] = useState<DocumentoFiscal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [sincronizando, setSincronizando] = useState(false);
  const [resultadoSync, setResultadoSync] = useState<string | null>(null);
  const [erroSync, setErroSync] = useState<string | null>(null);

  const [classificando, setClassificando] = useState(false);
  const [resultadoClassificacao, setResultadoClassificacao] = useState<string | null>(null);
  const [erroClassificacao, setErroClassificacao] = useState<string | null>(null);

  const [mesFiltro, setMesFiltro] = useState(mesAtual());

  const [mesExportacaoTxt, setMesExportacaoTxt] = useState(mesAtual());
  const [gerandoTxt, setGerandoTxt] = useState(false);
  const [resultadoTxt, setResultadoTxt] = useState<string | null>(null);
  const [erroTxt, setErroTxt] = useState<string | null>(null);

  const carregarTudo = useCallback(
    async (t: string) => {
      try {
        const [empresaData, certData, docsData] = await Promise.all([
          buscarEmpresa(params.id, t),
          buscarCertificado(params.id, t),
          listarDocumentosFiscais(params.id, t),
        ]);
        setEmpresa(empresaData);
        setCertificado(certData);
        setDocumentos(docsData);
      } catch {
        setErro("Não foi possível carregar os dados dessa empresa.");
      } finally {
        setCarregando(false);
      }
    },
    [params.id]
  );

  useEffect(() => {
    if (token) void carregarTudo(token);
  }, [token, carregarTudo]);

  async function handleSincronizar() {
    if (!token) return;
    setSincronizando(true);
    setResultadoSync(null);
    setErroSync(null);
    try {
      const resultado = await sincronizarDocumentos(params.id, token);
      const base =
        resultado.documentosNovos > 0
          ? `${resultado.documentosNovos} documento(s) novo(s) recebido(s).`
          : "Nenhum documento novo — a SEFAZ não tem nada além do que já foi buscado.";
      setResultadoSync(
        resultado.bloqueadoPelaSefaz
          ? "A SEFAZ bloqueou novas consultas para esse CNPJ por consumo indevido (limite de 20/hora) — pode ter sido outro sistema (ex: do contador) consultando essa mesma empresa. Tente de novo daqui a 1 hora."
          : resultado.limiteSefazAtingido
            ? `${base} Atingiu o limite de consultas da SEFAZ por hora — ainda pode haver mais documentos; sincronize de novo daqui a pouco.`
            : base
      );
      const docs = await listarDocumentosFiscais(params.id, token);
      setDocumentos(docs);
      setEmpresa((atual) =>
        atual
          ? {
              ...atual,
              ultimaSincronizacaoEm: resultado.ultimaSincronizacaoEm,
              ultimoCStatSefaz: resultado.cStat,
              ultimoXMotivoSefaz: resultado.xMotivo,
            }
          : atual
      );
    } catch (err) {
      setErroSync(
        err instanceof Error
          ? err.message
          : "Não foi possível sincronizar com a SEFAZ agora."
      );
    } finally {
      setSincronizando(false);
    }
  }

  async function handleClassificar() {
    if (!token) return;
    setClassificando(true);
    setResultadoClassificacao(null);
    setErroClassificacao(null);
    try {
      const resultado = await classificarPendentes(params.id, token);
      const partes = [`${resultado.classificados} classificado(s)`];
      if (resultado.semRegra > 0) partes.push(`${resultado.semRegra} sem regra cadastrada`);
      if (resultado.semCfop > 0) partes.push(`${resultado.semCfop} ainda sem CFOP (SEFAZ mandou só o resumo)`);
      setResultadoClassificacao(partes.join(" · "));
      const docs = await listarDocumentosFiscais(params.id, token);
      setDocumentos(docs);
    } catch (err) {
      setErroClassificacao(
        err instanceof Error ? err.message : "Não foi possível classificar os documentos agora."
      );
    } finally {
      setClassificando(false);
    }
  }

  async function handleGerarExportacaoTxt() {
    if (!token) return;
    setGerandoTxt(true);
    setResultadoTxt(null);
    setErroTxt(null);
    try {
      const { inicio, fim } = limitesDoMes(mesExportacaoTxt);
      const resultado = await gerarExportacaoTxt(params.id, inicio, fim, token);

      if (resultado.status === "ERRO") {
        setErroTxt(resultado.erro ?? "Não foi possível gerar o TXT.");
        return;
      }

      const partes = [`${resultado.totalDocumentos} nota(s) incluída(s)`];
      if (resultado.documentosIgnorados) {
        partes.push(`${resultado.documentosIgnorados} ignorada(s) por falta de CFOP`);
      }
      setResultadoTxt(partes.join(" · "));

      if (resultado.totalDocumentos > 0) {
        await baixarExportacaoTxt(params.id, resultado.id, token);
      }
    } catch (err) {
      setErroTxt(err instanceof Error ? err.message : "Não foi possível gerar o TXT agora.");
    } finally {
      setGerandoTxt(false);
    }
  }

  const notasEntradaDoMes = documentos.filter(
    (doc) => doc.direcao === "ENTRADA" && chaveMes(doc.emitidoEm ?? doc.recebidoEm) === mesFiltro
  );

  function linhasRelatorio() {
    return [...notasEntradaDoMes]
      .sort(
        (a, b) =>
          new Date(a.emitidoEm ?? a.recebidoEm).getTime() -
          new Date(b.emitidoEm ?? b.recebidoEm).getTime()
      )
      .map((doc) => ({
        data: doc.emitidoEm ?? doc.recebidoEm,
        numero: numeroNotaDaChave(doc.chaveAcesso),
        emitente: doc.nomeEmitente ?? "—",
        valor: doc.valorTotal,
      }));
  }

  function handleExportarPdf() {
    if (!empresa) return;
    exportarNotasEntradaPdf(linhasRelatorio(), empresa.razaoSocial, empresa.cnpj, rotuloMes(mesFiltro));
  }

  function handleExportarExcel() {
    if (!empresa) return;
    exportarNotasEntradaExcel(linhasRelatorio(), empresa.razaoSocial, empresa.cnpj, rotuloMes(mesFiltro));
  }

  if (carregando) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-8 w-72" />
        <div className="skeleton h-32 w-full max-w-lg" />
      </div>
    );
  }

  if (erro || !empresa) {
    return (
      <p className="text-sm" style={{ color: "var(--paper)" }}>
        {erro ?? "Empresa não encontrada."}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <div className="entra">
        <Link
          href="/dashboard"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          ← Carteira de clientes
        </Link>
        <div className="mt-3 flex items-baseline gap-3">
          <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
            {empresa.razaoSocial}
          </h1>
          <span className={`selo ${empresa.status === "ATIVA" ? "selo--ativa" : "selo--inativa"}`}>
            {empresa.status === "ATIVA" ? "Ativa" : "Inativa"}
          </span>
        </div>
        <p className="chave-mascarada mt-1 text-sm" style={{ color: "var(--muted)" }}>
          {mascararCnpj(empresa.cnpj)} · {empresa.uf} ·{" "}
          {empresa.ambiente === "PRODUCAO" ? "Produção" : "Homologação"}
        </p>
      </div>

      <section className="space-y-3">
        <h2
          className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]"
          style={{ color: "var(--muted)" }}
        >
          Certificado digital
        </h2>
        <SecaoCertificado
          empresaId={empresa.id}
          token={token!}
          certificado={certificado}
          onCadastrado={setCertificado}
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--muted)" }}
          >
            Documentos fiscais
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleClassificar}
              disabled={classificando}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--paper)" }}
            >
              {classificando && <span className="spinner" />}
              {classificando ? "Classificando" : "Classificar pendentes"}
            </button>
            <button
              onClick={handleSincronizar}
              disabled={sincronizando || !certificado}
              className="botao-principal"
              style={{ width: "auto", paddingInline: "1.25rem" }}
              title={!certificado ? "Cadastre um certificado antes de sincronizar" : undefined}
            >
              {sincronizando && <span className="spinner" />}
              {sincronizando ? "Sincronizando (pode levar alguns minutos)…" : "Sincronizar com a SEFAZ"}
            </button>
          </div>
        </div>

        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          Última sincronização:{" "}
          {empresa.ultimaSincronizacaoEm ? formatarDataHora(empresa.ultimaSincronizacaoEm) : "nunca"}
        </p>

        {empresa.ultimoCStatSefaz === "656" && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            ⚠ Na última tentativa, a SEFAZ bloqueou consultas para esse CNPJ por consumo indevido
            (limite de 20/hora, compartilhado com qualquer outro sistema que consulte essa mesma
            empresa — ex: o software do contador). O sistema já para de tentar sozinho por 1 hora;
            se persistir, vale checar se outro sistema também está consultando essa empresa.
          </p>
        )}

        {resultadoSync && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {resultadoSync}
          </p>
        )}
        {erroSync && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erroSync}
          </p>
        )}
        {resultadoClassificacao && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {resultadoClassificacao}
          </p>
        )}
        {erroClassificacao && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erroClassificacao}
          </p>
        )}

        <div
          className="entra flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <label
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
                style={{ color: "var(--muted)" }}
              >
                Relatório de entrada · mês
              </label>
              <input
                type="month"
                value={mesFiltro}
                onChange={(event) => setMesFiltro(event.target.value)}
                className="campo text-sm"
                style={{ width: "auto" }}
              />
            </div>
            <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
              {rotuloMes(mesFiltro)} ·{" "}
              {notasEntradaDoMes.length === 0
                ? "nenhuma nota de entrada nesse mês"
                : `${notasEntradaDoMes.length} nota(s)`}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExportarPdf}
              disabled={notasEntradaDoMes.length === 0}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              style={{ color: "var(--paper)" }}
              title={notasEntradaDoMes.length === 0 ? "Não há notas de entrada nesse mês" : undefined}
            >
              Baixar PDF
            </button>
            <button
              onClick={handleExportarExcel}
              disabled={notasEntradaDoMes.length === 0}
              className="botao-principal disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ width: "auto", paddingInline: "1.25rem" }}
              title={notasEntradaDoMes.length === 0 ? "Não há notas de entrada nesse mês" : undefined}
            >
              Baixar Excel
            </button>
          </div>
        </div>

        {documentos.length === 0 ? (
          <div
            className="entra rounded-lg border border-dashed p-8 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nenhum documento fiscal recebido ainda.
            </p>
          </div>
        ) : (
          <div className="entra overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <div className="max-h-[34rem] overflow-auto">
              <table className="w-full table-fixed text-left text-sm">
                <thead className="sticky top-0 z-10">
                  <tr
                    className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                    style={{ color: "var(--muted)", background: "var(--surface)" }}
                  >
                    <th className="w-[6%] px-3 py-3 font-medium">Nº</th>
                    <th className="w-[9%] px-3 py-3 font-medium">Data</th>
                    <th className="w-[22%] px-3 py-3 font-medium">Empresa (emitente)</th>
                    <th className="w-[13%] px-3 py-3 font-medium">Chave de acesso</th>
                    <th className="w-[10%] px-3 py-3 font-medium">Status</th>
                    <th className="w-[10%] px-3 py-3 font-medium">Valor</th>
                    <th className="w-[15%] px-3 py-3 font-medium">Classificação</th>
                    <th className="w-[15%] px-3 py-3 font-medium">Manifestação</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((doc, i) => (
                    <tr
                      key={doc.id}
                      className="entra-suave border-t align-top"
                      style={{ borderColor: "var(--border)", animationDelay: `${Math.min(i, 20) * 40}ms` }}
                    >
                      <td className="truncate overflow-hidden px-3 py-3 font-mono text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {numeroNotaDaChave(doc.chaveAcesso)}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {formatarData(doc.emitidoEm ?? doc.recebidoEm)}
                      </td>
                      <td
                        className="truncate overflow-hidden px-3 py-3 whitespace-nowrap"
                        style={{ color: "var(--paper)" }}
                        title={doc.nomeEmitente ?? undefined}
                      >
                        {doc.nomeEmitente ?? "—"}
                      </td>
                      <td
                        className="chave-mascarada truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap"
                        style={{ color: "var(--muted)" }}
                        title={doc.chaveAcesso}
                      >
                        {chaveResumida(doc.chaveAcesso)}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {doc.status}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 whitespace-nowrap" style={{ color: "var(--paper)" }}>
                        {formatarMoeda(doc.valorTotal)}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {doc.classificadoEm ? (
                          <span style={{ color: "var(--paper)" }}>
                            {doc.observacao ?? doc.acumulador ?? doc.cfop}
                          </span>
                        ) : doc.cfop ? (
                          "pendente"
                        ) : (
                          "sem CFOP"
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <ManifestacaoAcao
                          empresaId={empresa.id}
                          documento={doc}
                          token={token!}
                          onAtualizado={() => void carregarTudo(token!)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2
          className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]"
          style={{ color: "var(--muted)" }}
        >
          Exportação para o Domínio Sistemas
        </h2>

        <div
          className="entra flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <label
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Notas de entrada · mês
            </label>
            <input
              type="month"
              value={mesExportacaoTxt}
              onChange={(event) => setMesExportacaoTxt(event.target.value)}
              className="campo text-sm"
              style={{ width: "auto" }}
            />
          </div>

          <button
            onClick={handleGerarExportacaoTxt}
            disabled={gerandoTxt}
            className="botao-principal"
            style={{ width: "auto", paddingInline: "1.25rem" }}
          >
            {gerandoTxt && <span className="spinner" />}
            {gerandoTxt ? "Gerando…" : "Gerar TXT"}
          </button>
        </div>

        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Gera o TXT de notas de entrada do mês pra importar no Domínio
          Sistemas (só entrada por enquanto — saída ainda não é capturada
          pelo sistema).
        </p>

        {resultadoTxt && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {resultadoTxt}
          </p>
        )}
        {erroTxt && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erroTxt}
          </p>
        )}
      </section>
    </div>
  );
}
