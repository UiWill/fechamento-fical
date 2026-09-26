"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  buscarEmpresa,
  buscarCertificado,
  uploadCertificado,
  alterarAmbienteEmpresa,
  listarDocumentosFiscais,
  sincronizarDocumentos,
  classificarPendentes,
  gerarExportacaoTxt,
  baixarExportacaoTxt,
  baixarXmlsZip,
  zerarNsu,
  type EmpresaDetalhe,
  type CertificadoResumo,
  type DocumentoFiscal,
} from "@/lib/api";
import {
  mascararCnpj,
  numeroNotaDaChave,
  numeroNotaOrdenavel,
  formatarData,
  formatarDataHora,
  formatarMoeda,
  arquivoParaBase64,
  chaveMes,
  chaveResumida,
  mesAtual,
  rotuloMes,
  limitesDoMes,
  diasAte,
} from "@/lib/format";
import { ModalManifestacao } from "@/components/ModalManifestacao";
import { SecaoCteDistribuicao } from "@/components/SecaoCteDistribuicao";
import {
  exportarNotasEntradaPdf,
  exportarNotasEntradaExcel,
  exportarNotasSaidaPdf,
  exportarNotasSaidaExcel,
} from "@/lib/exportar-relatorio";

const ROTULO_TIPO_DOCUMENTO: Record<DocumentoFiscal["tipo"], string> = {
  NFE: "NF-e",
  NFCE: "NFC-e",
  CTE: "CT-e",
};

type CampoOrdenacao = "data" | "numero" | "tipo";

interface Ordenacao {
  campo: CampoOrdenacao;
  direcao: "asc" | "desc";
}

const ORDENACAO_PADRAO: Ordenacao = { campo: "data", direcao: "desc" };

/**
 * Ordena sempre pelos 3 critérios (data, número, tipo) — o campo escolhido
 * manda primeiro, na direção escolhida, e os outros dois desempatam em
 * ordem crescente. Assim a lista fica sempre 100% previsível (nunca "meio
 * ordenada"), e o padrão (data, mais recente no topo) já sai organizado
 * por data → número → tipo sem precisar de nenhuma escolha do usuário.
 */
function compararDocumentos(a: DocumentoFiscal, b: DocumentoFiscal, ordenacao: Ordenacao): number {
  const chaveDe = (doc: DocumentoFiscal) => ({
    data: new Date(doc.emitidoEm ?? doc.recebidoEm).getTime(),
    numero: numeroNotaOrdenavel(doc.chaveAcesso),
    tipo: ROTULO_TIPO_DOCUMENTO[doc.tipo],
  });
  const chaveA = chaveDe(a);
  const chaveB = chaveDe(b);
  const ordemCampos: CampoOrdenacao[] =
    ordenacao.campo === "data"
      ? ["data", "numero", "tipo"]
      : ordenacao.campo === "numero"
        ? ["numero", "data", "tipo"]
        : ["tipo", "data", "numero"];

  for (const campo of ordemCampos) {
    const valorA = chaveA[campo];
    const valorB = chaveB[campo];
    const diferenca =
      typeof valorA === "string" ? valorA.localeCompare(valorB as string) : valorA - (valorB as number);
    if (diferenca !== 0) {
      return campo === ordenacao.campo ? diferenca * (ordenacao.direcao === "asc" ? 1 : -1) : diferenca;
    }
  }
  return 0;
}

function ordenarDocumentos(docs: DocumentoFiscal[], ordenacao: Ordenacao): DocumentoFiscal[] {
  return [...docs].sort((a, b) => compararDocumentos(a, b, ordenacao));
}

function ControleOrdenacaoEFiltro({
  ordenacao,
  onMudarOrdenacao,
  filtroTipo,
  onMudarFiltroTipo,
}: {
  ordenacao: Ordenacao;
  onMudarOrdenacao: (o: Ordenacao) => void;
  filtroTipo: DocumentoFiscal["tipo"] | "TODOS";
  onMudarFiltroTipo: (t: DocumentoFiscal["tipo"] | "TODOS") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
        style={{ color: "var(--muted)" }}
      >
        Ordenar por
      </label>
      <select
        value={ordenacao.campo}
        onChange={(event) =>
          onMudarOrdenacao({ campo: event.target.value as CampoOrdenacao, direcao: ordenacao.direcao })
        }
        className="campo text-sm"
        style={{ width: "auto" }}
      >
        <option value="data">Data de emissão</option>
        <option value="numero">Número</option>
        <option value="tipo">Tipo</option>
      </select>
      <button
        type="button"
        onClick={() => onMudarOrdenacao({ campo: ordenacao.campo, direcao: ordenacao.direcao === "asc" ? "desc" : "asc" })}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: "var(--paper)" }}
        title="Inverter direção da ordenação"
      >
        {ordenacao.direcao === "desc" ? "↓ decrescente" : "↑ crescente"}
      </button>

      <label
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
        style={{ color: "var(--muted)" }}
      >
        Tipo
      </label>
      <select
        value={filtroTipo}
        onChange={(event) => onMudarFiltroTipo(event.target.value as DocumentoFiscal["tipo"] | "TODOS")}
        className="campo text-sm"
        style={{ width: "auto" }}
      >
        <option value="TODOS">Todos</option>
        <option value="NFE">NF-e</option>
        <option value="NFCE">NFC-e</option>
        <option value="CTE">CT-e</option>
      </select>
    </div>
  );
}

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
        },
        token
      );
      onCadastrado(cert);
      setEditando(false);
      setSenha("");
      setArquivo(null);
    } catch (err) {
      setErro(
        err instanceof Error
          ? err.message
          : "Não foi possível cadastrar o certificado. Confira o arquivo, a senha e tente de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (!editando && certificado) {
    const dias = diasAte(certificado.validoAte);
    const atencao = dias <= 30;
    const rotuloDias =
      dias < 0
        ? `venceu há ${Math.abs(dias)} dia${Math.abs(dias) === 1 ? "" : "s"}`
        : dias === 0
          ? "vence hoje"
          : dias === 1
            ? "vence amanhã"
            : `vence em ${dias} dias`;

    return (
      <div
        className="entra flex items-center justify-between rounded-lg border p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <p className="text-sm" style={{ color: "var(--paper)" }}>
            {certificado.nomeArquivoOriginal}
          </p>
          <p className="mt-1 flex items-center gap-2 font-mono text-xs" style={{ color: "var(--muted)" }}>
            <span>válido até {formatarData(certificado.validoAte)}</span>
            <span
              style={{ color: atencao ? "var(--paper)" : "var(--muted)", fontWeight: atencao ? 600 : 400 }}
              className="flex items-center gap-1.5"
            >
              {atencao && <span className="pulso-atencao h-1.5 w-1.5 rounded-full" style={{ background: "var(--paper)" }} />}
              ({rotuloDias})
            </span>
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
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          A validade é lida direto do certificado — não precisa digitar.
        </p>
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

  // Manifestação do destinatário só existe pra NF-e (modelo 55) de entrada.
  if (documento.direcao !== "ENTRADA" || documento.tipo !== "NFE") {
    return <span style={{ color: "var(--muted-2)" }}>—</span>;
  }

  if (documento.status === "MANIFESTADO") {
    return <span style={{ color: "var(--muted)" }}>já manifestado</span>;
  }

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: "var(--paper)" }}
      >
        Manifestar
      </button>
      {aberto && (
        <ModalManifestacao
          empresaId={empresaId}
          token={token}
          alvos={[documento]}
          onFechar={() => setAberto(false)}
          onConcluido={onAtualizado}
        />
      )}
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
  const [mesFiltroSaida, setMesFiltroSaida] = useState(mesAtual());

  const [baixandoXmlEntrada, setBaixandoXmlEntrada] = useState(false);
  const [erroXmlEntrada, setErroXmlEntrada] = useState<string | null>(null);
  const [baixandoXmlSaida, setBaixandoXmlSaida] = useState(false);
  const [erroXmlSaida, setErroXmlSaida] = useState<string | null>(null);
  const [zerandoNsu, setZerandoNsu] = useState(false);
  const [resultadoNsu, setResultadoNsu] = useState<string | null>(null);
  const [abaDocumentos, setAbaDocumentos] = useState<"entrada" | "saida" | "cte" | "certificado">("entrada");
  const [transicaoAba, setTransicaoAba] = useState(false);
  const timerTransicao = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Troca de aba com uma transição curta (barra de progresso + esqueleto) em vez de a tela ficar parada.
  function mudarAba(nova: "entrada" | "saida" | "cte" | "certificado") {
    if (nova === abaDocumentos) return;
    if (timerTransicao.current) clearTimeout(timerTransicao.current);
    setAbaDocumentos(nova);
    setTransicaoAba(true);
    timerTransicao.current = setTimeout(() => setTransicaoAba(false), 380);
  }

  const [alterandoAmbiente, setAlterandoAmbiente] = useState(false);
  const [manifestarTodasAberto, setManifestarTodasAberto] = useState(false);

  const [ordenacaoEntrada, setOrdenacaoEntrada] = useState<Ordenacao>(ORDENACAO_PADRAO);
  const [filtroTipoEntrada, setFiltroTipoEntrada] = useState<DocumentoFiscal["tipo"] | "TODOS">("TODOS");
  const [ordenacaoSaida, setOrdenacaoSaida] = useState<Ordenacao>(ORDENACAO_PADRAO);
  const [filtroTipoSaida, setFiltroTipoSaida] = useState<DocumentoFiscal["tipo"] | "TODOS">("TODOS");

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

  async function handleAlterarAmbiente() {
    if (!token || !empresa) return;
    const novoAmbiente = empresa.ambiente === "PRODUCAO" ? "HOMOLOGACAO" : "PRODUCAO";
    const rotulo = novoAmbiente === "PRODUCAO" ? "Produção" : "Homologação";
    if (
      !window.confirm(
        `Trocar essa empresa para ${rotulo}? Isso muda pra sempre qual ambiente da SEFAZ é consultado (produção = notas reais, homologação = ambiente de teste, sem relação nenhuma com as notas reais).`
      )
    ) {
      return;
    }
    setAlterandoAmbiente(true);
    try {
      const atualizada = await alterarAmbienteEmpresa(params.id, novoAmbiente, token);
      setEmpresa(atualizada);
    } catch {
      window.alert("Não foi possível trocar o ambiente agora.");
    } finally {
      setAlterandoAmbiente(false);
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
      if (resultado.documentosSemAcumulador) {
        partes.push(
          `${resultado.documentosSemAcumulador} sem acumulador (classifique as notas em "Classificar pendentes" — precisa haver uma regra fiscal cadastrada pro CFOP)`
        );
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

  const documentosEntrada = documentos.filter((doc) => doc.direcao === "ENTRADA");
  const documentosSaida = documentos.filter((doc) => doc.direcao === "SAIDA");
  const diasVencimentoCertificado = certificado ? diasAte(certificado.validoAte) : null;
  const certificadoAtencao = diasVencimentoCertificado !== null && diasVencimentoCertificado <= 30;

  const notasEntradaDoMes = documentosEntrada.filter(
    (doc) =>
      chaveMes(doc.emitidoEm ?? doc.recebidoEm) === mesFiltro &&
      (filtroTipoEntrada === "TODOS" || doc.tipo === filtroTipoEntrada)
  );
  const notasSaidaDoMes = documentosSaida.filter(
    (doc) =>
      chaveMes(doc.emitidoEm ?? doc.recebidoEm) === mesFiltroSaida &&
      (filtroTipoSaida === "TODOS" || doc.tipo === filtroTipoSaida)
  );

  // Só NF-e de entrada do mês/filtro atual ainda sem manifestação.
  const pendentesManifestacao = notasEntradaDoMes.filter(
    (doc) => doc.tipo === "NFE" && doc.status !== "MANIFESTADO"
  );

  // A lista de baixo mostra só o mês escolhido no seletor (o mesmo dos relatórios).
  const notasEntradaOrdenadas = ordenarDocumentos(notasEntradaDoMes, ordenacaoEntrada);
  const notasSaidaOrdenadas = ordenarDocumentos(notasSaidaDoMes, ordenacaoSaida);

  function linhasRelatorio() {
    return ordenarDocumentos(notasEntradaDoMes, ordenacaoEntrada).map((doc) => ({
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

  function linhasRelatorioSaida() {
    return ordenarDocumentos(notasSaidaDoMes, ordenacaoSaida).map((doc) => ({
      data: doc.emitidoEm ?? doc.recebidoEm,
      numero: numeroNotaDaChave(doc.chaveAcesso),
      tipo: ROTULO_TIPO_DOCUMENTO[doc.tipo],
      cfop: doc.cfop,
      valor: doc.valorTotal,
      enviadoPor: doc.agenteInstalacaoToken?.nome ?? "—",
    }));
  }

  function handleExportarSaidaPdf() {
    if (!empresa) return;
    exportarNotasSaidaPdf(linhasRelatorioSaida(), empresa.razaoSocial, empresa.cnpj, rotuloMes(mesFiltroSaida));
  }

  function handleExportarSaidaExcel() {
    if (!empresa) return;
    exportarNotasSaidaExcel(linhasRelatorioSaida(), empresa.razaoSocial, empresa.cnpj, rotuloMes(mesFiltroSaida));
  }

  async function handleBaixarXmlEntrada() {
    if (!token) return;
    setBaixandoXmlEntrada(true);
    try {
      const { inicio, fim } = limitesDoMes(mesFiltro);
      await baixarXmlsZip(
        params.id,
        "ENTRADA",
        inicio,
        fim,
        token,
        filtroTipoEntrada === "TODOS" ? undefined : filtroTipoEntrada
      );
    } catch {
      setErroXmlEntrada("Não foi possível baixar os XMLs agora.");
    } finally {
      setBaixandoXmlEntrada(false);
    }
  }

  async function handleBaixarXmlSaida() {
    if (!token) return;
    setBaixandoXmlSaida(true);
    try {
      const { inicio, fim } = limitesDoMes(mesFiltroSaida);
      await baixarXmlsZip(
        params.id,
        "SAIDA",
        inicio,
        fim,
        token,
        filtroTipoSaida === "TODOS" ? undefined : filtroTipoSaida
      );
    } catch {
      setErroXmlSaida("Não foi possível baixar os XMLs agora.");
    } finally {
      setBaixandoXmlSaida(false);
    }
  }

  async function handleZerarNsu() {
    if (!token) return;
    if (
      !window.confirm(
        "Zerar o NSU dessa empresa? Isso faz a próxima sincronização buscar todo o histórico de novo na SEFAZ, desde o início — use só se os dados de entrada foram perdidos (ex: reconstrução do servidor)."
      )
    ) {
      return;
    }
    setZerandoNsu(true);
    setResultadoNsu(null);
    try {
      await zerarNsu(params.id, token);
      setResultadoNsu("NSU zerado — a próxima sincronização vai buscar o histórico desde o início.");
    } catch {
      setResultadoNsu("Não foi possível zerar o NSU agora.");
    } finally {
      setZerandoNsu(false);
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
          {empresa.ambiente === "PRODUCAO" ? "Produção" : "Homologação"}{" "}
          <button
            type="button"
            onClick={() => void handleAlterarAmbiente()}
            disabled={alterandoAmbiente}
            className="font-mono text-[0.625rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30"
            style={{ color: "var(--paper)" }}
            title="Trocar entre produção e homologação da SEFAZ"
          >
            {alterandoAmbiente
              ? "trocando…"
              : `trocar para ${empresa.ambiente === "PRODUCAO" ? "homologação" : "produção"}`}
          </button>
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-1 border-b" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => mudarAba("entrada")}
            className="px-1 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{
              color: abaDocumentos === "entrada" ? "var(--paper)" : "var(--muted)",
              borderBottom: abaDocumentos === "entrada" ? "2px solid var(--paper)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            Notas de entrada
          </button>
          <button
            onClick={() => mudarAba("saida")}
            className="ml-4 px-1 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{
              color: abaDocumentos === "saida" ? "var(--paper)" : "var(--muted)",
              borderBottom: abaDocumentos === "saida" ? "2px solid var(--paper)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            Notas de saída
          </button>
          <button
            onClick={() => mudarAba("cte")}
            className="ml-4 px-1 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{
              color: abaDocumentos === "cte" ? "var(--paper)" : "var(--muted)",
              borderBottom: abaDocumentos === "cte" ? "2px solid var(--paper)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            CT-e distribuição
          </button>
          <button
            onClick={() => mudarAba("certificado")}
            className="ml-4 flex items-center gap-1.5 px-1 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{
              color: abaDocumentos === "certificado" ? "var(--paper)" : "var(--muted)",
              borderBottom: abaDocumentos === "certificado" ? "2px solid var(--paper)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            Certificado
            {certificadoAtencao && (
              <span
                className="pulso-atencao h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--paper)" }}
                title={
                  diasVencimentoCertificado !== null && diasVencimentoCertificado < 0
                    ? "Certificado vencido"
                    : "Certificado perto de vencer"
                }
              />
            )}
          </button>
        </div>

        <div className="barra-carregando" data-ativa={transicaoAba} aria-hidden="true" />
        {transicaoAba && (
          <div className="entra-suave space-y-3" aria-busy="true">
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-16 w-full rounded-lg" />
            <div className="skeleton h-40 w-full rounded-lg" />
          </div>
        )}

        {!transicaoAba && abaDocumentos === "entrada" && (
        <div key="entrada" className="desliza-esquerda space-y-3">
          <div className="flex items-center justify-end">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setManifestarTodasAberto(true)}
              disabled={pendentesManifestacao.length === 0}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              style={{ color: "var(--paper)" }}
              title={
                pendentesManifestacao.length === 0
                  ? "Nenhuma NF-e pendente de manifestação no mês/filtro selecionado"
                  : `Manifestar as ${pendentesManifestacao.length} NF-e pendentes de ${rotuloMes(mesFiltro)}`
              }
            >
              Manifestar todas{pendentesManifestacao.length > 0 ? ` (${pendentesManifestacao.length})` : ""}
            </button>
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

        <div className="flex items-center gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
            Última sincronização:{" "}
            {empresa.ultimaSincronizacaoEm ? formatarDataHora(empresa.ultimaSincronizacaoEm) : "nunca"}
          </p>
          <button
            onClick={() => void handleZerarNsu()}
            disabled={zerandoNsu}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30"
            style={{ color: "var(--muted)" }}
            title="Use só se os dados de entrada foram perdidos (ex: reconstrução do servidor) e a SEFAZ precisa reenviar tudo de novo"
          >
            {zerandoNsu ? "Zerando…" : "Zerar NSU"}
          </button>
        </div>

        {resultadoNsu && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {resultadoNsu}
          </p>
        )}

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
              {filtroTipoEntrada !== "TODOS" && ` (filtrado por ${ROTULO_TIPO_DOCUMENTO[filtroTipoEntrada]})`}
            </span>
            <ControleOrdenacaoEFiltro
              ordenacao={ordenacaoEntrada}
              onMudarOrdenacao={setOrdenacaoEntrada}
              filtroTipo={filtroTipoEntrada}
              onMudarFiltroTipo={setFiltroTipoEntrada}
            />
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
              onClick={() => void handleBaixarXmlEntrada()}
              disabled={notasEntradaDoMes.length === 0 || baixandoXmlEntrada}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              style={{ color: "var(--paper)" }}
              title={notasEntradaDoMes.length === 0 ? "Não há notas de entrada nesse mês" : undefined}
            >
              {baixandoXmlEntrada ? "Baixando…" : "Baixar XML"}
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

        {erroXmlEntrada && (
          <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
            {erroXmlEntrada}
          </p>
        )}

        {documentosEntrada.length === 0 ? (
          <div
            className="entra rounded-lg border border-dashed p-8 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nenhuma nota de entrada recebida ainda.
            </p>
          </div>
        ) : notasEntradaOrdenadas.length === 0 ? (
          <div
            className="entra rounded-lg border border-dashed p-8 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nenhuma nota em {rotuloMes(mesFiltro)}{filtroTipoEntrada !== "TODOS" ? " com esse filtro de tipo" : ""}.
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
                    <th className="w-[7%] px-3 py-3 font-medium">Tipo</th>
                    <th className="w-[16%] px-3 py-3 font-medium">Empresa (emitente)</th>
                    <th className="w-[13%] px-3 py-3 font-medium">Chave de acesso</th>
                    <th className="w-[9%] px-3 py-3 font-medium">Status</th>
                    <th className="w-[10%] px-3 py-3 font-medium">Valor</th>
                    <th className="w-[15%] px-3 py-3 font-medium">Classificação</th>
                    <th className="w-[15%] px-3 py-3 font-medium">Manifestação</th>
                  </tr>
                </thead>
                <tbody>
                  {notasEntradaOrdenadas.map((doc, i) => (
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
                      <td className="truncate overflow-hidden px-3 py-3 whitespace-nowrap" style={{ color: "var(--paper)" }}>
                        {ROTULO_TIPO_DOCUMENTO[doc.tipo]}
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
        </div>
        )}

        {!transicaoAba && abaDocumentos === "saida" && (
        <div key="saida" className="desliza-direita space-y-3">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Notas emitidas por esta empresa (via PDV/ERP próprio), capturadas
          pelo agente desktop instalado no computador do cliente ou do
          contador — não vêm da SEFAZ.
        </p>

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
                Relatório de saída · mês
              </label>
              <input
                type="month"
                value={mesFiltroSaida}
                onChange={(event) => setMesFiltroSaida(event.target.value)}
                className="campo text-sm"
                style={{ width: "auto" }}
              />
            </div>
            <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
              {rotuloMes(mesFiltroSaida)} ·{" "}
              {notasSaidaDoMes.length === 0
                ? "nenhuma nota de saída nesse mês"
                : `${notasSaidaDoMes.length} nota(s)`}
              {filtroTipoSaida !== "TODOS" && ` (filtrado por ${ROTULO_TIPO_DOCUMENTO[filtroTipoSaida]})`}
            </span>
            <ControleOrdenacaoEFiltro
              ordenacao={ordenacaoSaida}
              onMudarOrdenacao={setOrdenacaoSaida}
              filtroTipo={filtroTipoSaida}
              onMudarFiltroTipo={setFiltroTipoSaida}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExportarSaidaPdf}
              disabled={notasSaidaDoMes.length === 0}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              style={{ color: "var(--paper)" }}
              title={notasSaidaDoMes.length === 0 ? "Não há notas de saída nesse mês" : undefined}
            >
              Baixar PDF
            </button>
            <button
              onClick={() => void handleBaixarXmlSaida()}
              disabled={notasSaidaDoMes.length === 0 || baixandoXmlSaida}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
              style={{ color: "var(--paper)" }}
              title={notasSaidaDoMes.length === 0 ? "Não há notas de saída nesse mês" : undefined}
            >
              {baixandoXmlSaida ? "Baixando…" : "Baixar XML"}
            </button>
            <button
              onClick={handleExportarSaidaExcel}
              disabled={notasSaidaDoMes.length === 0}
              className="botao-principal disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ width: "auto", paddingInline: "1.25rem" }}
              title={notasSaidaDoMes.length === 0 ? "Não há notas de saída nesse mês" : undefined}
            >
              Baixar Excel
            </button>
          </div>

          {erroXmlSaida && (
            <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
              {erroXmlSaida}
            </p>
          )}
        </div>

        {documentosSaida.length === 0 ? (
          <div
            className="entra rounded-lg border border-dashed p-8 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nenhuma nota de saída capturada ainda. Instale o agente desktop
              na página{" "}
              <Link href="/agentes" className="underline underline-offset-4" style={{ color: "var(--paper)" }}>
                Agentes desktop
              </Link>{" "}
              pra começar.
            </p>
          </div>
        ) : notasSaidaOrdenadas.length === 0 ? (
          <div
            className="entra rounded-lg border border-dashed p-8 text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Nenhuma nota em {rotuloMes(mesFiltroSaida)}{filtroTipoSaida !== "TODOS" ? " com esse filtro de tipo" : ""}.
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
                    <th className="w-[8%] px-3 py-3 font-medium">Tipo</th>
                    <th className="w-[9%] px-3 py-3 font-medium">CFOP</th>
                    <th className="w-[15%] px-3 py-3 font-medium">Chave de acesso</th>
                    <th className="w-[11%] px-3 py-3 font-medium">Valor</th>
                    <th className="w-[42%] px-3 py-3 font-medium">Enviado por</th>
                  </tr>
                </thead>
                <tbody>
                  {notasSaidaOrdenadas.map((doc, i) => (
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
                      <td className="truncate overflow-hidden px-3 py-3 whitespace-nowrap" style={{ color: "var(--paper)" }}>
                        {ROTULO_TIPO_DOCUMENTO[doc.tipo]}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {doc.cfop ?? "—"}
                      </td>
                      <td
                        className="chave-mascarada truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap"
                        style={{ color: "var(--muted)" }}
                        title={doc.chaveAcesso}
                      >
                        {chaveResumida(doc.chaveAcesso)}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 whitespace-nowrap" style={{ color: "var(--paper)" }}>
                        {formatarMoeda(doc.valorTotal)}
                      </td>
                      <td className="truncate overflow-hidden px-3 py-3 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                        {doc.agenteInstalacaoToken?.nome ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
        )}

        {!transicaoAba && abaDocumentos === "cte" && token && (
        <div key="cte" className="desliza-direita space-y-3">
          <SecaoCteDistribuicao empresaId={empresa.id} token={token} temCertificado={Boolean(certificado)} />
        </div>
        )}

        {!transicaoAba && abaDocumentos === "certificado" && (
        <div key="certificado" className="desliza-direita space-y-3">
          <SecaoCertificado
            empresaId={empresa.id}
            token={token!}
            certificado={certificado}
            onCadastrado={setCertificado}
          />
        </div>
        )}
      </section>

      {manifestarTodasAberto && token && (
        <ModalManifestacao
          empresaId={empresa.id}
          token={token}
          alvos={pendentesManifestacao}
          onFechar={() => setManifestarTodasAberto(false)}
          onConcluido={() => void carregarTudo(token)}
        />
      )}

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
          Sistemas. Exportação de notas de saída para o Domínio ainda não
          existe — hoje elas ficam disponíveis pra conferência em PDF/Excel
          na seção acima.
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
