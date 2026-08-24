export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <span className="font-semibold">Automação do Fechamento Fiscal</span>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
