/**
 * Leitura do XML de uma NF-e de SAÍDA (emitida pela própria empresa) só com
 * o que o TXT de importação do Domínio precisa: destinatário, totais,
 * ICMS/IPI agrupados, NCMs, PIS/COFINS e duplicatas. Regex simples sobre o
 * XML (mesma abordagem de xml-utils.ts) — a NF-e tem estrutura previsível e
 * não vale trazer um parser XML só pra isso.
 */

function texto(bloco: string, tag: string): string {
  const m = bloco.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([^<]*)</${tag}>`, "i"));
  return m?.[1]?.trim() ?? "";
}

function numero(bloco: string, tag: string): number {
  const n = Number(texto(bloco, tag));
  return Number.isFinite(n) ? n : 0;
}

function bloco(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return m?.[1] ?? "";
}

export interface DestinatarioSaida {
  documento: string; // CNPJ ou CPF (só dígitos); vazio se consumidor não identificado
  nome: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  codigoMunicipio: string;
  uf: string;
  cep: string;
  inscricaoEstadual: string;
}

export interface ItemSaida {
  ncm: string;
  cfop: string;
  /** vProd - vDesc + frete + seguro + outras despesas + IPI: o "valor contábil" do item. */
  valorContabil: number;
  valorProdutos: number;
  icms: { comCst: boolean; cst: string; base: number; aliquota: number; valor: number } | null;
  ipi: { tributado: boolean; cst: string; base: number; aliquota: number; valor: number };
}

export interface NotaSaidaLida {
  numero: string;
  serie: string;
  valorNota: number;
  valorIpi: number;
  destinatario: DestinatarioSaida;
  itens: ItemSaida[];
  pis: { cst: string; aliquotaPis: number | null; aliquotaCofins: number | null };
  duplicatas: { vencimento: Date | null; valor: number }[];
}

export function lerNotaSaida(xml: string): NotaSaidaLida {
  const ide = bloco(xml, "ide");
  const dest = bloco(xml, "dest");
  const ender = bloco(dest, "enderDest");

  const itens: ItemSaida[] = [];
  const dets = xml.match(/<det\s[^>]*>[\s\S]*?<\/det>/gi) ?? [];
  let pis: NotaSaidaLida["pis"] = { cst: "", aliquotaPis: null, aliquotaCofins: null };

  dets.forEach((det, indice) => {
    const prod = bloco(det, "prod");
    const imposto = bloco(det, "imposto");
    const icmsBloco = bloco(imposto, "ICMS");
    const ipiBloco = bloco(imposto, "IPI");

    const vIpi = numero(ipiBloco, "vIPI");
    const valorProdutos = numero(prod, "vProd");
    const valorContabil =
      valorProdutos -
      numero(prod, "vDesc") +
      numero(prod, "vFrete") +
      numero(prod, "vSeg") +
      numero(prod, "vOutro") +
      vIpi;

    const cstIcms = texto(icmsBloco, "CST");
    const icms = icmsBloco
      ? {
          comCst: cstIcms !== "", // vazio = Simples (CSOSN), que não gera os totalizadores 2020
          cst: cstIcms.slice(-2),
          base: numero(icmsBloco, "vBC"),
          aliquota: numero(icmsBloco, "pICMS"),
          valor: numero(icmsBloco, "vICMS"),
        }
      : null;

    const cstIpi = texto(ipiBloco, "CST");
    const ipiTributado = /<IPITrib>/i.test(ipiBloco) && vIpi > 0;

    itens.push({
      ncm: texto(prod, "NCM"),
      cfop: texto(prod, "CFOP"),
      valorContabil,
      valorProdutos: valorProdutos - numero(prod, "vDesc"),
      icms,
      ipi: {
        tributado: ipiTributado,
        cst: cstIpi,
        base: numero(ipiBloco, "vBC"),
        aliquota: numero(ipiBloco, "pIPI"),
        valor: vIpi,
      },
    });

    if (indice === 0) {
      const pisBloco = bloco(imposto, "PIS");
      const cofinsBloco = bloco(imposto, "COFINS");
      pis = {
        cst: texto(pisBloco, "CST"),
        aliquotaPis: /<PISAliq>/i.test(pisBloco) ? numero(pisBloco, "pPIS") : null,
        aliquotaCofins: /<COFINSAliq>/i.test(cofinsBloco) ? numero(cofinsBloco, "pCOFINS") : null,
      };
    }
  });

  const duplicatas = (xml.match(/<dup>[\s\S]*?<\/dup>/gi) ?? []).map((dup) => {
    const venc = texto(dup, "dVenc");
    return { vencimento: venc ? new Date(`${venc}T12:00:00Z`) : null, valor: numero(dup, "vDup") };
  });

  const totais = bloco(xml, "ICMSTot");
  return {
    numero: texto(ide, "nNF"),
    serie: texto(ide, "serie"),
    valorNota: numero(totais, "vNF"),
    valorIpi: numero(totais, "vIPI"),
    destinatario: {
      documento: texto(dest, "CNPJ") || texto(dest, "CPF"),
      nome: texto(dest, "xNome"),
      logradouro: texto(ender, "xLgr"),
      numero: texto(ender, "nro"),
      complemento: texto(ender, "xCpl"),
      bairro: texto(ender, "xBairro"),
      codigoMunicipio: texto(ender, "cMun"),
      uf: texto(ender, "UF"),
      cep: texto(ender, "CEP"),
      inscricaoEstadual: texto(dest, "IE"),
    },
    itens,
    pis,
    duplicatas,
  };
}
