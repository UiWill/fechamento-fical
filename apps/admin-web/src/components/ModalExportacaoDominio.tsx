"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gerarExportacaoTxt, baixarExportacaoTxt } from "@/lib/api";
import { limitesDoMes, mesAtual, rotuloMes } from "@/lib/format";
import { SeletorMes } from "@/components/SeletorMes";

/**
 * Exportação pra Domínio Sistemas — um arquivo só, com entrada e saída
 * juntas (é assim que o layout da Domínio espera: "Importação com
 * separador" descreve a si mesma como contendo entrada, saída e serviços
 * no mesmo arquivo, não em arquivos separados por tela).
 *
 * Fases visíveis (nunca fica "fazendo algo em segundo plano" sem avisar —
 * já teve problema antes de ação disparando sem load nem mensagem):
 * seleção → gerando (com mensagem explícita, pode levar mais de um minuto
 * em empresa com milhares de notas) → resultado (confirma quantas notas
 * entraram E que o arquivo já baixou, com o nome do arquivo e um botão
 * pra baixar de novo caso o navegador não tenha mostrado nada visível).
 */
export function ModalExportacaoDominio({
  empresaId,
  token,
  onFechar,
}: {
  empresaId: string;
  token: string;
  onFechar: () => void;
}) {
  const [mes, setMes] = useState(mesAtual());
  const [fase, setFase] = useState<"selecao" | "gerando" | "resultado" | "erro">("selecao");
  const [resumo, setResumo] = useState<string | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState<string | null>(null);
  const [exportacaoId, setExportacaoId] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [baixandoDeNovo, setBaixandoDeNovo] = useState(false);
  const ocupado = fase === "gerando";

  function fechar() {
    if (ocupado) return;
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

  async function gerar() {
    setFase("gerando");
    setErro(null);
    try {
      const { inicio, fim } = limitesDoMes(mes);
      const resultado = await gerarExportacaoTxt(empresaId, inicio, fim, token);

      if (resultado.status === "ERRO") {
        setErro(resultado.erro ?? "Não foi possível gerar o TXT.");
        setFase("erro");
        return;
      }

      const partes = [`${resultado.totalDocumentos} nota(s) incluída(s)`];
      if (resultado.documentosIgnorados) {
        partes.push(`${resultado.documentosIgnorados} ignorada(s) por falta de CFOP`);
      }
      if (resultado.documentosSemAcumulador) {
        partes.push(
          `${resultado.documentosSemAcumulador} sem acumulador (classifique as notas em "Classificar pendentes" — precisa haver uma regra fiscal cadastrada pro CFOP)`
        );
      }
      if (resultado.documentosNaoConsultados) {
        partes.push(
          `${resultado.documentosNaoConsultados} ainda não consultada(s) na SEFAZ (use "Consultar pendentes" — só nota autorizada entra no TXT)`
        );
      }
      if (resultado.documentosNaoAutorizados) {
        partes.push(
          `${resultado.documentosNaoAutorizados} com situação diferente de autorizada (cancelada/denegada/duplicidade)`
        );
      }
      setResumo(partes.join(" · "));
      setExportacaoId(resultado.id);

      if (resultado.totalDocumentos > 0) {
        const nome = await baixarExportacaoTxt(empresaId, resultado.id, token);
        setNomeArquivo(nome);
      }
      setFase("resultado");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível gerar o TXT agora.");
      setFase("erro");
    }
  }

  async function baixarDeNovo() {
    if (!exportacaoId) return;
    setBaixandoDeNovo(true);
    try {
      const nome = await baixarExportacaoTxt(empresaId, exportacaoId, token);
      setNomeArquivo(nome);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível baixar o arquivo agora.");
    } finally {
      setBaixandoDeNovo(false);
    }
  }

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
            Exportação para o Domínio Sistemas
          </p>
          <h2 className="font-display text-xl" style={{ color: "var(--paper)" }}>
            Gerar TXT do mês
          </h2>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Um arquivo só, com as notas de entrada e de saída (NF-e e NFC-e) do mês escolhido. CT-e não entra nesse
            arquivo.
          </p>
        </div>

        {fase === "selecao" && (
          <>
            <div className="flex items-center gap-3">
              <label className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
                Mês
              </label>
              <SeletorMes value={mes} onChange={setMes} />
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={fechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => void gerar()}
                className="botao-principal"
                style={{ width: "auto", paddingInline: "1.25rem" }}
              >
                Gerar TXT
              </button>
            </div>
          </>
        )}

        {fase === "gerando" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="spinner" />
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                Gerando o arquivo de {rotuloMes(mes)}…
              </p>
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Pode levar um minuto em empresas com muitas notas no mês — não feche essa janela, ela volta a avisar
              quando terminar.
            </p>
          </div>
        )}

        {fase === "resultado" && (
          <div className="space-y-4">
            <div
              className="space-y-1 rounded-lg border p-3"
              style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
            >
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                {resumo}
              </p>
              {nomeArquivo ? (
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Arquivo <span className="font-mono">{nomeArquivo}</span> baixado — confira a pasta de downloads do
                  navegador.
                </p>
              ) : (
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Nenhuma nota entrou no arquivo esse mês — nada pra baixar.
                </p>
              )}
            </div>

            {erro && (
              <p className="text-sm" style={{ color: "var(--paper)" }}>
                {erro}
              </p>
            )}

            <div className="flex items-center justify-end gap-4">
              {nomeArquivo && (
                <button
                  onClick={() => void baixarDeNovo()}
                  disabled={baixandoDeNovo}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:opacity-40"
                  style={{ color: "var(--muted)" }}
                >
                  {baixandoDeNovo && <span className="spinner" />}
                  {baixandoDeNovo ? "baixando…" : "baixar de novo"}
                </button>
              )}
              <button onClick={fechar} className="botao-principal" style={{ width: "auto", paddingInline: "1.25rem" }}>
                Fechar
              </button>
            </div>
          </div>
        )}

        {fase === "erro" && (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--paper)" }}>
              {erro}
            </p>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={fechar}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Fechar
              </button>
              <button
                onClick={() => void gerar()}
                className="botao-principal"
                style={{ width: "auto", paddingInline: "1.25rem" }}
              >
                Tentar de novo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(conteudo, document.body);
}
