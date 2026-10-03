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

export function SecaoApuracaoIcms({ empresaId, token }: { empresaId: string; token: string }) {
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
      const dados = await listarApuracaoItens(empresaId, inicio, fim, token);
      setItens(dados);
      setErro(null);
    } catch {
      setErro("Não foi possível carregar a apuração agora.");
    } finally {
      setCarregando(false);
    }
  }, [empresaId, token, mes]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function handleReprocessar() {
    setReprocessando(true);
    setMensagem(null);
    try {
      const resultado = await reprocessarItensDocumentoFiscal(empresaId, token);
      setMensagem(
        resultado.total === 0
          ? "Nenhuma nota de saída sem itens pra reprocessar."
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

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Item a item das notas de saída autorizadas no mês — produto, NCM, CFOP e a tributação de
        ICMS/IPI/PIS/COFINS de cada linha, direto do XML. Linhas com <strong>CFOP divergente</strong> (fora
        do que as regras fiscais esperam na saída) ficam destacadas.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
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
            Nenhum item em {rotuloMes(mes)}. Se a empresa tem notas de saída desse mês e nada aparece aqui,
            clique em <strong>Reprocessar itens</strong> (histórico anterior a essa tela ainda não tem itens extraídos).
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="max-h-[34rem] overflow-auto">
            <table className="w-full min-w-[110rem] text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                  <th className="px-3 py-3 font-medium">nNF</th>
                  <th className="px-3 py-3 font-medium">dhEmi</th>
                  <th className="px-3 py-3 font-medium">nItem</th>
                  <th className="px-3 py-3 font-medium">cProd</th>
                  <th className="px-3 py-3 font-medium">xProd</th>
                  <th className="px-3 py-3 font-medium">NCM</th>
                  <th className="px-3 py-3 font-medium">CFOP</th>
                  <th className="px-3 py-3 font-medium">CST ICMS</th>
                  <th className="px-3 py-3 font-medium">vBC</th>
                  <th className="px-3 py-3 font-medium">pICMS</th>
                  <th className="px-3 py-3 font-medium">vICMS</th>
                  <th className="px-3 py-3 font-medium">CST IPI</th>
                  <th className="px-3 py-3 font-medium">vBC</th>
                  <th className="px-3 py-3 font-medium">pIPI</th>
                  <th className="px-3 py-3 font-medium">vIPI</th>
                  <th className="px-3 py-3 font-medium">CST PIS</th>
                  <th className="px-3 py-3 font-medium">vBC</th>
                  <th className="px-3 py-3 font-medium">pPIS</th>
                  <th className="px-3 py-3 font-medium">vPIS</th>
                  <th className="px-3 py-3 font-medium">CST COFINS</th>
                  <th className="px-3 py-3 font-medium">vBC</th>
                  <th className="px-3 py-3 font-medium">pCOFINS</th>
                  <th className="px-3 py-3 font-medium">vCOFINS</th>
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
