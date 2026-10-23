"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  aplicarCorrecaoEmMassa,
  desativarRegraCorrecao,
  listarCandidatosCorrecao,
  listarRegrasCorrecao,
  type CandidatoCorrecao,
  type RegraCorrecao,
} from "@/lib/api";

const ROTULO_CAMPO: Record<string, string> = {
  CFOP: "CFOP",
  NCM: "NCM",
  CST_ICMS: "CST do ICMS",
  DADOS_DESTINATARIO: "Dados do destinatário",
  DADOS_TRANSPORTE: "Dados de transporte",
  INFORMACOES_COMPLEMENTARES: "Informações complementares",
  OUTRO: "Outro",
};

export default function RegrasCorrecaoPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [regras, setRegras] = useState<RegraCorrecao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [regraExpandida, setRegraExpandida] = useState<string | null>(null);
  const [candidatosPorRegra, setCandidatosPorRegra] = useState<Record<string, CandidatoCorrecao[]>>({});
  const [carregandoCandidatos, setCarregandoCandidatos] = useState<string | null>(null);
  const [aplicandoEmMassa, setAplicandoEmMassa] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const carregar = useCallback(async (t: string) => {
    try {
      setRegras(await listarRegrasCorrecao(t));
      setErro(null);
    } catch {
      setErro("Não foi possível carregar as regras de correção agora.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("afe_token");
    const orgId = localStorage.getItem("afe_organizacao_id");
    if (!t || !orgId) {
      router.push("/login");
      return;
    }
    setToken(t);
    void carregar(t);
  }, [router, carregar]);

  async function handleDesativar(id: string) {
    if (!token) return;
    await desativarRegraCorrecao(id, token);
    await carregar(token);
  }

  async function handleVerCandidatos(regraId: string) {
    if (!token) return;
    if (regraExpandida === regraId) {
      setRegraExpandida(null);
      return;
    }
    setRegraExpandida(regraId);
    if (!candidatosPorRegra[regraId]) {
      setCarregandoCandidatos(regraId);
      try {
        const candidatos = await listarCandidatosCorrecao(regraId, token);
        setCandidatosPorRegra((atual) => ({ ...atual, [regraId]: candidatos }));
      } catch {
        setMensagem("Não foi possível buscar os candidatos agora.");
      } finally {
        setCarregandoCandidatos(null);
      }
    }
  }

  async function handleAplicarEmMassa(regraId: string) {
    if (!token) return;
    const candidatos = candidatosPorRegra[regraId] ?? [];
    if (candidatos.length === 0) return;
    setAplicandoEmMassa(regraId);
    setMensagem(null);
    try {
      const resultado = await aplicarCorrecaoEmMassa(
        regraId,
        candidatos.map((c) => c.documentoFiscalId),
        token
      );
      setMensagem(
        `Aplicado em ${resultado.total} nota(s): ${resultado.sucesso} autorizada(s), ${resultado.falha} com falha.`
      );
      setCandidatosPorRegra((atual) => ({ ...atual, [regraId]: [] }));
    } catch {
      setMensagem("Não foi possível aplicar em massa agora.");
    } finally {
      setAplicandoEmMassa(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="entra">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
          Carta de Correção Eletrônica (CC-e)
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
          Regras de correção aprendidas
        </h1>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
          Cada vez que alguém corrige um produto numa nota (nas telas de Apuração do ICMS/IBS-CBS), o sistema
          aprende o padrão — esse mesmo valor errado, nesse CFOP, nesse produto. A partir daí, qualquer outra nota
          da organização (de qualquer empresa) com o mesmo erro aparece como "correção sugerida" nas telas de
          Apuração, e pode ser corrigida com um clique. Aqui você vê todas as regras aprendidas, quem criou cada
          uma, e pode aplicar em massa ou desativar uma regra que não deveria mais disparar.
        </p>
      </div>

      {mensagem && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {mensagem}
        </p>
      )}
      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && regras.length === 0 && (
        <div className="entra rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhuma regra aprendida ainda — elas são criadas automaticamente na primeira vez que alguém aplica uma
            Carta de Correção numa nota (ver botão "Corrigir" nas telas de Apuração).
          </p>
        </div>
      )}

      {!carregando && regras.length > 0 && (
        <div className="entra overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr
                className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)", background: "var(--surface)" }}
              >
                <th className="px-4 py-3 font-medium">Campo</th>
                <th className="px-4 py-3 font-medium">NCM</th>
                <th className="px-4 py-3 font-medium">Produto</th>
                <th className="px-4 py-3 font-medium">CFOP contexto</th>
                <th className="px-4 py-3 font-medium">Errado → Correto</th>
                <th className="px-4 py-3 font-medium">Criada por</th>
                <th className="px-4 py-3 font-medium">Aplicações</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {regras.map((regra, i) => (
                <Fragment key={regra.id}>
                  <tr
                    className="entra-suave border-t"
                    style={{ borderColor: "var(--border)", animationDelay: `${i * 40}ms`, opacity: regra.ativa ? 1 : 0.45 }}
                  >
                    <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                      {ROTULO_CAMPO[regra.campo] ?? regra.campo}
                      {!regra.permiteCceSeguro && (
                        <span className="ml-2 text-xs" style={{ color: "var(--vermelho, #e08a8a)" }}>
                          ⚠ risco legal
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{regra.ncm ?? "—"}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{regra.descricaoProduto ?? "—"}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{regra.cfopContexto ?? "—"}</td>
                    <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                      {regra.valorErrado} → {regra.valorCorreto}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{regra.criadoPor.nome}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{regra._count.correcoesAplicadas}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => void handleVerCandidatos(regra.id)}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                          style={{ color: "var(--paper)" }}
                        >
                          {regraExpandida === regra.id ? "Ocultar" : "Ver candidatos"}
                        </button>
                        {regra.ativa && (
                          <button
                            onClick={() => void handleDesativar(regra.id)}
                            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                            style={{ color: "var(--muted)" }}
                          >
                            Desativar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {regraExpandida === regra.id && (
                    <tr style={{ borderColor: "var(--border)" }} className="border-t">
                      <td colSpan={8} className="px-4 py-3" style={{ background: "var(--surface)" }}>
                        {carregandoCandidatos === regra.id ? (
                          <p className="text-xs" style={{ color: "var(--muted)" }}>Buscando candidatos…</p>
                        ) : (candidatosPorRegra[regra.id]?.length ?? 0) === 0 ? (
                          <p className="text-xs" style={{ color: "var(--muted)" }}>
                            Nenhuma outra nota com esse mesmo erro no momento.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-xs" style={{ color: "var(--muted)" }}>
                              {candidatosPorRegra[regra.id]!.length} nota(s) com esse mesmo erro:
                            </p>
                            <ul className="space-y-1 text-xs" style={{ color: "var(--muted)" }}>
                              {candidatosPorRegra[regra.id]!.slice(0, 20).map((c) => (
                                <li key={c.documentoFiscalId}>
                                  {c.empresaNome} — <span className="chave-mascarada">{c.chaveAcesso}</span>
                                </li>
                              ))}
                              {candidatosPorRegra[regra.id]!.length > 20 && (
                                <li>… e mais {candidatosPorRegra[regra.id]!.length - 20}</li>
                              )}
                            </ul>
                            <button
                              onClick={() => void handleAplicarEmMassa(regra.id)}
                              disabled={aplicandoEmMassa === regra.id}
                              className="botao-principal"
                              style={{ width: "auto", paddingInline: "1.25rem" }}
                            >
                              {aplicandoEmMassa === regra.id && <span className="spinner" />}
                              {aplicandoEmMassa === regra.id
                                ? "Aplicando…"
                                : `Aplicar em todas (${candidatosPorRegra[regra.id]!.length})`}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
