"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listarEmpresas, type EmpresaResumo } from "@/lib/api";

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
      .catch(() => setErro("Não foi possível carregar as empresas."))
      .finally(() => setCarregando(false));
  }, [router]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">CNPJs cadastrados</h1>

      {carregando && <p className="text-sm text-slate-500">Carregando...</p>}
      {erro && <p className="text-sm text-red-600">{erro}</p>}

      {!carregando && !erro && empresas.length === 0 && (
        <p className="text-sm text-slate-500">
          Nenhuma empresa cadastrada ainda para esta organização.
        </p>
      )}

      {empresas.length > 0 && (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-2">CNPJ</th>
              <th className="py-2">Razão social</th>
              <th className="py-2">UF</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id} className="border-b border-slate-100 dark:border-slate-900">
                <td className="py-2">{empresa.cnpj}</td>
                <td className="py-2">{empresa.razaoSocial}</td>
                <td className="py-2">{empresa.uf}</td>
                <td className="py-2">{empresa.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
