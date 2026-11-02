"use client";

import type { PreviewClassificacaoItem } from "@/lib/api";

/**
 * Lista exatamente o que "Classificar pendentes" vai aplicar antes de
 * confirmar — pedido do cliente em 2026-11-02: "quando clicar aparecer o
 * que vai aplicar explicando". Mesmo padrão do ModalConfirmarSugestoes
 * (CC-e), adaptado pra classificação de acumulador/observação.
 */
export function ModalConfirmarClassificacao({
  itens,
  mesRotulo,
  aplicando,
  onCancelar,
  onConfirmar,
}: {
  itens: PreviewClassificacaoItem[];
  mesRotulo: string;
  aplicando: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}) {
  const comRegra = itens.filter((i) => i.regra !== null);
  const semRegra = itens.filter((i) => i.regra === null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !aplicando) onCancelar();
      }}
    >
      <div
        className="entra w-full max-w-[40rem] space-y-4 rounded-lg border p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          Confirmar classificação — {mesRotulo}
        </p>

        {itens.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--paper)" }}>
            Nenhuma nota pendente de classificação nesse mês.
          </p>
        ) : (
          <>
            <p className="text-sm" style={{ color: "var(--paper)" }}>
              {comRegra.length === 0
                ? "Nenhuma das notas pendentes desse mês tem regra cadastrada ainda."
                : `${comRegra.length} nota(s) vão receber acumulador/observação pela Regra Fiscal correspondente:`}
            </p>

            {comRegra.length > 0 && (
              <div className="max-h-[18rem] overflow-y-auto rounded-md border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0" style={{ background: "var(--surface)" }}>
                    <tr className="font-mono uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                      <th className="px-3 py-2 font-medium">Direção</th>
                      <th className="px-3 py-2 font-medium">CFOP</th>
                      <th className="px-3 py-2 font-medium">Emitente</th>
                      <th className="px-3 py-2 font-medium">Vai aplicar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comRegra.map((item) => (
                      <tr key={item.documentoId} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="whitespace-nowrap px-3 py-2" style={{ color: "var(--muted)" }}>
                          {item.direcao === "ENTRADA" ? "Entrada" : "Saída"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2" style={{ color: "var(--muted)" }}>{item.cfop}</td>
                        <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{item.nomeEmitente ?? "—"}</td>
                        <td className="px-3 py-2" style={{ color: "var(--paper)" }}>
                          {item.regra!.observacao ?? item.regra!.acumulador ?? item.regra!.descricao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {semRegra.length > 0 && (
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {semRegra.length} nota(s) desse mês não têm regra cadastrada pro CFOP delas e vão
                continuar pendentes (CFOPs: {[...new Set(semRegra.map((i) => i.cfop))].join(", ")}).
              </p>
            )}
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={onConfirmar}
            disabled={aplicando || comRegra.length === 0}
            className="botao-principal disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ width: "auto", paddingInline: "1.25rem" }}
          >
            {aplicando && <span className="spinner" />}
            {aplicando ? "Aplicando…" : comRegra.length === 0 ? "Nada pra aplicar" : `Confirmar e aplicar (${comRegra.length})`}
          </button>
          <button
            type="button"
            onClick={onCancelar}
            disabled={aplicando}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--muted)" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
