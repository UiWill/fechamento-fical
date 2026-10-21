/**
 * Indicador de carregamento padrão pras tabelas do sistema — spinner +
 * texto explícito, em vez de só um retângulo cinza piscando (skeleton),
 * que o usuário podia confundir com "tela travada/quebrada" em vez de
 * "buscando dados" (pedido explícito do cliente em 2026-10-21: deixar
 * claro que está buscando).
 */
export function CarregandoTabela({ texto = "Buscando dados…" }: { texto?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 rounded-lg border border-dashed p-10"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="spinner" style={{ color: "var(--paper)" }} />
      <span className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
        {texto}
      </span>
    </div>
  );
}

/**
 * Botão "carregar mais" pra tabelas grandes (algumas empresas passam de 15
 * mil itens/mês) — renderizar tudo de uma vez deixa a página pesada e lenta
 * pra rolar. Mostra só um lote por vez; exportação (CSV/Excel) continua
 * usando a lista completa, só a tabela na tela é que pagina.
 */
export function BotaoCarregarMais({
  totalItens,
  itensExibidos,
  onCarregarMais,
}: {
  totalItens: number;
  itensExibidos: number;
  onCarregarMais: () => void;
}) {
  if (itensExibidos >= totalItens) return null;
  return (
    <div className="flex items-center justify-center border-t p-3" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={onCarregarMais}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: "var(--paper)" }}
      >
        Carregar mais ({itensExibidos} de {totalItens})
      </button>
    </div>
  );
}
