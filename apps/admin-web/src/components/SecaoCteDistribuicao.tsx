"use client";

import { useCallback, useEffect, useState } from "react";
import {
  baixarXmlsZip,
  consultarSituacaoCte,
  listarCteDistribuicao,
  sincronizarCte,
  zerarNsuCte,
  ROTULO_CSTAT_CONSULTA,
  type ControleCte,
  type CteDistribuicaoItem,
} from "@/lib/api";
import {
  chaveMes,
  chaveResumida,
  formatarData,
  formatarDataHora,
  formatarMoeda,
  limitesDoMes,
  mesAtual,
  numeroNotaDaChave,
  rotuloMes,
} from "@/lib/format";

const CLASSE_BOTAO_LINK =
  "font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed";

export function SecaoCteDistribuicao({
  empresaId,
  token,
  temCertificado,
}: {
  empresaId: string;
  token: string;
  temCertificado: boolean;
}) {
  const [itens, setItens] = useState<CteDistribuicaoItem[]>([]);
  const [controle, setControle] = useState<ControleCte | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [mes, setMes] = useState(mesAtual());
  const [sincronizando, setSincronizando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [baixando, setBaixando] = useState(false);
  const [consultandoId, setConsultandoId] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      const dados = await listarCteDistribuicao(empresaId, token);
      setItens(dados.documentos);
      setControle(dados.controle);
      setErro(null);
    } catch {
      setErro("Não foi possível carregar os CT-e agora.");
    } finally {
      setCarregando(false);
    }
  }, [empresaId, token]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function handleSincronizar() {
    setSincronizando(true);
    setMensagem(null);
    setErro(null);
    try {
      const r = await sincronizarCte(empresaId, token);
      const base =
        r.documentosNovos > 0
          ? `${r.documentosNovos} CT-e novo(s) recebido(s).`
          : "Nenhum CT-e novo — a SEFAZ não tem nada além do que já foi buscado.";
      setMensagem(
        r.bloqueadoPelaSefaz
          ? "A SEFAZ bloqueou novas consultas de CT-e para esse CNPJ por consumo indevido (limite de 20/hora) — pode ter sido outro sistema. Tente de novo daqui a 1 hora."
          : r.limiteSefazAtingido
            ? `${base} Limite de consultas da SEFAZ atingido — sincronize de novo daqui a pouco.`
            : base
      );
      await carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível sincronizar os CT-e agora.");
    } finally {
      setSincronizando(false);
    }
  }

  async function handleZerarNsu() {
    if (
      !window.confirm(
        "Zerar o NSU de CT-e dessa empresa? A próxima sincronização vai buscar todo o histórico de CT-e de novo na SEFAZ, desde o início."
      )
    ) {
      return;
    }
    try {
      await zerarNsuCte(empresaId, token);
      setMensagem("NSU de CT-e zerado — a próxima sincronização busca o histórico desde o início.");
      await carregar();
    } catch {
      setErro("Não foi possível zerar o NSU de CT-e agora.");
    }
  }

  async function handleBaixarXml() {
    setBaixando(true);
    setErro(null);
    try {
      const { inicio, fim } = limitesDoMes(mes);
      await baixarXmlsZip(empresaId, "CTE_DISTRIBUICAO", inicio, fim, token);
    } catch {
      setErro("Não foi possível baixar os XMLs agora.");
    } finally {
      setBaixando(false);
    }
  }

  async function handleConsultar(item: CteDistribuicaoItem) {
    setConsultandoId(item.id);
    try {
      const atualizado = await consultarSituacaoCte(empresaId, item.id, token);
      setItens((atual) => atual.map((i) => (i.id === item.id ? atualizado : i)));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Não foi possível consultar essa nota agora.");
    } finally {
      setConsultandoId(null);
    }
  }

  const doMes = itens.filter((i) => chaveMes(i.emitidoEm ?? i.recebidoEm) === mes);
  const ordenados = [...doMes].sort(
    (a, b) => new Date(b.emitidoEm ?? b.recebidoEm).getTime() - new Date(a.emitidoEm ?? a.recebidoEm).getTime()
  );

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        CT-e de transporte em que esta empresa é a <strong>tomadora</strong> (quem paga o frete) — recebidos da SEFAZ
        (Distribuição DFe de CT-e). Não são notas emitidas por ela.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          {controle
            ? `Última sincronização: ${formatarDataHora(controle.ultimaSincronizacaoEm)}${
                controle.ultimoCStat ? ` · ${controle.ultimoCStat}` : ""
              }`
            : "Ainda não sincronizado"}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => void handleZerarNsu()} className={CLASSE_BOTAO_LINK} style={{ color: "var(--muted)" }}>
            Zerar NSU
          </button>
          <button
            onClick={() => void handleSincronizar()}
            disabled={sincronizando || !temCertificado}
            className="botao-principal"
            style={{ width: "auto", paddingInline: "1.25rem" }}
            title={!temCertificado ? "Cadastre um certificado antes de sincronizar" : undefined}
          >
            {sincronizando && <span className="spinner" />}
            {sincronizando ? "Sincronizando" : "Sincronizar CT-e"}
          </button>
        </div>
      </div>

      {mensagem && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {mensagem}
        </p>
      )}
      {controle?.ultimoXMotivo && !mensagem && (
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {controle.ultimoXMotivo}
        </p>
      )}
      {erro && (
        <p className="entra-suave text-sm" style={{ color: "var(--paper)" }}>
          {erro}
        </p>
      )}

      <div
        className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <label className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
              CT-e · mês
            </label>
            <input
              type="month"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className="campo text-sm"
              style={{ width: "auto" }}
            />
          </div>
          <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
            {rotuloMes(mes)} · {doMes.length === 0 ? "nenhum CT-e nesse mês" : `${doMes.length} CT-e`}
          </span>
        </div>
        <button
          onClick={() => void handleBaixarXml()}
          disabled={doMes.length === 0 || baixando}
          className={CLASSE_BOTAO_LINK}
          style={{ color: "var(--paper)" }}
        >
          {baixando ? "Baixando…" : "Baixar XML"}
        </button>
      </div>

      {carregando ? (
        <div className="skeleton h-24 w-full rounded-lg" />
      ) : itens.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhum CT-e recebido ainda. Clique em <strong>Sincronizar CT-e</strong> pra buscar na SEFAZ.
          </p>
        </div>
      ) : ordenados.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Nenhum CT-e em {rotuloMes(mes)}.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="max-h-[34rem] overflow-auto">
            <table className="w-full min-w-[54rem] text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr
                  className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
                  style={{ color: "var(--muted)", background: "var(--surface)" }}
                >
                  <th className="px-3 py-3 font-medium">Nº</th>
                  <th className="px-3 py-3 font-medium">Data</th>
                  <th className="px-3 py-3 font-medium">Transportadora (emitente)</th>
                  <th className="px-3 py-3 font-medium">Papel da empresa</th>
                  <th className="px-3 py-3 font-medium">Origem → Destino</th>
                  <th className="px-3 py-3 font-medium">Valor</th>
                  <th className="px-3 py-3 font-medium">Situação</th>
                  <th className="px-3 py-3 font-medium">Chave</th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map((i) => (
                  <tr key={i.id} className="border-t align-top" style={{ borderColor: "var(--border)" }}>
                    <td className="px-3 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                      {numeroNotaDaChave(i.chaveAcesso)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>
                      {formatarData(i.emitidoEm ?? i.recebidoEm)}
                    </td>
                    <td className="px-3 py-3" style={{ color: "var(--paper)" }}>
                      {i.nomeEmitente ?? "—"}
                      {i.detalhe?.cancelado && (
                        <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                          cancelado
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--paper)" }}>
                      {i.detalhe?.papeis.length ? i.detalhe.papeis.join(", ") : "—"}
                    </td>
                    <td className="px-3 py-3 text-xs" style={{ color: "var(--muted)" }}>
                      {i.detalhe?.origem ?? "?"} → {i.detalhe?.destino ?? "?"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" style={{ color: "var(--paper)" }}>
                      {formatarMoeda(i.valorTotal)}
                    </td>
                    <td className="px-3 py-3">
                      {consultandoId === i.id ? (
                        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                          <span className="spinner" /> consultando…
                        </span>
                      ) : i.cStatConsulta ? (
                        <button
                          onClick={() => void handleConsultar(i)}
                          className={CLASSE_BOTAO_LINK}
                          style={{ color: i.cStatConsulta === "100" ? "var(--paper)" : "var(--muted)" }}
                          title={`${i.consultadoEm ? `consultado em ${formatarDataHora(i.consultadoEm)}` : ""} (clique pra consultar de novo)`}
                        >
                          {ROTULO_CSTAT_CONSULTA[i.cStatConsulta] ?? `cStat ${i.cStatConsulta}`}
                        </button>
                      ) : (
                        <button onClick={() => void handleConsultar(i)} className={CLASSE_BOTAO_LINK} style={{ color: "var(--muted)" }}>
                          Consultar
                        </button>
                      )}
                    </td>
                    <td
                      className="chave-mascarada px-3 py-3 text-xs"
                      style={{ color: "var(--muted)" }}
                      title={i.chaveAcesso}
                    >
                      {chaveResumida(i.chaveAcesso)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
