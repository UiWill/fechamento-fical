"use client";

import { useEffect, useState } from "react";

function IconeSol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function IconeLua() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 1 0 20.354 15.354Z" />
    </svg>
  );
}

/**
 * Alternador de tema claro/escuro. Escuro é o padrão do produto — a
 * escolha manual fica salva em localStorage e é aplicada antes da
 * primeira pintura por um script inline no <head> (ver layout.tsx), pra
 * não piscar o tema errado no carregamento.
 */
export function ThemeToggle() {
  const [tema, setTema] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const atual = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTema(atual);
  }, []);

  function alternar() {
    const novo = tema === "dark" ? "light" : "dark";
    setTema(novo);
    document.documentElement.dataset.theme = novo;
    localStorage.setItem("afe_tema", novo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className="tema-toggle"
      data-ativo={tema}
      aria-label={tema === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      <span className="tema-toggle-thumb">{tema === "dark" ? <IconeLua /> : <IconeSol />}</span>
    </button>
  );
}
