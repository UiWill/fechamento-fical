"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "?" clicável pra linhas com pendência nas telas de Apuração — pedido
 * explícito do usuário em 2026-10-30: a cor da linha + o title (só no
 * hover) já avisavam que tinha algo errado, mas pra saber exatamente QUAL
 * valor não batia era preciso ficar lendo a linha toda, célula por célula.
 * Esse botão abre uma caixinha compacta listando campo a campo o que era
 * esperado e o que veio no XML — sem adicionar coluna nem poluir a tabela
 * (mesmo padrão de popover do FiltroColuna.tsx).
 */
export function PendenciaInfo({
  detalhes,
}: {
  detalhes: { campo: string; esperado: string; atual: string }[];
}) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!aberto) return;
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

  if (detalhes.length === 0) return null;

  return (
    <span ref={containerRef} className="relative inline-block" style={{ marginLeft: "0.35rem" }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setAberto((a) => !a);
        }}
        title="Ver exatamente o que está errado nessa linha"
        className="inline-flex items-center justify-center rounded-full font-mono font-bold"
        style={{
          width: "1.1rem",
          height: "1.1rem",
          fontSize: "0.625rem",
          color: "var(--paper)",
          background: "rgba(224, 90, 90, 0.55)",
          cursor: "pointer",
        }}
      >
        ?
      </button>
      {aberto && (
        <div
          className="entra-suave absolute left-0 top-full z-30 mt-1 space-y-1.5 rounded border p-2.5"
          style={{ background: "var(--surface)", borderColor: "var(--border)", width: "20rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--muted)" }}
          >
            O que está errado
          </p>
          <ul className="space-y-1.5">
            {detalhes.map((d, i) => (
              <li key={i} className="text-xs" style={{ color: "var(--paper)" }}>
                <strong>{d.campo}</strong>
                <br />
                <span style={{ color: "var(--muted)" }}>esperado:</span> {d.esperado}
                <br />
                <span style={{ color: "var(--muted)" }}>veio no XML:</span> {d.atual}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
}
