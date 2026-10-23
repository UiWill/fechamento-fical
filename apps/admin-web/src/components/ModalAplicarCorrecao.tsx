"use client";

import { useEffect, useState } from "react";
import {
  aplicarCorrecao,
  aplicarCorrecaoEmMassa,
  buscarCatalogoCorrecao,
  listarCandidatosCorrecao,
  type CampoCorrecao,
  type CandidatoCorrecao,
  type ItemCatalogoCorrecao,
} from "@/lib/api";

// Só esses 3 campos têm valor conhecido no nível do ITEM (produto) — os
// demais (dados de destinatário/transporte/informações complementares)
// são do documento inteiro, sem equivalente armazenado hoje, então o
// valor errado precisa ser digitado (mesmo assim, sempre dentro do
// template fixo "onde se lê / leia-se", nunca texto livre enviado direto
// à SEFAZ). Ver CAMPOS_COM_VALOR_NO_ITEM em correcoes.service.ts (mesma
// lista, espelhada aqui pro formulário).
const CAMPOS_COM_VALOR_NO_ITEM = new Set<CampoCorrecao>(["CFOP", "NCM", "CST_ICMS"]);

function valorAtualDoItem(
  campo: CampoCorrecao,
  item: { cfop: string; ncm: string; icmsCst: string | null }
): string {
  if (campo === "CFOP") return item.cfop;
  if (campo === "NCM") return item.ncm;
  if (campo === "CST_ICMS") return item.icmsCst ?? "";
  return "";
}

export function ModalAplicarCorrecao({
  empresaId,
  token,
  item,
  campoInicial,
  valorCorretoInicial,
  onFechar,
  onAplicado,
}: {
  empresaId: string;
  token: string;
  item: { documentoFiscalId: string; ncm: string; cfop: string; icmsCst: string | null; xProd: string };
  campoInicial?: CampoCorrecao;
  valorCorretoInicial?: string;
  onFechar: () => void;
  onAplicado: () => void;
}) {
  const [catalogo, setCatalogo] = useState<ItemCatalogoCorrecao[]>([]);
  const [campo, setCampo] = useState<CampoCorrecao>(campoInicial ?? "CFOP");
  const [valorErrado, setValorErrado] = useState(valorAtualDoItem(campoInicial ?? "CFOP", item));
  const [valorCorreto, setValorCorreto] = useState(valorCorretoInicial ?? "");
  const [criarRegra, setCriarRegra] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{
    status: "AUTORIZADA" | "REJEITADA";
    motivoSefaz: string | null;
    regraCorrecaoId: string | null;
  } | null>(null);
  const [candidatos, setCandidatos] = useState<CandidatoCorrecao[]>([]);
  const [aplicandoEmMassa, setAplicandoEmMassa] = useState(false);
  const [resultadoMassa, setResultadoMassa] = useState<{ total: number; sucesso: number; falha: number } | null>(
    null
  );

  useEffect(() => {
    buscarCatalogoCorrecao(token)
      .then(setCatalogo)
      .catch(() => setErro("Não foi possível carregar o catálogo de campos corrigíveis."));
  }, [token]);

  function handleTrocarCampo(novoCampo: CampoCorrecao) {
    setCampo(novoCampo);
    setValorErrado(valorAtualDoItem(novoCampo, item));
    setValorCorreto("");
  }

  const itemCatalogo = catalogo.find((c) => c.campo === campo);
  const campoTemValorNoItem = CAMPOS_COM_VALOR_NO_ITEM.has(campo);

  async function handleEnviar(event: React.FormEvent) {
    event.preventDefault();
    if (!valorErrado.trim() || !valorCorreto.trim()) {
      setErro("Preencha o valor errado e o valor correto.");
      return;
    }
    if (valorErrado.trim() === valorCorreto.trim()) {
      setErro("O valor correto não pode ser igual ao valor errado.");
      return;
    }
    setEnviando(true);
    setErro(null);
    try {
      const evento = await aplicarCorrecao(
        empresaId,
        {
          documentoFiscalId: item.documentoFiscalId,
          campo,
          valorErrado: valorErrado.trim(),
          valorCorreto: valorCorreto.trim(),
          ncm: item.ncm,
          descricaoProduto: item.xProd,
          cfopContexto: item.cfop,
          criarRegra: campoTemValorNoItem && criarRegra,
        },
        token
      );
      setResultado({
        status: evento.status === "AUTORIZADA" ? "AUTORIZADA" : "REJEITADA",
        motivoSefaz: evento.motivoSefaz,
        regraCorrecaoId: evento.regraCorrecaoId,
      });
      if (evento.status === "AUTORIZADA") {
        onAplicado();
        if (evento.regraCorrecaoId) {
          listarCandidatosCorrecao(evento.regraCorrecaoId, token)
            .then(setCandidatos)
            .catch(() => undefined);
        }
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível enviar a Carta de Correção agora.");
    } finally {
      setEnviando(false);
    }
  }

  async function handleAplicarEmMassa() {
    if (!resultado?.regraCorrecaoId || candidatos.length === 0) return;
    setAplicandoEmMassa(true);
    try {
      const r = await aplicarCorrecaoEmMassa(
        resultado.regraCorrecaoId,
        candidatos.map((c) => c.documentoFiscalId),
        token
      );
      setResultadoMassa(r);
      setCandidatos([]);
    } catch {
      setErro("Não foi possível aplicar em massa agora.");
    } finally {
      setAplicandoEmMassa(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !enviando) onFechar();
      }}
    >
      <div
        className="entra w-full max-w-[32rem] space-y-4 rounded-lg border p-6"
        style={{ background: "var(--surface-2)", borderColor: "var(--muted-2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
          Carta de Correção Eletrônica (CC-e)
        </p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Produto: <strong style={{ color: "var(--paper)" }}>{item.xProd}</strong> (NCM {item.ncm}, CFOP {item.cfop})
        </p>

        {resultado ? (
          <>
            {resultado.status === "AUTORIZADA" ? (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                Carta de Correção autorizada pela SEFAZ.
              </p>
            ) : (
              <p className="text-sm" style={{ color: "var(--vermelho, #e08a8a)" }}>
                A SEFAZ rejeitou a correção: {resultado.motivoSefaz ?? "motivo não informado"}.
              </p>
            )}

            {resultadoMassa ? (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                Aplicado em {resultadoMassa.total} nota(s): {resultadoMassa.sucesso} autorizada(s),{" "}
                {resultadoMassa.falha} com falha.
              </p>
            ) : candidatos.length > 0 ? (
              <div className="space-y-2 rounded-md border p-3" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm" style={{ color: "var(--paper)" }}>
                  Encontramos {candidatos.length} outra(s) nota(s) com esse mesmo erro (nessa ou em outras empresas da
                  sua organização). Aplicar a mesma correção em todas de uma vez?
                </p>
                <button
                  onClick={() => void handleAplicarEmMassa()}
                  disabled={aplicandoEmMassa}
                  className="botao-principal"
                  style={{ width: "auto", paddingInline: "1.25rem" }}
                >
                  {aplicandoEmMassa && <span className="spinner" />}
                  {aplicandoEmMassa ? "Aplicando…" : `Aplicar em todas (${candidatos.length})`}
                </button>
              </div>
            ) : null}

            <div className="flex gap-3">
              <button onClick={onFechar} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                Fechar
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEnviar} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                O que está errado
              </label>
              <select
                value={campo}
                onChange={(event) => handleTrocarCampo(event.target.value as CampoCorrecao)}
                className="campo text-sm"
              >
                {catalogo.map((c) => (
                  <option key={c.campo} value={c.campo}>
                    {c.rotulo}
                  </option>
                ))}
              </select>
            </div>

            {itemCatalogo && !itemCatalogo.permiteCceSeguro && (
              <p
                className="rounded-md border p-3 text-xs"
                style={{ borderColor: "var(--vermelho, #e08a8a)", color: "var(--vermelho, #e08a8a)" }}
              >
                {itemCatalogo.aviso}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Valor errado (como foi emitido)
                </label>
                <input
                  value={valorErrado}
                  onChange={(event) => setValorErrado(event.target.value)}
                  readOnly={campoTemValorNoItem}
                  className="campo text-sm"
                  style={campoTemValorNoItem ? { opacity: 0.7 } : undefined}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                  Valor correto
                </label>
                <input
                  value={valorCorreto}
                  onChange={(event) => setValorCorreto(event.target.value)}
                  placeholder="O que deveria ter sido emitido"
                  className="campo text-sm"
                />
              </div>
            </div>

            {campoTemValorNoItem && (
              <label className="flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
                <input type="checkbox" checked={criarRegra} onChange={(event) => setCriarRegra(event.target.checked)} />
                Salvar como regra — sinalizar e permitir corrigir automaticamente o mesmo erro em outras notas/empresas
                da organização
              </label>
            )}

            {erro && (
              <p className="text-sm" style={{ color: "var(--vermelho, #e08a8a)" }}>
                {erro}
              </p>
            )}

            <div className="flex gap-3">
              <button type="submit" disabled={enviando} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {enviando && <span className="spinner" />}
                {enviando ? "Enviando…" : "Enviar Carta de Correção"}
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
