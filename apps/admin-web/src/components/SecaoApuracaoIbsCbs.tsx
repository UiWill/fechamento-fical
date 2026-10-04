"use client";

import { useCallback, useEffect, useState } from "react";
import { listarApuracaoItens, reprocessarItensDocumentoFiscal, type ItemApuracao } from "@/lib/api";
import { formatarDataHora, limitesDoMes, mesAtual, rotuloMes } from "@/lib/format";

const CLASSE_BOTAO_LINK =
  "font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed";

function pct(v: string | null): string {
  return v === null ? "—" : `${v}%`;
}

function val(v: string | null): string {
  return v === null ? "—" : v;
}

export function SecaoApuracaoIbsCbs({ empresaId, token }: { empresaId: string; token: string }) {
  const [direcao, setDirecao] = useState<"ENTRADA" | "SAIDA">("SAIDA");
  const [itens, setItens] = useState<ItemApuracao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mes, setMes] = useState(mesAtual());
  const [reprocessando, setReprocessando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const { inicio, fim } = limitesDoMes(mes);
      const dados = await listarApuracaoItens(empresaId, direcao, inicio, fim, token);
      setItens(dados);
      setErro(null);
    } catch {
      setErro("Não foi possível carregar a apuração agora.");
    } finally {
      setCarregando(false);
    }
  }, [empresaId, token, mes, direcao]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

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

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Item a item das notas de {direcao === "SAIDA" ? "saída" : "entrada"} autorizadas no mês com a tributação da
        Reforma (IBS/CBS, LC 214/2025) — colunas ficam em branco em notas emitidas sem o grupo{" "}
        <code>gIBSCBS</code> ainda (produção obrigatória a partir de 05/10/2026).{" "}
        {direcao === "SAIDA" && (
          <>
            Linhas com <strong>CFOP divergente</strong> (fora do que as regras fiscais esperam na saída) ficam
            destacadas.
          </>
        )}
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
            <input type="month" value={mes} onChange={(e) => setMes(e.target.value)} className="campo text-sm" style={{ width: "auto" }} />
          </div>
          <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
            {rotuloMes(mes)} · {itens.length === 0 ? "nenhum item nesse mês" : `${itens.length} item(ns)`}
          </span>
        </div>
        <button onClick={() => void handleReprocessar()} disabled={reprocessando} className={CLASSE_BOTAO_LINK} style={{ color: "var(--paper)" }}>
          {reprocessando ? "Reprocessando…" : "Reprocessar itens"}
        </button>
      </div>

      {semGrupoReforma && (
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Nenhum item desse mês tem o grupo da Reforma ainda — normal enquanto a empresa não emite
          com o leiaute novo.
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
        <div className="skeleton h-24 w-full rounded-lg" />
      ) : itens.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhum item em {rotuloMes(mes)}. Se a empresa tem notas de {direcao === "SAIDA" ? "saída" : "entrada"}{" "}
            desse mês e nada aparece aqui, clique em <strong>Reprocessar itens</strong> (histórico anterior a essa
            tela ainda não tem itens extraídos).
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="max-h-[34rem] overflow-auto">
            <table className="w-full min-w-[90rem] text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                  <th className="px-3 py-3 font-medium">nNF</th>
                  <th className="px-3 py-3 font-medium">dhEmi</th>
                  <th className="px-3 py-3 font-medium">nItem</th>
                  <th className="px-3 py-3 font-medium">cProd</th>
                  <th className="px-3 py-3 font-medium">xProd</th>
                  <th className="px-3 py-3 font-medium">NCM</th>
                  <th className="px-3 py-3 font-medium">CFOP</th>
                  <th className="px-3 py-3 font-medium">CST</th>
                  <th className="px-3 py-3 font-medium">cClassTrib</th>
                  <th className="px-3 py-3 font-medium">vBC</th>
                  <th className="px-3 py-3 font-medium">pIBS UF</th>
                  <th className="px-3 py-3 font-medium">vIBS UF</th>
                  <th className="px-3 py-3 font-medium">pIBS Mun</th>
                  <th className="px-3 py-3 font-medium">vIBS Mun</th>
                  <th className="px-3 py-3 font-medium">pCBS</th>
                  <th className="px-3 py-3 font-medium">vCBS</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((i) => (
                  <tr
                    key={i.id}
                    className="border-t align-top"
                    style={{
                      borderColor: "var(--border)",
                      background: i.cfopDivergente ? "rgba(224, 138, 138, 0.1)" : undefined,
                    }}
                    title={i.cfopDivergente ? "CFOP de saída fora do esperado pelas regras fiscais ativas" : undefined}
                  >
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
