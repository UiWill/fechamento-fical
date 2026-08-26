export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--ink-950)" }}>
      <header
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ borderColor: "var(--ink-border)" }}
      >
        <div className="flex items-baseline gap-2">
          <span
            className="font-display text-lg italic"
            style={{ color: "var(--paper)" }}
          >
            Fechamento Fiscal
          </span>
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--paper-mut)" }}
          >
            · CAPTAL
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
