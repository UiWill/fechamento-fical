"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  aplicarCorrecao,
  listarApuracaoItens,
  listarNumeracaoFaltando,
  reprocessarItensDocumentoFiscal,
  type ItemApuracao,
  type NumeroFaltando,
} from "@/lib/api";
import { formatarDataHora, limitesDoMes, mesAtual, rotuloMes } from "@/lib/format";
import { exportarApuracaoIcmsExcel, exportarRelatorioIcmsCst } from "@/lib/exportar-apuracao-excel";
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

function dataOuDesconhecida(iso: string | null): string {
  return iso === null ? "data desconhecida" : formatarDataHora(iso);
}

function somar(itens: ItemApuracao[], campo: keyof ItemApuracao): string {
  const total = itens.reduce((acc, i) => acc + Number(i[campo] ?? 0), 0);
  return total.toFixed(2);
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
  { rotulo: "CST ICMS", campo: "icmsCst" },
  { rotulo: "vBC ICMS", campo: "icmsBase" },
  { rotulo: "pICMS", campo: "icmsAliquota" },
  { rotulo: "vICMS", campo: "icmsValor" },
  { rotulo: "CST IPI", campo: "ipiCst" },
  { rotulo: "vBC IPI", campo: "ipiBase" },
  { rotulo: "pIPI", campo: "ipiAliquota" },
  { rotulo: "vIPI", campo: "ipiValor" },
  { rotulo: "CST PIS", campo: "pisCst" },
  { rotulo: "vBC PIS", campo: "pisBase" },
  { rotulo: "pPIS", campo: "pisAliquota" },
  { rotulo: "vPIS", campo: "pisValor" },
  { rotulo: "CST COFINS", campo: "cofinsCst" },
  { rotulo: "vBC COFINS", campo: "cofinsBase" },
  { rotulo: "pCOFINS", campo: "cofinsAliquota" },
  { rotulo: "vCOFINS", campo: "cofinsValor" },
  { rotulo: "CFOP divergente", campo: "cfopDivergente" },
  { rotulo: "Inconsistências", campo: "tributosInconsistentes" },
  { rotulo: "Regime ICMS misturado", campo: "regimeIcmsMisturado" },
  { rotulo: "Alíquota ICMS divergente", campo: "aliquotaIcmsDivergente" },
];

interface LinhaResumoCfop {
  cfop: string;
  cstIcms: string;
  qtdItens: number;
  valorProdutos: number;
  baseIcms: number;
  valorIcms: number;
}

interface FaixaFaltando {
  tipo: string;
  serie: number;
  deNumero: number;
  ateNumero: number;
  anteriorEmitidoEm: string | null;
  proximoEmitidoEm: string | null;
  gigante: boolean;
}

/** Agrupa números faltando individuais (um registro por número) em faixas contíguas pra não virar uma parede de números na tela. */
function agruparFaixas(faltando: NumeroFaltando[]): FaixaFaltando[] {
  const porBuraco = new Map<string, NumeroFaltando[]>();
  for (const f of faltando) {
    const chave = `${f.tipo}-${f.serie}-${f.anterior.numero}-${f.proximo.numero}`;
    const lista = porBuraco.get(chave) ?? [];
    lista.push(f);
    porBuraco.set(chave, lista);
  }
  return [...porBuraco.values()].map((lista) => {
    const primeiro = lista[0]!;
    const gigante = primeiro.numero === -1;
    const numeros = lista.map((f) => f.numero);
    return {
      tipo: primeiro.tipo,
      serie: primeiro.serie,
      deNumero: gigante ? primeiro.anterior.numero + 1 : Math.min(...numeros),
      ateNumero: gigante ? primeiro.proximo.numero - 1 : Math.max(...numeros),
      anteriorEmitidoEm: primeiro.anterior.emitidoEm,
      proximoEmitidoEm: primeiro.proximo.emitidoEm,
      gigante,
    };
  });
}

function resumoPorCfop(itens: ItemApuracao[]): LinhaResumoCfop[] {
  const grupos = new Map<string, LinhaResumoCfop>();
  for (const i of itens) {
    const chave = `${i.cfop}|${i.icmsCst ?? "—"}`;
    const atual = grupos.get(chave) ?? {
      cfop: i.cfop,
      cstIcms: i.icmsCst ?? "—",
      qtdItens: 0,
      valorProdutos: 0,
      baseIcms: 0,
      valorIcms: 0,
    };
    atual.qtdItens += 1;
    atual.valorProdutos += Number(i.valorProdutos);
    atual.baseIcms += Number(i.icmsBase ?? 0);
    atual.valorIcms += Number(i.icmsValor ?? 0);
    grupos.set(chave, atual);
  }
  return [...grupos.values()].sort((a, b) => a.cfop.localeCompare(b.cfop) || a.cstIcms.localeCompare(b.cstIcms));
}

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

export function SecaoApuracaoIcms({
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
  const [numeracaoFaltando, setNumeracaoFaltando] = useState<NumeroFaltando[]>([]);
  const [numeracaoTruncada, setNumeracaoTruncada] = useState(false);
  // Algumas empresas passam de 15 mil itens num único mês — renderizar tudo
  // de uma vez deixa a página pesada/lenta pra rolar. Mostra em lotes; o
  // resumo por CFOP e os totais do rodapé continuam somando TUDO, só a
  // tabela detalhada é que pagina.
  const [limiteExibicao, setLimiteExibicao] = useState(LOTE_EXIBICAO);
  // Filtro por coluna, estilo Excel — ver FiltroColuna.tsx.
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const definirFiltro = (campo: string, valor: string) => {
    setFiltros((atual) => ({ ...atual, [campo]: valor }));
    setLimiteExibicao(LOTE_EXIBICAO);
  };
  const itensFiltrados = aplicarFiltrosColuna(itens, filtros);

  // Carta de Correção (CC-e) — modal pra correção manual, e aplicação de
  // 1 clique quando a tabela já sugere a correção (regra aprendida de
  // outra nota/empresa que bate com esse mesmo erro).
  const [itemParaCorrigir, setItemParaCorrigir] = useState<ItemApuracao | null>(null);
  const [aplicandoSugestao, setAplicandoSugestao] = useState<string | null>(null);

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

  // Contador de requisição — o <input type="month"> dispara onChange a
  // cada dígito digitado (ex: "2026-09" vira "2026-0", "2026-09" em dois
  // eventos), então duas buscas podem ficar "no ar" ao mesmo tempo; sem
  // isso, a resposta da busca ANTIGA podia chegar DEPOIS da nova e
  // sobrescrever a tela com o resultado errado (às vezes vazio) — exatamente
  // o bug "digita o mês e some, só volta apagando e digitando de novo".
  const idRequisicao = useRef(0);

  const carregar = useCallback(async () => {
    const idDestaChamada = ++idRequisicao.current;
    setCarregando(true);
    try {
      const { inicio, fim } = limitesDoMes(mes);
      const [dados, numeracao] = await Promise.all([
        listarApuracaoItens(empresaId, direcao, inicio, fim, token),
        listarNumeracaoFaltando(empresaId, direcao, inicio, fim, token),
      ]);
      if (idDestaChamada !== idRequisicao.current) return; // resposta de uma busca já superada
      setItens(dados);
      setLimiteExibicao(LOTE_EXIBICAO);
      setFiltros({});
      setNumeracaoFaltando(numeracao.faltando);
      setNumeracaoTruncada(numeracao.truncado);
      setErro(null);
    } catch {
      if (idDestaChamada !== idRequisicao.current) return;
      setErro("Não foi possível carregar a apuração agora.");
    } finally {
      if (idDestaChamada === idRequisicao.current) setCarregando(false);
    }
  }, [empresaId, token, mes, direcao]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const [gerandoExcel, setGerandoExcel] = useState(false);

  async function handleBaixarExcel() {
    setGerandoExcel(true);
    try {
      await exportarApuracaoIcmsExcel(itensFiltrados, empresaNome, cnpj, rotuloMes(mes));
    } catch {
      setMensagem("Não foi possível gerar o Excel agora.");
    } finally {
      setGerandoExcel(false);
    }
  }

  const [gerandoRelatorioCst, setGerandoRelatorioCst] = useState(false);

  async function handleBaixarRelatorioCst() {
    setGerandoRelatorioCst(true);
    try {
      await exportarRelatorioIcmsCst(itensFiltrados, empresaNome, cnpj, rotuloMes(mes));
    } catch {
      setMensagem("Não foi possível gerar o relatório agora.");
    } finally {
      setGerandoRelatorioCst(false);
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

  const pendencias = itens.filter(
    (i) =>
      i.cfopDivergente || i.tributosInconsistentes.length > 0 || i.regimeIcmsMisturado || i.aliquotaIcmsDivergente
  ).length;

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Item a item das notas de {direcao === "SAIDA" ? "saída" : "entrada"} autorizadas no mês — produto, NCM, CFOP
        e a tributação de ICMS/IPI/PIS/COFINS de cada linha, direto do XML.{" "}
        {direcao === "SAIDA" && (
          <>
            Linhas com <strong>CFOP divergente</strong> (fora do que as regras fiscais esperam na saída) ficam
            destacadas em vermelho,{" "}
          </>
        )}
        linhas onde <strong>base × alíquota não bate com o valor</strong> do XML ficam em laranja, notas com{" "}
        <strong>item em CST normal e item em CSOSN ao mesmo tempo</strong> (regime misturado, não devia acontecer)
        ficam em roxo, e itens com <strong>alíquota de ICMS diferente do que a empresa normalmente usa</strong>{" "}
        nesse mesmo CFOP ficam em azul.
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
            onClick={() => exportarCsv(itensFiltrados, `apuracao-icms-${direcao.toLowerCase()}-${mes}.csv`)}
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
          <button
            onClick={() => void handleBaixarRelatorioCst()}
            disabled={itensFiltrados.length === 0 || gerandoRelatorioCst}
            className={CLASSE_BOTAO_LINK}
            style={{ color: "var(--paper)" }}
            title="Mapa de apuração do ICMS por CFOP x situação tributária (CST) — B.Reduzido, Isentos, Não Trib., Diferido, ST, Suspensão, Outras"
          >
            {gerandoRelatorioCst ? "Gerando…" : "Relatório ICMS (CST)"}
          </button>
          <button onClick={() => void handleReprocessar()} disabled={reprocessando} className={CLASSE_BOTAO_LINK} style={{ color: "var(--paper)" }}>
            {reprocessando ? "Reprocessando…" : "Reprocessar itens"}
          </button>
        </div>
      </div>

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

      {!carregando && numeracaoFaltando.length > 0 && (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--vermelho, #e08a8a)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--paper)" }}>
            {numeracaoFaltando.length} número(s) de nota faltando na sequência perto desse período — possível nota
            que nunca chegou no sistema.
          </p>
          <ul className="mt-2 space-y-1 text-xs" style={{ color: "var(--muted)" }}>
            {agruparFaixas(numeracaoFaltando).map((f, i) => (
              <li key={i}>
                {f.tipo} série {f.serie}: {f.gigante ? "faixa grande" : "falta"}{" "}
                <strong style={{ color: "var(--paper)" }}>
                  {f.deNumero === f.ateNumero ? f.deNumero : `${f.deNumero} a ${f.ateNumero}`}
                </strong>{" "}
                (entre {dataOuDesconhecida(f.anteriorEmitidoEm)} e {dataOuDesconhecida(f.proximoEmitidoEm)})
              </li>
            ))}
          </ul>
          {numeracaoTruncada && (
            <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
              Lista parcial — tem mais números faltando além dos listados aqui.
            </p>
          )}
        </div>
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
                <th className="px-3 py-2 font-medium">CST ICMS</th>
                <th className="px-3 py-2 font-medium">Itens</th>
                <th className="px-3 py-2 font-medium">Valor produtos</th>
                <th className="px-3 py-2 font-medium">Base ICMS</th>
                <th className="px-3 py-2 font-medium">Valor ICMS</th>
              </tr>
            </thead>
            <tbody>
              {resumoPorCfop(itensFiltrados).map((r) => (
                <tr key={`${r.cfop}-${r.cstIcms}`} className="border-t text-xs" style={{ borderColor: "var(--border)" }}>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.cfop}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.cstIcms}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.qtdItens}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.valorProdutos.toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{r.baseIcms.toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{r.valorIcms.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="max-h-[34rem] overflow-auto">
            <table className="w-full min-w-[110rem] text-left text-sm">
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
                    ["CST ICMS", "icmsCst"],
                    ["vBC", "icmsBase"],
                    ["pICMS", "icmsAliquota"],
                    ["vICMS", "icmsValor"],
                    ["CST IPI", "ipiCst"],
                    ["vBC", "ipiBase"],
                    ["pIPI", "ipiAliquota"],
                    ["vIPI", "ipiValor"],
                    ["CST PIS", "pisCst"],
                    ["vBC", "pisBase"],
                    ["pPIS", "pisAliquota"],
                    ["vPIS", "pisValor"],
                    ["CST COFINS", "cofinsCst"],
                    ["vBC", "cofinsBase"],
                    ["pCOFINS", "cofinsAliquota"],
                    ["vCOFINS", "cofinsValor"],
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
                    i.regimeIcmsMisturado ? "Nota com item em CST normal e item em CSOSN ao mesmo tempo" : null,
                    i.aliquotaIcmsDivergente
                      ? "Alíquota de ICMS diferente da que a empresa normalmente usa nesse CFOP"
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" — ");
                  return (
                  <tr
                    key={i.id}
                    className="border-t align-top"
                    style={{
                      borderColor: "var(--border)",
                      background: i.cfopDivergente
                        ? "rgba(224, 90, 90, 0.32)"
                        : inconsistente
                          ? "rgba(224, 150, 60, 0.32)"
                          : i.regimeIcmsMisturado
                            ? "rgba(160, 80, 224, 0.32)"
                            : i.aliquotaIcmsDivergente
                              ? "rgba(70, 150, 224, 0.32)"
                              : undefined,
                    }}
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
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.icmsCst)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.icmsBase)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.icmsAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.icmsValor)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.ipiCst)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.ipiBase)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.ipiAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.ipiValor)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.pisCst)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.pisBase)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.pisAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.pisValor)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.cofinsCst)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{val(i.cofinsBase)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>{pct(i.cofinsAliquota)}</td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>{val(i.cofinsValor)}</td>
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
                  <td className="px-3 py-3" colSpan={8}>
                    Total do período
                  </td>
                  <td className="px-3 py-3">{somar(itensFiltrados, "icmsBase")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "icmsValor")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "ipiBase")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "ipiValor")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "pisBase")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "pisValor")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "cofinsBase")}</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">{somar(itensFiltrados, "cofinsValor")}</td>
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
