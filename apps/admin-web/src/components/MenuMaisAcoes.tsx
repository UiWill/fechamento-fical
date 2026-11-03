"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Botão "mais ⋯" com um menu de ações secundárias — pra linhas de tabela
 * com mais botões do que cabe numa largura de tela comum (ex: Agentes
 * Desktop tinha até 6 links de ação por linha, cortando fora da tela em
 * notebook). Renderiza o painel via portal (mesmo motivo do SeletorMes:
 * não fica preso a "overflow" de nenhum ancestral, inclusive quando o
 * botão está dentro de uma tabela com rolagem horizontal).
 */
export function MenuMaisAcoes({ itens }: { itens: { rotulo: string; onClick: () => void; cor?: string }[] }) {
  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    function aoClicarFora(evento: MouseEvent) {
      const alvo = evento.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(alvo) &&
        painelRef.current &&
        !painelRef.current.contains(alvo)
      ) {
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

  function abrir() {
    const retangulo = containerRef.current?.getBoundingClientRect();
    if (retangulo) {
      // Alinhado pela direita do botão — a maioria dos usos fica perto da
      // borda direita da tabela, um menu alinhado à esquerda vazaria da tela.
      setPosicao({ top: retangulo.bottom + 4, left: Math.max(8, retangulo.right - 176) });
    }
    setAberto(true);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => (aberto ? setAberto(false) : abrir())}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: "var(--muted)" }}
      >
        mais ⋯
      </button>

      {aberto &&
        createPortal(
          <div
            ref={painelRef}
            className="entra-suave rounded-lg border p-1.5"
            style={{
              position: "fixed",
              top: posicao.top,
              left: posicao.left,
              zIndex: 50,
              background: "var(--surface)",
              borderColor: "var(--border)",
              minWidth: "11rem",
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            {itens.map((item) => (
              <button
                key={item.rotulo}
                type="button"
                onClick={() => {
                  setAberto(false);
                  item.onClick();
                }}
                className="block w-full rounded px-2.5 py-1.5 text-left text-xs transition-colors hover:opacity-70"
                style={{ color: item.cor ?? "var(--paper)" }}
              >
                {item.rotulo}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
