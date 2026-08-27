import type { EnviarEventoInput, TipoEventoManifestacao } from "./types";

/**
 * Códigos e descrições do evento de Manifestação do Destinatário conforme
 * o Manual de Orientação do Contribuinte da NF-e (schema oficial da SEFAZ,
 * não é uma convenção da ACBr) — estável e não muda entre bibliotecas.
 */
export const EVENTO_MANIFESTACAO: Record<
  TipoEventoManifestacao,
  { codigo: string; descEvento: string; exigeJustificativa: boolean }
> = {
  CONFIRMACAO_OPERACAO: {
    codigo: "210200",
    descEvento: "Confirmacao da Operacao",
    exigeJustificativa: false,
  },
  CIENCIA_OPERACAO: {
    codigo: "210210",
    descEvento: "Ciencia da Operacao",
    exigeJustificativa: false,
  },
  DESCONHECIMENTO_OPERACAO: {
    codigo: "210220",
    descEvento: "Desconhecimento da Operacao",
    exigeJustificativa: true,
  },
  OPERACAO_NAO_REALIZADA: {
    codigo: "210240",
    descEvento: "Operacao nao Realizada",
    exigeJustificativa: true,
  },
};

function dataHoraEventoIso(): string {
  // formato exigido pela SEFAZ: AAAA-MM-DDTHH:MM:SS-03:00 (horário de Brasília)
  const agora = new Date();
  const brt = new Date(agora.getTime() - 3 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${brt.getUTCFullYear()}-${p(brt.getUTCMonth() + 1)}-${p(brt.getUTCDate())}` +
    `T${p(brt.getUTCHours())}:${p(brt.getUTCMinutes())}:${p(brt.getUTCSeconds())}-03:00`
  );
}

/**
 * Monta o INI de evento no formato que a ACBrLib espera para
 * NFE_EnviarEvento — ⚠️ layout a confirmar contra o manual antes do
 * primeiro envio real (ver aviso em binding.ts).
 */
export function construirIniEvento(input: EnviarEventoInput): string {
  const evento = EVENTO_MANIFESTACAO[input.tipoEvento];

  if (evento.exigeJustificativa) {
    const tamanho = (input.justificativa ?? "").trim().length;
    if (tamanho < 15 || tamanho > 255) {
      throw new Error(
        `Justificativa obrigatória para ${input.tipoEvento} deve ter entre 15 e 255 caracteres (recebido: ${tamanho})`
      );
    }
  }

  const linhas = [
    "[Evento001]",
    `chNFe=${input.chaveAcesso}`,
    `CNPJ=${input.cnpj}`,
    `tpEvento=${evento.codigo}`,
    `nSeqEvento=${input.numeroSequencial}`,
    `dhEvento=${dataHoraEventoIso()}`,
    `descEvento=${evento.descEvento}`,
  ];

  if (evento.exigeJustificativa) {
    linhas.push(`xJust=${input.justificativa}`);
  }

  return linhas.join("\r\n") + "\r\n";
}
