import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <header
        className="entra-suave flex items-center justify-between border-b px-6 py-4"
        style={{ borderColor: "var(--border)", paddingRight: "5.5rem" }}
      >
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Fechamento Fiscal Fácil
          </span>
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--muted)" }}
          >
            · CAPTAL
          </span>
        </div>
        <nav className="flex gap-6">
          <Link
            href="/dashboard"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            Empresas
          </Link>
          <Link
            href="/regras-fiscais"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            Regras fiscais
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
