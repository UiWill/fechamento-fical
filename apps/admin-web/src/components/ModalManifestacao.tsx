"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { enviarManifestacao, ROTULO_EVENTO_MANIFESTACAO, type TipoEventoManifestacao } from "@/lib/api";
import { chaveResumida, formatarMoeda, numeroNotaDaChave } from "@/lib/format";

export interface AlvoManifestacao {
  id: string;
  chaveAcesso: string;
  nomeEmitente: string | null;
  valorTotal: string | null;
}

const OPCOES: { tipo: TipoEventoManifestacao; explicacao: string; exigeJustificativa: boolean }[] = [
  {
    tipo: "CIENCIA_OPERACAO",
    explicacao: "Registra que você tomou conhecimento da nota. É o passo mais comum e libera o XML completo.",
    exigeJustificativa: false,
  },
  {
    tipo: "CONFIRMACAO_OPERACAO",
    explicacao: "Confirma que a operação aconteceu exatamente como descrita na nota.",
    exigeJustificativa: false,
  },
  {
    tipo: "DESCONHECIMENTO_OPERACAO",
    explicacao: "Você não reconhece essa nota (não comprou, não recebeu). Exige justificativa.",
    exigeJustificativa: true,
  },
  {
    tipo: "OPERACAO_NAO_REALIZADA",
    explicacao: "A compra foi feita, mas a mercadoria não chegou / foi recusada. Exige justificativa.",
    exigeJustificativa: true,
  },
];

const SIMULTANEAS = 3;

/**
 * Modal de manifestação do destinatário (uma nota ou um lote). É desenhado
 * por portal direto no <body>: dentro de uma linha de tabela com animação
 * (transform), o `position: fixed` deixa de ser relativo à tela e o modal
 * sai cortado/transparente.
 */
export function ModalManifestacao({
  empresaId,
  token,
  alvos,
  onFechar,
  onConcluido,
}: {
  empresaId: string;
  token: string;
  alvos: AlvoManifestacao[];
  onFechar: () => void;
  onConcluido: () => void;
}) {
  const lote = alvos.length > 1;
  const [tipo, setTipo] = useState<TipoEventoManifestacao>("CIENCIA_OPERACAO");
  const [justificativa, setJustificativa] = useState("");
  const [fase, setFase] = useState<"escolha" | "enviando" | "resultado">("escolha");
  const [feitas, setFeitas] = useState(0);
  const [autorizadas, setAutorizadas] = useState(0);
  const [falhas, setFalhas] = useState<{ alvo: AlvoManifestacao; motivo: string }[]>([]);
  const [erroForm, setErroForm] = useState<string | null>(null);
  const parar = useRef(false);
  const houveMudanca = useRef(false);

  const opcao = OPCOES.find((o) => o.tipo === tipo)!;
  const ocupado = fase === "enviando";

  function fechar() {
    if (ocupado) return;
    if (houveMudanca.current) onConcluido();
    onFechar();
  }

  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !ocupado) fechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ocupado]);

  async function enviar() {
    if (opcao.exigeJustificativa && justificativa.trim().length < 15) {
      setErroForm("A justificativa precisa ter pelo menos 15 caracteres.");
      return;
    }
    setErroForm(null);
    setFase("enviando");
    parar.current = false;

    let proximo = 0;
    const trabalhar = async () => {
      while (!parar.current) {
        const i = proximo++;
        if (i >= alvos.length) return;
        const alvo = alvos[i]!;
        try {
          const evento = await enviarManifestacao(
            empresaId,
            {
              documentoFiscalId: alvo.id,
              tipo,
              justificativa: opcao.exigeJustificativa ? justificativa.trim() : undefined,
            },
            token
          );
          if (evento.status === "AUTORIZADA") {
            houveMudanca.current = true;
            setAutorizadas((n) => n + 1);
          } else {
            setFalhas((f) => [...f, { alvo, motivo: evento.motivoSefaz ?? "A SEFAZ rejeitou a manifestação." }]);
          }
        } catch (err) {
          setFalhas((f) => [
            ...f,
            { alvo, motivo: err instanceof Error ? err.message : "Não foi possível enviar essa manifestação." },
          ]);
        }
        setFeitas((n) => n + 1);
      }
    };
    await Promise.all(Array.from({ length: Math.min(SIMULTANEAS, alvos.length) }, trabalhar));
    setFase("resultado");
  }

  const total = alvos.length;
  const unico = alvos[0]!;
  const percentual = total ? Math.round((feitas / total) * 100) : 0;

  const conteudo = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.82)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div
        className="w-full max-w-lg space-y-5 rounded-lg border p-5 sm:p-6"
        style={{
          background: "var(--surface)",
          borderColor: "var(--muted-2)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.75)",
          opacity: 1,
        }}
      >
        <div className="space-y-1">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
            Manifestação do destinatário
          </p>
          <h2 className="font-display text-xl" style={{ color: "var(--paper)" }}>
            {lote ? `${total} notas de entrada` : `NF-e nº ${numeroNotaDaChave(unico.chaveAcesso)}`}
          </h2>
          {!lote && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {unico.nomeEmitente ?? "Emitente não informado"} · {formatarMoeda(unico.valorTotal)} ·{" "}
              <span className="font-mono">{chaveResumida(unico.chaveAcesso)}</span>
            </p>
          )}
          {lote && (
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Todas as notas do filtro atual que ainda não foram manifestadas. A mesma manifestação será enviada para cada
              uma.
            </p>
          )}
        </div>

        {fase === "escolha" && (
          <>
            <div className="space-y-2">
              {OPCOES.map((o) => {
                const selecionada = o.tipo === tipo;
                return (
                  <label
                    key={o.tipo}
                    className="flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors"
                    style={{
                      borderColor: selecionada ? "var(--paper)" : "var(--border)",
                      background: selecionada ? "var(--surface-2)" : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="tipo-manifestacao"
                      checked={selecionada}
                      onChange={() => {
                        setTipo(o.tipo);
                        setErroForm(null);
                      }}
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-sm" style={{ color: "var(--paper)" }}>
                        {ROTULO_EVENTO_MANIFESTACAO[o.tipo]}
                      </span>
                      <span className="block text-xs" style={{ color: "var(--muted)" }}>
                        {o.explicacao}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            {opcao.exigeJustificativa && (
              <div className="space-y-1">
                <textarea
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  placeholder="Justificativa (mínimo 15 caracteres)"
                  rows={3}
                  className="campo text-sm"
                />
                <p className="text-[0.6875rem]" style={{ color: "var(--muted)" }}>
                  {justificativa.trim().length}/15 caracteres mínimos
                </p>
              </div>
            )}

            {lote && opcao.exigeJustificativa && (
              <p className="text-xs" style={{ color: "var(--paper)" }}>
                Atenção: essa manifestação será enviada para {total} notas de uma vez e não pode ser desfeita.
              </p>
            )}
            {erroForm && (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                {erroForm}
              </p>
            )}

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={fechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Cancelar
              </button>
              <button onClick={() => void enviar()} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                {lote ? `Manifestar ${total} notas` : "Manifestar"}
              </button>
            </div>
          </>
        )}

        {fase !== "escolha" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm" style={{ color: "var(--paper)" }}>
                <span>{ocupado ? "Enviando para a SEFAZ…" : "Concluído"}</span>
                <span className="font-mono">
                  {feitas}/{total}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                <div
                  className="h-full transition-all"
                  style={{ width: `${percentual}%`, background: "var(--paper)" }}
                />
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {autorizadas} autorizada(s) pela SEFAZ · {falhas.length} com problema
              </p>
            </div>

            {falhas.length > 0 && (
              <div className="max-h-48 space-y-1.5 overflow-y-auto rounded-lg border p-3 text-xs" style={{ borderColor: "var(--border)" }}>
                {falhas.map((f, i) => (
                  <p key={i} style={{ color: "var(--paper)" }}>
                    <span className="font-mono">nº {numeroNotaDaChave(f.alvo.chaveAcesso)}</span>{" "}
                    <span style={{ color: "var(--muted)" }}>— {f.motivo}</span>
                  </p>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-4">
              {ocupado ? (
                <button
                  onClick={() => {
                    parar.current = true;
                  }}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4"
                  style={{ color: "var(--muted)" }}
                >
                  Parar
                </button>
              ) : (
                <button onClick={fechar} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                  Fechar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(conteudo, document.body);
}
