"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listarEmpresas, ativarEmpresa, desativarEmpresa, excluirEmpresa, type EmpresaResumo } from "@/lib/api";
import { mascararCnpj } from "@/lib/format";
import { PainelSaude } from "@/components/PainelSaude";

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
          <td className="px-4 py-3" />
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
  const [sessao, setSessao] = useState<{ token: string; organizacaoId: string } | null>(null);
  // Tirar/trazer de volta uma empresa da conta sem apagar nada (status
  // ATIVA/INATIVA já existia no banco, só não tinha botão nenhum na tela
  // ainda) — pedido do cliente em 2026-11-06, pra remover empresa de
  // teste que não devia estar listada.
  const [alterandoId, setAlterandoId] = useState<string | null>(null);
  // Apaga de vez — só pra empresa sem nenhum histórico fiscal registrado
  // (backend bloqueia com mensagem explicando, se tiver). Pedido do
  // cliente em 2026-11-06: "tem que ter como excluir, tem que dar pra
  // deixar inativa, trazer de volta OU excluir".
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  // Escondidas por padrão — mesmo padrão já usado em Agentes Desktop
  // ("mostrar ocultados"). Pedido do cliente em 2026-11-06: empresa
  // desativada não devia aparecer misturada com as empresas de verdade.
  const [mostrarInativas, setMostrarInativas] = useState(false);
  const empresasExibidas = mostrarInativas ? empresas : empresas.filter((e) => e.status === "ATIVA");
  const quantidadeInativas = empresas.filter((e) => e.status === "INATIVA").length;

  useEffect(() => {
    const token = localStorage.getItem("afe_token");
    const organizacaoId = localStorage.getItem("afe_organizacao_id");

    if (!token || !organizacaoId) {
      router.push("/login");
      return;
    }
    setSessao({ token, organizacaoId });

    listarEmpresas(organizacaoId, token)
      .then(setEmpresas)
      .catch(() => setErro("Não foi possível carregar os CNPJs agora. Tente atualizar a página."))
      .finally(() => setCarregando(false));
  }, [router]);

  async function handleAlternarStatus(event: React.MouseEvent, empresa: EmpresaResumo) {
    event.stopPropagation();
    if (!sessao) return;
    if (empresa.status === "ATIVA") {
      const confirmado = window.confirm(
        `Tirar "${empresa.razaoSocial}" da conta? Ela some da listagem ativa, mas nada é apagado — dá pra trazer de volta depois.`
      );
      if (!confirmado) return;
    }
    setAlterandoId(empresa.id);
    try {
      const atualizada =
        empresa.status === "ATIVA"
          ? await desativarEmpresa(empresa.id, sessao.token)
          : await ativarEmpresa(empresa.id, sessao.token);
      setEmpresas((atual) =>
        atual.map((e) => (e.id === empresa.id ? { ...e, status: atualizada.status } : e))
      );
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível alterar essa empresa agora.");
    } finally {
      setAlterandoId(null);
    }
  }

  async function handleExcluir(event: React.MouseEvent, empresa: EmpresaResumo) {
    event.stopPropagation();
    if (!sessao) return;
    const confirmado = window.confirm(
      `Excluir "${empresa.razaoSocial}" de vez? Isso não pode ser desfeito. Se ela tiver qualquer documento fiscal ou certificado registrado, o sistema bloqueia e avisa — use "Tirar da conta" nesse caso.`
    );
    if (!confirmado) return;
    setExcluindoId(empresa.id);
    setErro(null);
    try {
      await excluirEmpresa(empresa.id, sessao.token);
      setEmpresas((atual) => atual.filter((e) => e.id !== empresa.id));
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível excluir essa empresa agora.");
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <div className="space-y-6">
      {sessao && <PainelSaude organizacaoId={sessao.organizacaoId} token={sessao.token} />}

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
        <div className="flex items-center gap-4">
          {quantidadeInativas > 0 && (
            <button
              onClick={() => setMostrarInativas((m) => !m)}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              {mostrarInativas ? "ocultar inativas" : `mostrar inativas (${quantidadeInativas})`}
            </button>
          )}
          <Link
            href="/empresas/nova"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
            style={{ color: "var(--paper)" }}
          >
            + Nova empresa
          </Link>
        </div>
      </div>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && empresas.length > 0 && empresasExibidas.length === 0 && (
        <div
          className="entra rounded-lg border border-dashed p-10 text-center"
          style={{ borderColor: "var(--border)", animationDelay: "80ms" }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Todas as {quantidadeInativas} empresa(s) dessa conta estão inativas.{" "}
            <button
              onClick={() => setMostrarInativas(true)}
              className="underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--paper)" }}
            >
              Mostrar inativas
            </button>
          </p>
        </div>
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

      {(carregando || empresasExibidas.length > 0) && !erro && (
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
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando && <LinhasEsqueleto />}
              {!carregando &&
                empresasExibidas.map((empresa, i) => (
                  <tr
                    key={empresa.id}
                    onClick={() => router.push(`/empresas/${empresa.id}`)}
                    className="entra-suave cursor-pointer border-t transition-colors hover:bg-[var(--surface)]"
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(event) => void handleAlternarStatus(event, empresa)}
                          disabled={alterandoId === empresa.id}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-40"
                          style={{ color: "var(--muted)" }}
                        >
                          {alterandoId === empresa.id && <span className="spinner" />}
                          {alterandoId === empresa.id
                            ? "Alterando…"
                            : empresa.status === "ATIVA"
                              ? "Tirar da conta"
                              : "Trazer de volta"}
                        </button>
                        <button
                          onClick={(event) => void handleExcluir(event, empresa)}
                          disabled={excluindoId === empresa.id}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-40"
                          style={{ color: "var(--vermelho, #e08a8a)" }}
                          title="Só funciona se a empresa não tiver nenhum documento fiscal/certificado registrado"
                        >
                          {excluindoId === empresa.id && <span className="spinner" />}
                          {excluindoId === empresa.id ? "Excluindo…" : "Excluir"}
                        </button>
                      </div>
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
