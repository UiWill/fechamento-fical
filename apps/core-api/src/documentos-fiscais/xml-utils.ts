/**
 * Extração mínima de campos do XML de NFe/NFCe via regex — suficiente para
 * indexar metadados (chave, modelo, data de emissão). Parsing fiscal
 * completo (itens, impostos, CFOP por item) é responsabilidade do motor de
 * regras (fase 2), que deve usar um parser XML de verdade, não regex.
 */

export interface DadosBasicosNFe {
  chaveAcesso: string;
  modelo: "55" | "65";
  dataEmissao: Date | null;
  nomeEmitente: string | null;
  /**
   * CFOP do primeiro item — só existe quando a SEFAZ manda o XML completo
   * (nfeProc), não no resNFe (resumo). Simplificação assume CFOP uniforme
   * entre os itens da nota, válido pra maioria dos casos de compra/venda;
   * notas com CFOP misto entre itens exigiriam classificação por item, fora
   * do escopo desta primeira versão do motor de regras.
   */
  cfop: string | null;
  /**
   * Valor total da nota (vNF, dentro de <ICMSTot>) — só existe no nfeProc
   * completo; o resNFe (resumo) não traz totais.
   */
  valorTotal: number | null;
}

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

export function extrairDadosBasicos(xml: string): DadosBasicosNFe | null {
  const idMatch = xml.match(/Id="NFe(\d{44})"/i);
  const chaveAcesso = idMatch?.[1] ?? extractText(xml, "chNFe");
  if (!chaveAcesso || chaveAcesso.length !== 44) return null;

  const modelo = extractText(xml, "mod") === "65" ? "65" : "55";
  const dhEmi = extractText(xml, "dhEmi") || extractText(xml, "dEmi");
  const dataEmissao = dhEmi ? new Date(dhEmi) : null;
  // <xNome> aparece solto no resNFe (resumo) e dentro de <emit> no nfeProc
  // completo — em ambos os casos o emitente vem antes do destinatário na
  // ordem do schema, então a primeira ocorrência é sempre a certa.
  const nomeEmitente = extractText(xml, "xNome") || null;
  const cfop = extractText(xml, "CFOP") || null;
  const vNF = extractText(xml, "vNF");
  const valorTotal = vNF ? Number(vNF) : null;

  return {
    chaveAcesso,
    modelo,
    dataEmissao,
    nomeEmitente,
    cfop,
    valorTotal: valorTotal !== null && !Number.isNaN(valorTotal) ? valorTotal : null,
  };
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
