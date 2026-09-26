/**
 * Leitura dos dados de um CT-e (procCTe) que a tela precisa mostrar além do
 * que o extrator genérico (@afe/shared) já pega (chave, emitente, valor,
 * data). Mesmo estilo dele: regex sobre o texto do XML, sem parser de XML.
 */

export interface DetalheCte {
  /** Papéis da empresa no CT-e (uma empresa pode ser mais de um). */
  papeis: string[];
  tomador: string | null;
  remetente: string | null;
  destinatario: string | null;
  origem: string | null;
  destino: string | null;
  tipoCte: string | null;
  naturezaOperacao: string | null;
  cfop: string | null;
  cancelado?: boolean;
}

function bloco(xml: string, tag: string): string {
  return new RegExp(`<${tag}(?:\\s[^>]*)?>[\\s\\S]*?</${tag}>`).exec(xml)?.[0] ?? "";
}

function texto(xml: string, tag: string): string {
  return new RegExp(`<${tag}(?:\\s[^>]*)?>([^<]*)</${tag}>`).exec(xml)?.[1]?.trim() ?? "";
}

function documentoDoBloco(b: string): string {
  return texto(b, "CNPJ") || texto(b, "CPF");
}

function rotulo(municipio: string, uf: string): string | null {
  const partes = [municipio, uf].filter(Boolean);
  return partes.length ? partes.join("/") : null;
}

export function extrairDetalheCte(xml: string, cnpjEmpresa: string): DetalheCte {
  const ide = bloco(xml, "ide");
  const rem = bloco(xml, "rem");
  const exped = bloco(xml, "exped");
  const receb = bloco(xml, "receb");
  const dest = bloco(xml, "dest");

  // Tomador: toma3 aponta pra um dos participantes (0 rem, 1 exped, 2 receb,
  // 3 dest); toma4 traz os dados do tomador dentro dele mesmo.
  const toma3 = bloco(ide, "toma3");
  const toma4 = bloco(ide, "toma4");
  let blocoTomador = "";
  if (toma3) {
    const codigo = texto(toma3, "toma");
    blocoTomador = { "0": rem, "1": exped, "2": receb, "3": dest }[codigo] ?? "";
  } else if (toma4) {
    blocoTomador = toma4;
  }

  const papeis: string[] = [];
  if (documentoDoBloco(rem) === cnpjEmpresa) papeis.push("Remetente");
  if (documentoDoBloco(exped) === cnpjEmpresa) papeis.push("Expedidor");
  if (documentoDoBloco(receb) === cnpjEmpresa) papeis.push("Recebedor");
  if (documentoDoBloco(dest) === cnpjEmpresa) papeis.push("Destinatário");
  if (blocoTomador && documentoDoBloco(blocoTomador) === cnpjEmpresa) papeis.push("Tomador");

  return {
    papeis,
    tomador: texto(blocoTomador, "xNome") || null,
    remetente: texto(rem, "xNome") || null,
    destinatario: texto(dest, "xNome") || null,
    origem: rotulo(texto(ide, "xMunIni"), texto(ide, "UFIni")),
    destino: rotulo(texto(ide, "xMunFim"), texto(ide, "UFFim")),
    tipoCte: texto(ide, "tpCTe") || null,
    naturezaOperacao: texto(ide, "natOp") || null,
    cfop: texto(ide, "CFOP") || null,
  };
}

/** Evento de CT-e (procEventoCTe): devolve a chave e o tipo (110111 = cancelamento). */
export function extrairEventoCte(xml: string): { chave: string; tipoEvento: string } | null {
  const chave = texto(xml, "chCTe");
  const tipoEvento = texto(xml, "tpEvento");
  return chave.length === 44 && tipoEvento ? { chave, tipoEvento } : null;
}
