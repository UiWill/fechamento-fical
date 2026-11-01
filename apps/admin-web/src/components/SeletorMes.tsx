"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { rotuloMes } from "@/lib/format";

const MESES_ABREVIADOS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

/**
 * Seletor de mês próprio (clicável, visual) — substitui o <input
 * type="month"> nativo do navegador em todos os filtros de mês do sistema.
 * Motivo: o controle nativo varia de aparência entre versões do Chrome (uma
 * versão antiga só aceita digitar "AAAA-MM" dígito por dígito, sem opção de
 * clicar num calendário) — isso já confundiu usuários achando que uma tela
 * estava "diferente" ou "desatualizada" quando era só o navegador (achado
 * em 2026-10-21). Esse componente fica igual pra todo mundo, em qualquer
 * navegador.
 *
 * Mesma interface value/onChange de um <input> controlado — value é sempre
 * "AAAA-MM" e onChange já dispara a troca de mês (a tela que usa isso só
 * precisa trocar o <input type="month"> por <SeletorMes>, sem mexer no
 * resto da lógica de carregamento).
 */
export function SeletorMes({
  value,
  onChange,
  className,
  style,
}: {
  value: string;
  onChange: (valor: string) => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [aberto, setAberto] = useState(false);
  const [anoExibido, setAnoExibido] = useState(() =>
    Number(value.split("-")[0]),
  );
  const [posicao, setPosicao] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  const [anoSelecionado, mesSelecionado] = value.split("-").map(Number);

  useEffect(() => {
    if (!aberto) return;
    function aoClicarFora(evento: MouseEvent) {
      const alvo = evento.target as Node;
      // O painel é renderizado via portal (direto em document.body) pra não
      // ficar cortado por algum ancestral com "overflow: hidden/auto" (ex:
      // o box com cantos arredondados do cabeçalho da lista) — por isso
      // "dentro" aqui significa dentro do botão OU do painel, nunca só do
      // container (achado em 2026-11-01: calendário cortava no meio e os
      // meses de baixo nem recebiam o clique, reportado pelo William).
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
    // Fecha ao rolar a página em vez de recalcular a posição — a lista
    // embaixo já tem scroll próprio, então é raro precisar do calendário
    // aberto durante uma rolagem.
    function aoRolar() {
      setAberto(false);
    }
    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoPressionarTecla);
    window.addEventListener("scroll", aoRolar, true);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoPressionarTecla);
      window.removeEventListener("scroll", aoRolar, true);
    };
  }, [aberto]);

  function abrir() {
    const retangulo = containerRef.current?.getBoundingClientRect();
    if (retangulo) {
      setPosicao({ top: retangulo.bottom + 4, left: retangulo.left });
    }
    setAnoExibido(anoSelecionado);
    setAberto(true);
  }

  function escolherMes(indiceMes: number) {
    onChange(`${anoExibido}-${String(indiceMes + 1).padStart(2, "0")}`);
    setAberto(false);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => (aberto ? setAberto(false) : abrir())}
        className={className ?? "campo text-sm"}
        style={{
          width: "auto",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          ...style,
        }}
      >
        <span className="capitalize">{rotuloMes(value)}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: 0.6, flexShrink: 0 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18M8 2v4M16 2v4" />
        </svg>
      </button>

      {aberto &&
        createPortal(
          <div
            ref={painelRef}
            className="entra-suave rounded-lg border p-3"
            style={{
              position: "fixed",
              top: posicao.top,
              left: posicao.left,
              zIndex: 50,
              background: "var(--surface)",
              borderColor: "var(--border)",
              minWidth: "16rem",
            }}
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAnoExibido((a) => a - 1)}
                className="px-2 py-1 font-mono text-sm"
                style={{ color: "var(--muted)" }}
                aria-label="Ano anterior"
              >
                ‹
              </button>
              <span
                className="font-mono text-sm"
                style={{ color: "var(--paper)" }}
              >
                {anoExibido}
              </span>
              <button
                type="button"
                onClick={() => setAnoExibido((a) => a + 1)}
                className="px-2 py-1 font-mono text-sm"
                style={{ color: "var(--muted)" }}
                aria-label="Próximo ano"
              >
                ›
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {MESES_ABREVIADOS.map((rotulo, indice) => {
                const selecionado =
                  anoExibido === anoSelecionado &&
                  indice + 1 === mesSelecionado;
                return (
                  <button
                    key={rotulo}
                    type="button"
                    onClick={() => escolherMes(indice)}
                    className="rounded px-2 py-1.5 text-xs capitalize transition-colors"
                    style={{
                      background: selecionado ? "var(--paper)" : "transparent",
                      color: selecionado ? "var(--surface)" : "var(--paper)",
                    }}
                  >
                    {rotulo}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
