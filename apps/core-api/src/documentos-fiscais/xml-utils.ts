/**
 * Extração de metadados do XML de NFe/NFCe recebido via SEFAZ. A extração
 * de fato (chave, tipo, data, CFOP, valor) mora em @afe/shared
 * (xml-documento-fiscal.ts) — compartilhada com o agente desktop, que
 * precisa classificar XML de saída exatamente da mesma forma. Este arquivo
 * fica só com o que é específico do fluxo de entrada (endereço do
 * emitente, contagem de itens — usados na exportação TXT, não no agente).
 */
export { extrairDadosBasicos, type DadosBasicosDocumentoFiscal } from "@afe/shared";

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

export interface EnderecoEmitente {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  codigoMunicipio: string;
  uf: string;
  cep: string;
  inscricaoEstadual: string;
}

/**
 * Endereço do emitente (fornecedor), lido sob demanda na hora de exportar
 * TXT — não é gravado no DocumentoFiscal porque só serve pra isso. Usa a
 * mesma premissa de "primeira ocorrência é do emitente" do
 * extrairDadosBasicos (schema da NFe traz <emit> antes de <dest>). Só
 * funciona com nfeProc completo (resNFe não traz endereço nenhum).
 */
export function extrairEnderecoEmitente(xml: string): EnderecoEmitente {
  return {
    logradouro: extractText(xml, "xLgr"),
    numero: extractText(xml, "nro"),
    complemento: extractText(xml, "xCpl"),
    bairro: extractText(xml, "xBairro"),
    codigoMunicipio: extractText(xml, "cMun"),
    uf: extractText(xml, "UF"),
    cep: extractText(xml, "CEP"),
    inscricaoEstadual: extractText(xml, "IE"),
  };
}

/** Quantidade de itens (<det>) da nota — usado só como informação auxiliar na exportação. */
export function contarItens(xml: string): number {
  const matches = xml.match(/<det\s/gi);
  return matches?.length ?? 0;
}
