"use client";

import type { CampoCorrecao } from "@/lib/api";

const ROTULO_CAMPO: Record<string, string> = {
  CFOP: "CFOP",
  NCM: "NCM",
  CST_ICMS: "CST do ICMS",
};

export interface LinhaConfirmacaoSugestao {
  id: string;
  nNF: number;
  xProd: string;
  campo: CampoCorrecao;
  valorErrado: string;
  valorCorreto: string;
}

/**
 * Lista exatamente o que vai ser enviado pra SEFAZ antes de disparar —
 * tanto pra aplicar 1 sugestão quanto pra aplicar várias de uma vez.
 * Pedido explícito do usuário em 2026-10-23: antes de confirmar, mostrar
 * nota + produto + o que vai ser corrigido (CC-e é um registro definitivo
 * na SEFAZ, não dá pra desfazer).
 */
export function ModalConfirmarSugestoes({
  itens,
  aplicando,
  onCancelar,
  onConfirmar,
}: {
  itens: LinhaConfirmacaoSugestao[];
  aplicando: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !aplicando) onCancelar();
      }}
    >
      <div
        className="entra w-full max-w-[36rem] space-y-4 rounded-lg border p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          Confirmar envio de Carta de Correção
        </p>
        <p className="text-sm" style={{ color: "var(--paper)" }}>
          {itens.length === 1
            ? "Essa correção vai ser enviada pra SEFAZ:"
            : `Essas ${itens.length} correções vão ser enviadas pra SEFAZ, uma por nota:`}
        </p>

        <div className="max-h-[22rem] overflow-y-auto rounded-md border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0" style={{ background: "var(--surface)" }}>
              <tr className="font-mono uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                <th className="px-3 py-2 font-medium">Nota</th>
                <th className="px-3 py-2 font-medium">Produto</th>
                <th className="px-3 py-2 font-medium">Correção</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="whitespace-nowrap px-3 py-2" style={{ color: "var(--muted)" }}>{item.nNF}</td>
                  <td className="px-3 py-2" style={{ color: "var(--paper)" }}>{item.xProd}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }}>
                    {ROTULO_CAMPO[item.campo] ?? item.campo}: {item.valorErrado} →{" "}
                    <strong style={{ color: "var(--paper)" }}>{item.valorCorreto}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Depois de autorizada pela SEFAZ, a Carta de Correção não pode ser desfeita.
        </p>

        <div className="flex gap-3">
          <button onClick={onConfirmar} disabled={aplicando} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
            {aplicando && <span className="spinner" />}
            {aplicando ? "Enviando…" : itens.length === 1 ? "Confirmar e enviar" : `Confirmar e enviar (${itens.length})`}
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
