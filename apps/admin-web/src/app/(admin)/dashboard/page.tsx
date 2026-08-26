"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listarEmpresas, type EmpresaResumo } from "@/lib/api";
import { mascararCnpj } from "@/lib/format";

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
      <div>
        <p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]"
          style={{ color: "var(--paper-mut)" }}
        >
          Carteira de clientes
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
          CNPJs sob gestão
        </h1>
      </div>

      {carregando && (
        <p className="text-sm" style={{ color: "var(--paper-mut)" }}>
          Carregando carteira…
        </p>
      )}

      {erro && (
        <p className="text-sm" style={{ color: "var(--alerta)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && empresas.length === 0 && (
        <div
          className="rounded-lg border border-dashed p-10 text-center"
          style={{ borderColor: "var(--ink-border)" }}
        >
          <p className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Nenhum CNPJ cadastrado ainda
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--paper-mut)" }}>
            Cadastre o primeiro CNPJ da carteira para começar a acompanhar
            documentos fiscais e certificados por aqui.
          </p>
        </div>
      )}

      {empresas.length > 0 && (
        <div
          className="overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--ink-border)" }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr
                className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--paper-mut)", background: "var(--ink-900)" }}
              >
                <th className="px-4 py-3 font-medium">CNPJ</th>
                <th className="px-4 py-3 font-medium">Razão social</th>
                <th className="px-4 py-3 font-medium">UF</th>
                <th className="px-4 py-3 font-medium">Situação</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr
                  key={empresa.id}
                  className="border-t"
                  style={{ borderColor: "var(--ink-border)" }}
                >
                  <td className="chave-mascarada px-4 py-3" style={{ color: "var(--paper)" }}>
                    {mascararCnpj(empresa.cnpj)}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                    {empresa.razaoSocial}
                  </td>
                  <td className="chave-mascarada px-4 py-3" style={{ color: "var(--paper-mut)" }}>
                    {empresa.uf}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`carimbo ${
                        empresa.status === "ATIVA" ? "carimbo--ativa" : "carimbo--inativa"
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
