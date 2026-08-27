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
  enviarManifestacao,
  ROTULO_EVENTO_MANIFESTACAO,
  type EmpresaDetalhe,
  type CertificadoResumo,
  type DocumentoFiscal,
  type TipoEventoManifestacao,
} from "@/lib/api";
import { mascararCnpj, mascararChave, formatarData, arquivoParaBase64 } from "@/lib/format";

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
    <div className="entra-suave space-y-2 py-1" style={{ minWidth: "14rem" }}>
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
      setResultadoSync(
        resultado.documentosNovos > 0
          ? `${resultado.documentosNovos} documento(s) novo(s) recebido(s).`
          : "Nenhum documento novo — a SEFAZ não tem nada além do que já foi buscado."
      );
      const docs = await listarDocumentosFiscais(params.id, token);
      setDocumentos(docs);
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
          <button
            onClick={handleSincronizar}
            disabled={sincronizando || !certificado}
            className="botao-principal"
            style={{ width: "auto", paddingInline: "1.25rem" }}
            title={!certificado ? "Cadastre um certificado antes de sincronizar" : undefined}
          >
            {sincronizando && <span className="spinner" />}
            {sincronizando ? "Sincronizando" : "Sincronizar com a SEFAZ"}
          </button>
        </div>

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
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                  style={{ color: "var(--muted)", background: "var(--surface)" }}
                >
                  <th className="px-4 py-3 font-medium">Chave de acesso</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Direção</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Manifestação</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc, i) => (
                  <tr
                    key={doc.id}
                    className="entra-suave border-t align-top"
                    style={{ borderColor: "var(--border)", animationDelay: `${i * 40}ms` }}
                  >
                    <td className="chave-mascarada px-4 py-3 text-xs" style={{ color: "var(--paper)" }}>
                      {mascararChave(doc.chaveAcesso)}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                      {doc.tipo}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {doc.direcao === "ENTRADA" ? "Entrada" : "Saída"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {doc.status}
                    </td>
                    <td className="px-4 py-3">
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
        )}
      </section>
    </div>
  );
}
