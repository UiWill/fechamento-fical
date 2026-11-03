/**
 * Catálogo oficial de CST do ICMS (Código de Situação Tributária, Tabela A
 * do Convênio s/n 1970/Anexo do Ajuste SINIEF 03/1994) — referência fixa,
 * usado como lista de seleção em vez de texto livre no campo "CST
 * esperado" das Regras Fiscais (pedido do cliente em 2026-11-03, passou a
 * tabela oficial). CSOSN (Simples Nacional) é uma tabela diferente, não
 * entra aqui.
 */
export interface CstIcms {
  codigo: string;
  nome: string;
}

export const CST_ICMS: CstIcms[] = [
  { codigo: "00", nome: "Tributada integralmente" },
  { codigo: "10", nome: "Tributada e com cobrança do ICMS por substituição tributária" },
  { codigo: "20", nome: "Com redução da BC" },
  { codigo: "30", nome: "Isenta/não tributada e com cobrança do ICMS por substituição tributária" },
  { codigo: "40", nome: "Isenta" },
  { codigo: "41", nome: "Não tributada" },
  { codigo: "50", nome: "Com suspensão" },
  { codigo: "51", nome: "Com diferimento" },
  { codigo: "60", nome: "ICMS cobrado anteriormente por substituição tributária" },
  { codigo: "70", nome: "Com redução da BC e cobrança do ICMS por substituição tributária" },
  { codigo: "90", nome: "Outras" },
];

/** "60 - ICMS cobrado anteriormente por substituição tributária" — mesmo formato usado tanto pra exibir na lista quanto pra salvar no campo, quando vem dessa lista. */
export function rotuloCstIcms(c: CstIcms): string {
  return `${c.codigo} - ${c.nome}`;
}
