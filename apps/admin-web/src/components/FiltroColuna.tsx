"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Filtro por coluna, estilo Excel: ícone no cabeçalho abre uma caixinha de
 * texto; o que for digitado filtra a tabela por "contém" (sem diferenciar
 * maiúsculas/minúsculas), ao vivo — sem precisar confirmar. Pedido
 * explícito do cliente em 2026-10-22, comparando com o AutoFiltro do
 * Excel.
 *
 * Fica só a UI do ícone+popover; quem usa isso decide COMO aplicar o
 * filtro (ver aplicarFiltrosColuna, abaixo) — assim qualquer tabela nova
 * reaproveita o mesmo componente e a mesma lógica de filtro.
 */
export function FiltroColuna({
  valor,
  onChange,
}: {
  valor: string;
  onChange: (valor: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ativo = valor.trim().length > 0;

  useEffect(() => {
    if (!aberto) return;
    inputRef.current?.focus();
    function aoClicarFora(evento: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(evento.target as Node)) {
        setAberto(false);
      }
    }
    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAberto(false);
    }
    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoPressionarTecla);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoPressionarTecla);
    };
  }, [aberto]);

  return (
    <span ref={containerRef} className="relative inline-block" style={{ marginLeft: "0.25rem" }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setAberto((a) => !a);
        }}
        title="Filtrar essa coluna"
        style={{
          color: ativo ? "var(--paper)" : "var(--muted)",
          opacity: ativo ? 1 : 0.5,
          cursor: "pointer",
          verticalAlign: "middle",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4h18l-7 9v6l-4 2v-8z" />
        </svg>
      </button>
      {aberto && (
        <span
          className="entra-suave absolute left-0 top-full z-30 mt-1 flex items-center gap-1 rounded border p-1"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            type="text"
            value={valor}
            onChange={(e) => onChange(e.target.value)}
            placeholder="contém…"
            className="campo"
            style={{ width: "7rem", fontSize: "0.75rem", padding: "0.25rem 0.4rem", textTransform: "none" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") setAberto(false);
            }}
          />
          {ativo && (
            <button
              type="button"
              onClick={() => onChange("")}
              title="Limpar"
              style={{ color: "var(--muted)", fontSize: "0.75rem", padding: "0 0.2rem" }}
            >
              ×
            </button>
          )}
        </span>
      )}
    </span>
  );
}

/** Aplica um mapa {campo: texto} sobre uma lista de objetos — "contém" (case-insensitive) em cada campo preenchido, E entre colunas diferentes. */
export function aplicarFiltrosColuna<T extends object>(itens: T[], filtros: Record<string, string>): T[] {
  const entradas = Object.entries(filtros).filter(([, v]) => v.trim().length > 0);
  if (entradas.length === 0) return itens;
  return itens.filter((item) =>
    entradas.every(([campo, valor]) => {
      const bruto = (item as Record<string, unknown>)[campo];
      const texto = Array.isArray(bruto) ? bruto.join(" ") : String(bruto ?? "");
      return texto.toLowerCase().includes(valor.trim().toLowerCase());
    })
  );
}
