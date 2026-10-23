"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  aplicarCorrecao,
  aplicarCorrecaoEmMassa,
  listarApuracaoItens,
  reprocessarItensDocumentoFiscal,
  type ItemApuracao,
} from "@/lib/api";
import { formatarDataHora, limitesDoMes, mesAtual, rotuloMes } from "@/lib/format";
import { exportarApuracaoIbsCbsExcel } from "@/lib/exportar-apuracao-excel";
import { SeletorMes } from "./SeletorMes";
import { CarregandoTabela, BotaoCarregarMais } from "./CarregandoTabela";
import { FiltroColuna, aplicarFiltrosColuna } from "./FiltroColuna";
import { ModalAplicarCorrecao } from "./ModalAplicarCorrecao";

const LOTE_EXIBICAO = 300;

const CLASSE_BOTAO_LINK =
  "font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed";

function pct(v: string | null): string {
  return v === null ? "—" : `${v}%`;
}

function val(v: string | null): string {
  return v === null ? "—" : v;
}

function somar(itens: ItemApuracao[], campo: keyof ItemApuracao): string {
  const total = itens.reduce((acc, i) => acc + Number(i[campo] ?? 0), 0);
  return total.toFixed(2);
}

interface LinhaResumoCfop {
  cfop: string;
  cClassTrib: string;
  qtdItens: number;
  valorProdutos: number;
  valorIbsUf: number;
  valorIbsMun: number;
  valorCbs: number;
}

function resumoPorCfop(itens: ItemApuracao[]): LinhaResumoCfop[] {
  const grupos = new Map<string, LinhaResumoCfop>();
  for (const i of itens) {
    const chave = `${i.cfop}|${i.cClassTrib ?? "—"}`;
    const atual = grupos.get(chave) ?? {
      cfop: i.cfop,
      cClassTrib: i.cClassTrib ?? "—",
      qtdItens: 0,
      valorProdutos: 0,
      valorIbsUf: 0,
      valorIbsMun: 0,
      valorCbs: 0,
    };
    atual.qtdItens += 1;
    atual.valorProdutos += Number(i.valorProdutos);
    atual.valorIbsUf += Number(i.ibsUfValor ?? 0);
    atual.valorIbsMun += Number(i.ibsMunValor ?? 0);
    atual.valorCbs += Number(i.cbsValor ?? 0);
    grupos.set(chave, atual);
  }
  return [...grupos.values()].sort((a, b) => a.cfop.localeCompare(b.cfop) || a.cClassTrib.localeCompare(b.cClassTrib));
}

const COLUNAS_CSV: { rotulo: string; campo: keyof ItemApuracao }[] = [
  { rotulo: "Tipo", campo: "tipo" },
  { rotulo: "nNF", campo: "nNF" },
  { rotulo: "dhEmi", campo: "dhEmi" },
  { rotulo: "nItem", campo: "nItem" },
  { rotulo: "cProd", campo: "cProd" },
  { rotulo: "xProd", campo: "xProd" },
  { rotulo: "NCM", campo: "ncm" },
  { rotulo: "CFOP", campo: "cfop" },
  { rotulo: "CST", campo: "ibsCbsCst" },
  { rotulo: "cClassTrib", campo: "cClassTrib" },
  { rotulo: "vBC", campo: "ibsCbsBase" },
  { rotulo: "pIBS UF", campo: "ibsUfAliquota" },
  { rotulo: "vIBS UF", campo: "ibsUfValor" },
  { rotulo: "pIBS Mun", campo: "ibsMunAliquota" },
  { rotulo: "vIBS Mun", campo: "ibsMunValor" },
  { rotulo: "pCBS", campo: "cbsAliquota" },
  { rotulo: "vCBS", campo: "cbsValor" },
  { rotulo: "CFOP divergente", campo: "cfopDivergente" },
  { rotulo: "IBS/CBS obrigatório ausente", campo: "ibsCbsObrigatorioAusente" },
  { rotulo: "Regime ICMS misturado", campo: "regimeIcmsMisturado" },
];

function exportarCsv(itens: ItemApuracao[], nomeArquivo: string) {
  const linhas = [
    COLUNAS_CSV.map((c) => c.rotulo).join(";"),
    ...itens.map((item) =>
      COLUNAS_CSV.map((c) => {
        const valor = item[c.campo];
        if (Array.isArray(valor)) return valor.join(" / ");
        return String(valor ?? "");
      }).join(";")
    ),
  ];
  const blob = new Blob([`﻿${linhas.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(url);
}

export function SecaoApuracaoIbsCbs({
  empresaId,
  empresaNome,
  cnpj,
  token,
}: {
  empresaId: string;
  empresaNome: string;
  cnpj: string;
  token: string;
}) {
  const [direcao, setDirecao] = useState<"ENTRADA" | "SAIDA">("SAIDA");
  const [itens, setItens] = useState<ItemApuracao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mes, setMes] = useState(mesAtual());
  const [reprocessando, setReprocessando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  // Mesma paginação de SecaoApuracaoIcms.tsx — empresas grandes passam de
  // 15 mil itens/mês, renderizar tudo de uma vez deixa a página lenta.
  const [limiteExibicao, setLimiteExibicao] = useState(LOTE_EXIBICAO);
  // Filtro por coluna, estilo Excel — ver FiltroColuna.tsx.
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const definirFiltro = (campo: string, valor: string) => {
    setFiltros((atual) => ({ ...atual, [campo]: valor }));
    setLimiteExibicao(LOTE_EXIBICAO);
  };
  const itensFiltrados = aplicarFiltrosColuna(itens, filtros);

  // Carta de Correção (CC-e) — mesmo fluxo de SecaoApuracaoIcms.tsx.
  const [itemParaCorrigir, setItemParaCorrigir] = useState<ItemApuracao | null>(null);
  const [aplicandoSugestao, setAplicandoSugestao] = useState<string | null>(null);
  const [aplicandoTodasSugestoes, setAplicandoTodasSugestoes] = useState(false);
  const sugestoesPendentes = itensFiltrados.filter((i) => i.correcaoSugerida !== null);

  // Mesmo fluxo de SecaoApuracaoIcms.tsx — agrupa por regra (dedupe por
  // documento) e aplica em massa por regra, sem abrir lista/modal na tela.
  async function handleAplicarTodasSugestoes() {
    const idsPorRegra = new Map<string, Set<string>>();
    for (const item of sugestoesPendentes) {
      if (!item.correcaoSugerida) continue;
      const ids = idsPorRegra.get(item.correcaoSugerida.regraId) ?? new Set<string>();
      ids.add(item.documentoFiscalId);
      idsPorRegra.set(item.correcaoSugerida.regraId, ids);
    }
    if (idsPorRegra.size === 0) return;

    setAplicandoTodasSugestoes(true);
    setMensagem(null);
    try {
      let total = 0;
      let sucesso = 0;
      let falha = 0;
      for (const [regraId, ids] of idsPorRegra) {
        const resultado = await aplicarCorrecaoEmMassa(regraId, [...ids], token);
        total += resultado.total;
        sucesso += resultado.sucesso;
        falha += resultado.falha;
      }
      setMensagem(`Aplicado em ${total} nota(s): ${sucesso} autorizada(s), ${falha} com falha.`);
      void carregar();
    } catch {
      setMensagem("Não foi possível aplicar as sugestões agora.");
    } finally {
      setAplicandoTodasSugestoes(false);
    }
  }

  async function handleAplicarSugestao(item: ItemApuracao) {
    if (!item.correcaoSugerida) return;
    setAplicandoSugestao(item.id);
    setMensagem(null);
    try {
      const valorErrado =
        item.correcaoSugerida.campo === "CFOP"
          ? item.cfop
          : item.correcaoSugerida.campo === "NCM"
            ? item.ncm
            : (item.icmsCst ?? "");
      const evento = await aplicarCorrecao(
        empresaId,
        {
          documentoFiscalId: item.documentoFiscalId,
          campo: item.correcaoSugerida.campo,
          valorErrado,
          valorCorreto: item.correcaoSugerida.valorCorreto,
          ncm: item.ncm,
          descricaoProduto: item.xProd,
          cfopContexto: item.cfop,
          regraCorrecaoId: item.correcaoSugerida.regraId,
        },
        token
      );
      setMensagem(
        evento.status === "AUTORIZADA"
          ? "Carta de Correção aplicada com sucesso."
          : `A SEFAZ rejeitou a correção: ${evento.motivoSefaz ?? "motivo não informado"}.`
      );
      if (evento.status === "AUTORIZADA") void carregar();
    } catch {
      setMensagem("Não foi possível aplicar a correção agora.");
    } finally {
      setAplicandoSugestao(null);
    }
  }

  // Mesmo guard de SecaoApuracaoIcms.tsx — <input type="month"> dispara
  // onChange a cada dígito, duas buscas ficam "no ar" e a resposta velha
  // podia chegar depois e sobrescrever com resultado errado (às vezes
  // vazio) — o bug "digita o mês e some".
  const idRequisicao = useRef(0);

  const carregar = useCallback(async () => {
    const idDestaChamada = ++idRequisicao.current;
    setCarregando(true);
    try {
      const { inicio, fim } = limitesDoMes(mes);
      const dados = await listarApuracaoItens(empresaId, direcao, inicio, fim, token);
      if (idDestaChamada !== idRequisicao.current) return;
      setItens(dados);
      setLimiteExibicao(LOTE_EXIBICAO);
      setFiltros({});
      setErro(null);
    } catch {
      if (idDestaChamada !== idRequisicao.current) return;
      setErro("Não foi possível carregar a apuração agora.");
    } finally {
      if (idDestaChamada !== idRequisicao.current) return;
      setCarregando(false);
    }
  }, [empresaId, token, mes, direcao]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const [gerandoExcel, setGerandoExcel] = useState(false);

  async function handleBaixarExcel() {
    setGerandoExcel(true);
    try {
      await exportarApuracaoIbsCbsExcel(itensFiltrados, empresaNome, cnpj, rotuloMes(mes));
    } catch {
      setMensagem("Não foi possível gerar o Excel agora.");
    } finally {
      setGerandoExcel(false);
    }
  }

  async function handleReprocessar() {
    setReprocessando(true);
    setMensagem(null);
    try {
      const resultado = await reprocessarItensDocumentoFiscal(empresaId, direcao, token);
      setMensagem(
        resultado.total === 0
          ? `Nenhuma nota de ${direcao === "SAIDA" ? "saída" : "entrada"} sem itens pra reprocessar.`
          : `${resultado.total} nota(s) sendo reprocessada(s) em segundo plano — a lista vai se atualizando sozinha.`
      );
      const releituras = [5_000, 15_000, 30_000, 60_000];
      for (const atraso of releituras) {
        setTimeout(() => void carregar(), atraso);
      }
    } catch {
      setMensagem("Não foi possível reprocessar os itens agora.");
    } finally {
      setReprocessando(false);
    }
  }

  const semGrupoReforma = !carregando && itens.length > 0 && itens.every((i) => i.ibsCbsCst === null);
  const ausentesObrigatorio = itens.filter((i) => i.ibsCbsObrigatorioAusente).length;
  const pendencias = itens.filter(
    (i) =>
      i.cfopDivergente || i.tributosInconsistentes.length > 0 || i.ibsCbsObrigatorioAusente || i.regimeIcmsMisturado
  ).length;

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Item a item das notas de {direcao === "SAIDA" ? "saída" : "entrada"} autorizadas no mês com a tributação da
        Reforma (IBS/CBS, LC 214/2025) — colunas ficam em branco em notas emitidas sem o grupo{" "}
        <code>gIBSCBS</code> ainda (produção obrigatória a partir de 05/10/2026).{" "}
        {direcao === "SAIDA" && (
          <>
            Linhas com <strong>CFOP divergente</strong> ficam destacadas em vermelho,{" "}
          </>
        )}
        <strong>base × alíquota incorreta</strong> em laranja, e notas de 05/10/2026 em diante{" "}
        <strong>sem o grupo IBS/CBS</strong> (deveriam ter) em amarelo.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-md border" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setDirecao("ENTRADA")}
                className="px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors"
                style={{
                  background: direcao === "ENTRADA" ? "var(--paper)" : "transparent",
                  color: direcao === "ENTRADA" ? "var(--void, #0a0a0a)" : "var(--muted)",
                }}
              >
                Entrada
              </button>
              <button
                onClick={() => setDirecao("SAIDA")}
                className="px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors"
                style={{
                  background: direcao === "SAIDA" ? "var(--paper)" : "transparent",
                  color: direcao === "SAIDA" ? "var(--void, #0a0a0a)" : "var(--muted)",
                }}
              >
                Saída
              </button>
            </div>
            <label className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
              Mês
            </label>
            <SeletorMes value={mes} onChange={setMes} />
          </div>
          <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
            {rotuloMes(mes)} ·{" "}
            {itensFiltrados.length === itens.length
              ? itens.length === 0
                ? "nenhum item nesse mês"
                : `${itens.length} item(ns)`
              : `${itensFiltrados.length} de ${itens.length} item(ns) (filtrado)`}
            {pendencias > 0 && (
              <span style={{ color: "var(--vermelho, #e08a8a)" }}> · {pendencias} com pendência</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => exportarCsv(itensFiltrados, `apuracao-ibs-cbs-${direcao.toLowerCase()}-${mes}.csv`)}
            disabled={itensFiltrados.length === 0}
            className={CLASSE_BOTAO_LINK}
            style={{ color: "var(--paper)" }}
          >
            Exportar CSV
          </button>
          <button
            onClick={() => void handleBaixarExcel()}
            disabled={itensFiltrados.length === 0 || gerandoExcel}
            className={CLASSE_BOTAO_LINK}
            style={{ color: "var(--paper)" }}
          >
            {gerandoExcel ? "Gerando…" : "Baixar Excel"}
          </button>
          <button onClick={() => void handleReprocessar()} disabled={reprocessando} className={CLASSE_BOTAO_LINK} style={{ color: "var(--paper)" }}>
            {reprocessando ? "Reprocessando…" : "Reprocessar itens"}
          </button>
          {direcao === "SAIDA" && sugestoesPendentes.length > 0 && (
            <button
              onClick={() => void handleAplicarTodasSugestoes()}
              disabled={aplicandoTodasSugestoes}
              className={CLASSE_BOTAO_LINK}
              style={{ color: "var(--vermelho, #e08a8a)" }}
              title="Aplica de uma vez todas as correções sugeridas visíveis, agrupadas por regra"
            >
              {aplicandoTodasSugestoes ? "Aplicando…" : `Aplicar sugestões (${sugestoesPendentes.length})`}
            </button>
          )}
        </div>
      </div>

      {semGrupoReforma && (
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Nenhum item desse mês tem o grupo da Reforma ainda — normal enquanto a empresa não emite
          com o leiaute novo.
        </p>
      )}
      {!semGrupoReforma && ausentesObrigatorio > 0 && (
        <p className="text-xs" style={{ color: "var(--amarelo, #e0c86a)" }}>
          {ausentesObrigatorio} nota(s) emitida(s) de 05/10/2026 em diante sem o grupo IBS/CBS — a partir dessa
          data já é obrigatório trazer essa tributação.
        </p>
      )}
      {mensagem && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {mensagem}
        </p>
      )}
      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {carregando ? (
        <CarregandoTabela />
      ) : itens.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhum item em {rotuloMes(mes)}. Se a empresa tem notas de {direcao === "SAIDA" ? "saída" : "entrada"}{" "}
            desse mês e nada aparece aqui, clique em <strong>Reprocessar itens</strong> (histórico anterior a essa
            tela ainda não tem itens extraídos).
          </p>
        </div>
      ) : itensFiltrados.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhum item corresponde ao filtro aplicado.{" "}
            <button onClick={() => setFiltros({})} className={CLASSE_BOTAO_LINK} style={{ color: "var(--paper)" }}>
              Limpar filtros
            </button>
          </p>
        </div>
      ) : (
        <>
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <p className="px-3 pt-3 text-xs" style={{ color: "var(--muted)" }}>
            Resumo por CFOP — pra conferir os totais declarados mais rápido, sem precisar somar nota a nota.
          </p>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                <th className="px-3 py-2 font-medium">CFOP</th>
                <th className="px-3 py-2 font-medium">cClassTrib</th>
                <th className="px-3 py-2 font-medium">Itens</th>
                <th className="px-3 py-2 font-medium">Valor produtos</th>
                <th className="px-3 py-2 font-medium">IBS UF</th>
                <th className="px-3 py-2 font-medium">IBS Mun</th>
                <th className="px-3 py-2 font-medium">CBS</th>
              </tr>
            </thead>
            <tbody>
              {resumoPorCfop(itensFiltrados).map((r) => (
                <tr key={`${r.cfop}-${r.cClassTrib}`} className="border-t text-xs" style={{ borderColor: "var(--border)" }}>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.cfop}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.cClassTrib}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.qtdItens}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.valorProdutos.toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.valorIbsUf.toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.valorIbsMun.toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.valorCbs.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="max-h-[34rem] overflow-auto">
            <table className="w-full min-w-[90rem] text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                  {([
                    ["Tipo", "tipo"],
                    ["nNF", "nNF"],
                    ["dhEmi", "dhEmi"],
                    ["nItem", "nItem"],
                    ["cProd", "cProd"],
                    ["xProd", "xProd"],
                    ["NCM", "ncm"],
                    ["CFOP", "cfop"],
                    ["CST", "ibsCbsCst"],
                    ["cClassTrib", "cClassTrib"],
                    ["vBC", "ibsCbsBase"],
                    ["pIBS UF", "ibsUfAliquota"],
                    ["vIBS UF", "ibsUfValor"],
                    ["pIBS Mun", "ibsMunAliquota"],
                    ["vIBS Mun", "ibsMunValor"],
                    ["pCBS", "cbsAliquota"],
                    ["vCBS", "cbsValor"],
                  ] as [string, string][]).map(([rotulo, campo]) => (
                    <th key={campo} className="whitespace-nowrap px-3 py-3 font-medium">
                      {rotulo}
                      <FiltroColuna valor={filtros[campo] ?? ""} onChange={(v) => definirFiltro(campo, v)} />
                    </th>
                  ))}
                  {direcao === "SAIDA" && <th className="whitespace-nowrap px-3 py-3 font-medium">CC-e</th>}
                </tr>
              </thead>
              <tbody>
                {itensFiltrados.slice(0, limiteExibicao).map((i) => {
                  const inconsistente = i.tributosInconsistentes.length > 0;
                  const titulo = [
                    i.cfopDivergente ? "CFOP de saída fora do esperado pelas regras fiscais ativas" : null,
                    inconsistente ? `Base × alíquota não bate com o valor: ${i.tributosInconsistentes.join(", ")}` : null,
                    i.ibsCbsObrigatorioAusente ? "Nota de 05/10/2026 em diante sem o grupo IBS/CBS obrigatório" : null,
                    i.regimeIcmsMisturado ? "Nota com item em CST normal e item em CSOSN ao mesmo tempo" : null,
                  ]
                    .filter(Boolean)
                    .join(" — ");
                  const fundo = i.cfopDivergente
                    ? "rgba(224, 90, 90, 0.32)"
                    : inconsistente
                      ? "rgba(224, 150, 60, 0.32)"
                      : i.ibsCbsObrigatorioAusente
                        ? "rgba(224, 190, 50, 0.32)"
                        : i.regimeIcmsMisturado
                          ? "rgba(160, 80, 224, 0.32)"
                          : undefined;
                  return (
                  <tr
                    key={i.id}
                    className="border-t align-top"
                    style={{ borderColor: "var(--border)", background: fundo }}
                    title={titulo || undefined}
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>{i.tipo === "NFCE" ? "NFC-e" : "NF-e"}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>{i.nNF}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{formatarDataHora(i.dhEmi ?? "")}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{i.nItem}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{i.cProd}</td>
                    <td className="px-3 py-3" style={{ color: "var(--paper)" }}>{i.xProd}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{i.ncm}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: i.cfopDivergente ? "var(--vermelho, #e08a8a)" : "var(--paper)" }}>{i.cfop}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.ibsCbsCst)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.cClassTrib)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.ibsCbsBase)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.ibsUfAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.ibsUfValor)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.ibsMunAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.ibsMunValor)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.cbsAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.cbsValor)}</td>
                    {direcao === "SAIDA" && (
                      <td className="whitespace-nowrap px-3 py-3 text-xs">
                        {i.correcaoSugerida ? (
                          <button
                            onClick={() => void handleAplicarSugestao(i)}
                            disabled={aplicandoSugestao === i.id}
                            className={CLASSE_BOTAO_LINK}
                            style={{ color: "var(--vermelho, #e08a8a)" }}
                            title={`Regra aprendida: trocar ${i.correcaoSugerida.campo} para "${i.correcaoSugerida.valorCorreto}"`}
                          >
                            {aplicandoSugestao === i.id ? "Aplicando…" : "Aplicar sugestão"}
                          </button>
                        ) : (
                          <button
                            onClick={() => setItemParaCorrigir(i)}
                            className={CLASSE_BOTAO_LINK}
                            style={{ color: "var(--paper)" }}
                          >
                            Corrigir
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                  );
                })}
              </tbody>
              <tfoot className="sticky bottom-0">
                <tr
                  className="border-t font-mono text-xs font-medium"
                  style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--paper)" }}
                >
                  <td className="px-3 py-3" colSpan={9}>
                    Total do período
                  </td>
                  <td className="px-3 py-3">{somar(itensFiltrados, "ibsCbsBase")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "ibsUfValor")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "ibsMunValor")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "cbsValor")}</td>
                  {direcao === "SAIDA" && <td className="px-3 py-3" />}
                </tr>
              </tfoot>
            </table>
          </div>
          <BotaoCarregarMais
            totalItens={itensFiltrados.length}
            itensExibidos={Math.min(limiteExibicao, itensFiltrados.length)}
            onCarregarMais={() => setLimiteExibicao((l) => l + LOTE_EXIBICAO)}
          />
        </div>
        </>
      )}

      {itemParaCorrigir && (
        <ModalAplicarCorrecao
          empresaId={empresaId}
          token={token}
          item={itemParaCorrigir}
          onFechar={() => setItemParaCorrigir(null)}
          onAplicado={() => void carregar()}
        />
      )}
    </div>
  );
}
