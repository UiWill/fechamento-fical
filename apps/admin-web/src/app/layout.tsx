import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automação do Fechamento Fiscal",
  description: "Painel de gestão fiscal multi-empresa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
