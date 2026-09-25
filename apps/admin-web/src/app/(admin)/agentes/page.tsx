"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  API_URL,
  listarEmpresas,
  listarAgentes,
  gerarTokenAgente,
  revogarTokenAgente,
  excluirTokenAgente,
  buscarAtividadeAgente,
  type AtividadeAgente,
  type EmpresaResumo,
  type AgenteInstalacao,
} from "@/lib/api";
import { mascararCnpj, formatarDataHora, numeroNotaDaChave } from "@/lib/format";

const MINUTOS_PARA_CONSIDERAR_ATRASADO = 10;

function estaAtrasado(agente: AgenteInstalacao): boolean {
  if (!agente.ultimoHeartbeatEm) return true;
  const minutosDesdeUltimoSinal = (Date.now() - new Date(agente.ultimoHeartbeatEm).getTime()) / 60_000;
  return minutosDesdeUltimoSinal > MINUTOS_PARA_CONSIDERAR_ATRASADO;
}

function ModalNovoToken({
  empresas,
  organizacaoId,
  token,
  onFechar,
  onCriado,
}: {
  empresas: EmpresaResumo[];
  organizacaoId: string;
  token: string;
  onFechar: () => void;
  onCriado: () => void;
}) {
  const [nome, setNome] = useState("");
  const [escopo, setEscopo] = useState<"organizacao" | "empresa">("organizacao");
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id ?? "");
  const [anydeskId, setAnydeskId] = useState("");
  const [nomeContato, setNomeContato] = useState("");
  const [telefoneContato, setTelefoneContato] = useState("");
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [tokenGerado, setTokenGerado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function handleGerar(event: React.FormEvent) {
    event.preventDefault();
    if (!nome.trim()) {
      setErro("Dê um nome pra identificar essa instalação (ex: PC do escritório).");
      return;
    }
    setGerando(true);
    setErro(null);
    try {
      const resultado = await gerarTokenAgente(
        {
          nome: nome.trim(),
          organizacaoId: escopo === "organizacao" ? organizacaoId : undefined,
          empresaId: escopo === "empresa" ? empresaId : undefined,
          anydeskId: anydeskId.trim() || undefined,
          nomeContato: nomeContato.trim() || undefined,
          telefoneContato: telefoneContato.trim() || undefined,
        },
        token
      );
      setTokenGerado(resultado.tokenRaw);
      onCriado();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível gerar o token agora.");
    } finally {
      setGerando(false);
    }
  }

  function handleCopiar() {
    if (!tokenGerado) return;
    navigator.clipboard.writeText(tokenGerado).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !gerando) onFechar();
      }}
    >
      <div
        className="entra w-full max-w-[26rem] space-y-4 rounded-lg border p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        {tokenGerado ? (
          <>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
              Token gerado
            </p>
            <p className="text-sm" style={{ color: "var(--paper)" }}>
              Copie e cole esse código na configuração do agente desktop agora
              — <strong>ele não será mostrado de novo.</strong>
            </p>
            <div
              className="chave-mascarada break-all rounded-md border p-3 font-mono text-xs"
              style={{ borderColor: "var(--border)", color: "var(--paper)" }}
            >
              {tokenGerado}
            </div>
            <div className="flex gap-3">
              <button onClick={handleCopiar} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={onFechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)" }}
              >
                Fechar
              </button>
            </div>
            <hr style={{ borderColor: "var(--border)" }} />
            <p className="text-sm" style={{ color: "var(--paper)" }}>
              Envie esse link pro cliente instalar o programa — o mesmo link
              serve pra qualquer cliente, o token acima é colado depois, na
              configuração inicial do programa:
            </p>
            <a
              href={`${API_URL}/agente-ingestao/instalador`}
              className="botao-principal inline-block text-center"
              style={{ width: "auto", paddingInline: "1.25rem", textDecoration: "none" }}
            >
              Baixar instalador (.exe)
            </a>
          </>
        ) : (
          <form onSubmit={handleGerar} className="space-y-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
              Gerar token de instalação
            </p>

            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                Nome (pra identificar depois)
              </label>
              <input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Ex: PC do escritório"
                className="campo text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                Escopo
              </label>
              <select value={escopo} onChange={(event) => setEscopo(event.target.value as "organizacao" | "empresa")} className="campo text-sm">
                <option value="organizacao">Toda a carteira (contador — todos os CNPJs)</option>
                <option value="empresa">Um CNPJ específico</option>
              </select>
            </div>

            {escopo === "empresa" && (
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Empresa
                </label>
                <select value={empresaId} onChange={(event) => setEmpresaId(event.target.value)} className="campo text-sm">
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.razaoSocial} — {mascararCnpj(empresa.cnpj)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
              Contato dessa instalação (opcional — pra saber quem chamar se o agente parar)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Nome
                </label>
                <input
                  value={nomeContato}
                  onChange={(event) => setNomeContato(event.target.value)}
                  placeholder="Quem cuida desse PC"
                  className="campo text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Telefone
                </label>
                <input
                  value={telefoneContato}
                  onChange={(event) => setTelefoneContato(event.target.value)}
                  placeholder="(00) 00000-0000"
                  className="campo text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                ID do AnyDesk
              </label>
              <input
                value={anydeskId}
                onChange={(event) => setAnydeskId(event.target.value)}
                placeholder="Ex: 123 456 789"
                className="campo text-sm"
              />
            </div>

            {erro && (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                {erro}
              </p>
            )}

            <div className="flex gap-3">
              <button type="submit" disabled={gerando} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {gerando && <span className="spinner" />}
                {gerando ? "Gerando" : "Gerar token"}
              </button>
              <button
                type="button"
                onClick={onFechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]"
                style={{ color: "var(--muted)" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const ROTULO_TIPO: Record<string, string> = { NFE: "NF-e", NFCE: "NFC-e", CTE: "CT-e" };
const ROTULO_STATUS_RECUSA: Record<string, string> = {
  CNPJ_NAO_AUTORIZADO: "CNPJ não autorizado",
  INVALIDO: "Inválida",
  IGNORADO: "Não é nota fiscal",
};

function haTempo(iso: string | null): string {
  if (!iso) return "nunca";
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 10) return "agora mesmo";
  if (s < 60) return `há ${s} s`;
  if (s < 3600) return `há ${Math.round(s / 60)} min`;
  if (s < 86400) return `há ${Math.round(s / 3600)} h`;
  return formatarDataHora(iso);
}

function ModalAtividade({ agenteId, nome, token, onFechar }: { agenteId: string; nome: string; token: string; onFechar: () => void }) {
  const [dados, setDados] = useState<AtividadeAgente | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [, forcar] = useState(0);

  useEffect(() => {
    let cancelado = false;
    const buscar = () =>
      buscarAtividadeAgente(agenteId, token)
        .then((d) => {
          if (!cancelado) {
            setDados(d);
            setErro(null);
          }
        })
        .catch(() => !cancelado && setErro("Não foi possível carregar a atividade agora."));
    void buscar();
    const a = setInterval(() => void buscar(), 15_000);
    const b = setInterval(() => forcar((n) => n + 1), 5_000); // mantém os "há X min" vivos
    return () => {
      cancelado = true;
      clearInterval(a);
      clearInterval(b);
    };
  }, [agenteId, token]);

  const t = dados?.agente.telemetria ?? null;
  const recebendoAgora = dados?.servidor.ultimaNotaEm
    ? Date.now() - new Date(dados.servidor.ultimaNotaEm).getTime() < 5 * 60_000
    : false;

  let situacao = "Carregando…";
  if (dados) {
    if (dados.agente.status === "REVOGADO") situacao = "Revogado — não aceita mais notas.";
    else if (!dados.online) situacao = `Sem sinal do agente ${haTempo(dados.agente.ultimoHeartbeatEm)} — o PC pode estar desligado ou o agente parado.`;
    else if (t?.ultimoErro) situacao = `Online, mas com falha ao enviar: ${t.ultimoErro.mensagem}`;
    else if (t && !t.varreduraConcluida) situacao = `Online, lendo a pasta pela primeira vez (${t.arquivosNaVarredura} arquivos vistos)…`;
    else if (recebendoAgora) situacao = "Online e enviando notas agora.";
    else situacao = `Online, sem notas novas ${dados.servidor.ultimaNotaEm ? haTempo(dados.servidor.ultimaNotaEm) : "ainda"}.`;
  }

  const cartao = (rotulo: string, valor: string | number) => (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
      <div className="font-display text-2xl" style={{ color: "var(--paper)" }}>{valor}</div>
      <div className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>{rotulo}</div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
    >
      <div
        className="entra w-full max-w-3xl space-y-5 rounded-lg border p-5 sm:p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
              Atividade do agente
            </p>
            <h2 className="font-display text-xl" style={{ color: "var(--paper)" }}>{nome}</h2>
          </div>
          <button onClick={onFechar} className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4" style={{ color: "var(--muted)" }}>
            Fechar
          </button>
        </div>

        {erro && <p className="text-sm" style={{ color: "var(--paper)" }}>{erro}</p>}

        {dados && (
          <>
            <div className="flex items-center gap-3 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <span className={`selo ${dados.online && dados.agente.status === "ATIVO" ? "selo--ativa" : "selo--inativa"} ${recebendoAgora ? "pulso-atencao" : ""}`}>
                {dados.agente.status === "REVOGADO" ? "Revogado" : dados.online ? "Online" : "Offline"}
              </span>
              <span className="text-sm" style={{ color: "var(--paper)" }}>{situacao}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cartao("Recebidas hoje", dados.servidor.hoje)}
              {cartao("Últimas 24 h", dados.servidor.ultimas24h)}
              {cartao("Total desse agente", dados.servidor.total)}
              {cartao("Fila no PC", t ? t.filaPendente : "—")}
            </div>

            <div className="space-y-1 text-xs" style={{ color: "var(--muted)" }}>
              <div>Versão {dados.agente.ultimaVersaoAgente ?? "—"} · último sinal {haTempo(dados.agente.ultimoHeartbeatEm)}</div>
              {t ? (
                <>
                  <div>Pasta(s): <span className="font-mono">{t.pastas.join(" | ") || "—"}</span></div>
                  <div>
                    Desde que iniciou ({haTempo(t.iniciadoEm)}): {t.contadores.aceitos} enviadas · {t.contadores.duplicados} já existiam ·{" "}
                    {t.contadores.recusados + t.contadores.ignorados} recusadas/ignoradas
                  </div>
                </>
              ) : (
                <div>
                  Este agente ainda não manda o resumo detalhado (é de uma versão anterior à 1.0.5). Ele se atualiza sozinho na próxima
                  verificação (a cada 6 h ou ao reiniciar).
                </div>
              )}
              {dados.agente.nomeContato || dados.agente.telefoneContato || dados.agente.anydeskId ? (
                <div>
                  Contato: {[dados.agente.nomeContato, dados.agente.telefoneContato, dados.agente.anydeskId && `AnyDesk ${dados.agente.anydeskId}`].filter(Boolean).join(" · ")}
                </div>
              ) : null}
            </div>

            {t && t.recusasRecentes.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                  Recusadas / ignoradas recentemente
                </h3>
                <ul className="space-y-1 text-xs">
                  {t.recusasRecentes.map((r, i) => (
                    <li key={i} style={{ color: "var(--paper)" }}>
                      <span style={{ color: "var(--muted)" }}>{haTempo(r.em)} · </span>
                      <strong>{ROTULO_STATUS_RECUSA[r.status] ?? r.status}</strong> — <span className="font-mono break-all">{r.arquivo}</span>
                      {r.detalhe ? <span style={{ color: "var(--muted)" }}> ({r.detalhe})</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dados.servidor.porEmpresa24h.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                  Por empresa (últimas 24 h)
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: "var(--paper)" }}>
                  {dados.servidor.porEmpresa24h.map((p) => (
                    <li key={p.empresa} className="flex justify-between gap-4">
                      <span>{p.empresa}</span>
                      <span className="font-mono">{p.quantidade}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                Últimas notas recebidas
              </h3>
              {dados.servidor.ultimasNotas.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--muted)" }}>Esse agente ainda não enviou nenhuma nota.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--border)" }}>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                        <th className="px-3 py-2 font-medium">Recebida</th>
                        <th className="px-3 py-2 font-medium">Nº</th>
                        <th className="px-3 py-2 font-medium">Tipo</th>
                        <th className="px-3 py-2 font-medium">Emissão</th>
                        <th className="px-3 py-2 font-medium">Empresa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.servidor.ultimasNotas.map((n) => (
                        <tr key={n.chaveAcesso} className="border-t" style={{ borderColor: "var(--border)", color: "var(--paper)" }}>
                          <td className="px-3 py-2 whitespace-nowrap">{haTempo(n.recebidoEm)}</td>
                          <td className="px-3 py-2 font-mono">{numeroNotaDaChave(n.chaveAcesso)}</td>
                          <td className="px-3 py-2">{ROTULO_TIPO[n.tipo] ?? n.tipo}</td>
                          <td className="px-3 py-2 whitespace-nowrap">{n.emitidoEm ? formatarDataHora(n.emitidoEm).slice(0, 10) : "—"}</td>
                          <td className="px-3 py-2">{n.empresa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <p className="text-[0.6875rem]" style={{ color: "var(--muted)" }}>Atualiza sozinho a cada 15 segundos.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AgentesPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [organizacaoId, setOrganizacaoId] = useState<string | null>(null);
  const [empresas, setEmpresas] = useState<EmpresaResumo[]>([]);
  const [agentes, setAgentes] = useState<AgenteInstalacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [atividadeAberta, setAtividadeAberta] = useState<{ id: string; nome: string } | null>(null);

  const carregar = useCallback(async (t: string, orgId: string) => {
    try {
      const [empresasData, agentesData] = await Promise.all([listarEmpresas(orgId, t), listarAgentes(orgId, t)]);
      setEmpresas(empresasData);
      setAgentes(agentesData);
    } catch {
      setErro("Não foi possível carregar os agentes agora.");
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
    setOrganizacaoId(orgId);
    void carregar(t, orgId);
  }, [router, carregar]);

  async function handleRevogar(id: string) {
    if (!token) return;
    await revogarTokenAgente(id, token);
    if (organizacaoId) void carregar(token, organizacaoId);
  }

  async function handleExcluir(id: string, nome: string) {
    if (!token) return;
    if (!window.confirm(`Excluir a instalação "${nome}"? Isso não pode ser desfeito (mas os documentos já recebidos por ela continuam salvos).`)) {
      return;
    }
    await excluirTokenAgente(id, token);
    if (organizacaoId) void carregar(token, organizacaoId);
  }

  function escopoDoAgente(agente: AgenteInstalacao): string {
    if (agente.organizacaoId) return "Toda a carteira";
    const empresa = empresas.find((e) => e.id === agente.empresaId);
    return empresa ? `${empresa.razaoSocial} — ${mascararCnpj(empresa.cnpj)}` : "CNPJ específico";
  }

  return (
    <div className="space-y-6">
      <div className="entra flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
            Captura de saída
          </p>
          <h1 className="font-display text-2xl" style={{ color: "var(--paper)" }}>
            Agentes desktop
          </h1>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
          style={{ color: "var(--paper)" }}
        >
          + Gerar token
        </button>
      </div>

      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      {!carregando && !erro && agentes.length === 0 && (
        <div className="entra rounded-lg border border-dashed p-10 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Nenhum agente instalado ainda
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            Gere um token e cole na configuração do agente desktop no PC do
            contador ou da empresa pra começar a capturar notas de saída.
          </p>
        </div>
      )}

      {(carregando || agentes.length > 0) && !erro && (
        <div className="entra overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)", background: "var(--surface)" }}>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Escopo</th>
                <th className="px-4 py-3 font-medium">Contato</th>
                <th className="px-4 py-3 font-medium">Versão</th>
                <th className="px-4 py-3 font-medium">Último sinal</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {agentes.map((agente) => (
                <tr key={agente.id} className="entra-suave border-t" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--paper)" }}>
                    {agente.nome}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {escopoDoAgente(agente)}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--muted)" }}>
                    {agente.nomeContato || agente.telefoneContato || agente.anydeskId ? (
                      <div className="space-y-0.5">
                        {agente.nomeContato && <div style={{ color: "var(--paper)" }}>{agente.nomeContato}</div>}
                        {agente.telefoneContato && <div>{agente.telefoneContato}</div>}
                        {agente.anydeskId && <div className="font-mono">AnyDesk: {agente.anydeskId}</div>}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {agente.ultimaVersaoAgente ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {agente.ultimoHeartbeatEm ? formatarDataHora(agente.ultimoHeartbeatEm) : "nunca"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`selo ${
                        agente.status === "REVOGADO" ? "selo--inativa" : estaAtrasado(agente) ? "selo--inativa" : "selo--ativa"
                      }`}
                    >
                      {agente.status === "REVOGADO" ? "Revogado" : estaAtrasado(agente) ? "Atrasado" : "Ativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAtividadeAberta({ id: agente.id, nome: agente.nome })}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                        style={{ color: "var(--paper)" }}
                      >
                        Atividade
                      </button>
                      {agente.status === "ATIVO" && (
                        <button
                          onClick={() => void handleRevogar(agente.id)}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                          style={{ color: "var(--muted)" }}
                        >
                          Revogar
                        </button>
                      )}
                      <button
                        onClick={() => void handleExcluir(agente.id, agente.nome)}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                        style={{ color: "var(--muted)" }}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {atividadeAberta && token && (
        <ModalAtividade
          agenteId={atividadeAberta.id}
          nome={atividadeAberta.nome}
          token={token}
          onFechar={() => setAtividadeAberta(null)}
        />
      )}

      {modalAberto && token && organizacaoId && (
        <ModalNovoToken
          empresas={empresas}
          organizacaoId={organizacaoId}
          token={token}
          onFechar={() => setModalAberto(false)}
          onCriado={() => void carregar(token, organizacaoId)}
        />
      )}
    </div>
  );
}
