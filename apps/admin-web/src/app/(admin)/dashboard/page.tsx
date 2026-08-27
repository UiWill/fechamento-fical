"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listarEmpresas, type EmpresaResumo } from "@/lib/api";
import { mascararCnpj } from "@/lib/format";

function LinhasEsqueleto() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
          <td className="px-4 py-3">
            <div className="skeleton h-4 w-36" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-4 w-48" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-4 w-8" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-5 w-16 rounded-full" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [empresas, setEmpresas] = useState<EmpresaResumo[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("afe_token");
    const organizacaoId = localStorage.getItem("afe_organizacao_id");

    if (!token || !organizacaoId) {
      router.push("/login");
      return;
    }

    listarEmpresas(organizacaoId, token)
      .then(setEmpresas)
      .catch(() => setErro("Não foi possível carregar os CNPJs agora. Tente atualizar a página."))
      .finally(() => setCarregando(false));
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="entra flex items-end justify-between">
        <div>
          <p
            className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--muted)" }}
          >
            Carteira de clientes
          </p>
          <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
            CNPJs sob gestão
          </h1>
        </div>
        <Link
          href="/empresas/nova"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
          style={{ color: "var(--paper)" }}
        >
          + Nova empresa
        </Link>
      </div>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && empresas.length === 0 && (
        <div
          className="entra rounded-lg border border-dashed p-10 text-center"
          style={{ borderColor: "var(--border)", animationDelay: "80ms" }}
        >
          <p className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Nenhum CNPJ cadastrado ainda
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            Cadastre o primeiro CNPJ da carteira para começar a acompanhar
            documentos fiscais e certificados por aqui.
          </p>
          <Link
            href="/empresas/nova"
            className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "var(--paper)" }}
          >
            Cadastrar CNPJ
          </Link>
        </div>
      )}

      {(carregando || empresas.length > 0) && !erro && (
        <div
          className="entra overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--border)", animationDelay: "80ms" }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr
                className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)", background: "var(--surface)" }}
              >
                <th className="px-4 py-3 font-medium">CNPJ</th>
                <th className="px-4 py-3 font-medium">Razão social</th>
                <th className="px-4 py-3 font-medium">UF</th>
                <th className="px-4 py-3 font-medium">Situação</th>
              </tr>
            </thead>
            <tbody>
              {carregando && <LinhasEsqueleto />}
              {!carregando &&
                empresas.map((empresa, i) => (
                  <tr
                    key={empresa.id}
                    className="entra-suave border-t"
                    style={{ borderColor: "var(--border)", animationDelay: `${i * 45}ms` }}
                  >
                    <td className="chave-mascarada px-4 py-3" style={{ color: "var(--paper)" }}>
                      {mascararCnpj(empresa.cnpj)}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                      {empresa.razaoSocial}
                    </td>
                    <td className="chave-mascarada px-4 py-3" style={{ color: "var(--muted)" }}>
                      {empresa.uf}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`selo ${
                          empresa.status === "ATIVA" ? "selo--ativa" : "selo--inativa"
                        }`}
                      >
                        {empresa.status === "ATIVA" ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
