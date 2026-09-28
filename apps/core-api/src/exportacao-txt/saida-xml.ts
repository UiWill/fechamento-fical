/**
 * Leitura do XML de uma NF-e de SAÍDA (emitida pela própria empresa) só com
 * o que o TXT de importação do Domínio precisa: destinatário, totais,
 * ICMS/IPI agrupados, itens, PIS/COFINS e duplicatas. Regex simples sobre o
 * XML (mesma abordagem de xml-utils.ts) — a NF-e tem estrutura previsível e
 * não vale trazer um parser XML só pra isso.
 *
 * Campos mapeados 1:1 com a especificação oficial da Domínio Sistemas
 * ("Leiaute: Domínio Sistemas com Separador", registros 2000/2010/2020/2030 —
 * suporte.dominioatendimento.com, código 672), não mais por engenharia
 * reversa: o PDF baixado dessa página tem a tabela de campo completa.
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

/** PIS ou COFINS de um item — mesma forma pros dois tributos. */
export interface TributoItem {
  cst: string;
  base: number;
  aliquota: number;
  valor: number;
}

export interface ItemSaida {
  codigoProduto: string;
  ncm: string;
  cfop: string;
  quantidade: number;
  valorUnitario: number;
  /** vProd - vDesc + frete + seguro + outras despesas + IPI: o "valor contábil" do item (registro 2000 campo 62). */
  valorContabil: number;
  valorProdutos: number;
  valorDesconto: number;
  icms: { comCst: boolean; cst: string; base: number; baseSt: number; valorSt: number; aliquota: number; valor: number } | null;
  ipi: { tributado: boolean; cst: string; base: number; aliquota: number; valor: number };
  pis: TributoItem;
  cofins: TributoItem;
}

export interface NotaSaidaLida {
  numero: string;
  serie: string;
  valorNota: number;
  valorIpi: number;
  /** Código NFe de <modFrete> (0..9) — convertido pro código de letra da Domínio na hora de montar a linha 2000. */
  modalidadeFrete: string;
  /** <infCpl> — vira o registro 2010 (Informações Complementares) quando presente. */
  informacoesComplementares: string;
  destinatario: DestinatarioSaida;
  itens: ItemSaida[];
  pis: { cst: string; aliquotaPis: number | null; aliquotaCofins: number | null };
  duplicatas: { vencimento: Date | null; valor: number }[];
}

export function lerNotaSaida(xml: string): NotaSaidaLida {
  const ide = bloco(xml, "ide");
  const dest = bloco(xml, "dest");
  const ender = bloco(dest, "enderDest");
  const transp = bloco(xml, "transp");
  const infAdic = bloco(xml, "infAdic");

  const itens: ItemSaida[] = [];
  const dets = xml.match(/<det\s[^>]*>[\s\S]*?<\/det>/gi) ?? [];
  let pis: NotaSaidaLida["pis"] = { cst: "", aliquotaPis: null, aliquotaCofins: null };

  dets.forEach((det, indice) => {
    const prod = bloco(det, "prod");
    const imposto = bloco(det, "imposto");
    const icmsBloco = bloco(imposto, "ICMS");
    const ipiBloco = bloco(imposto, "IPI");
    const pisBloco = bloco(imposto, "PIS");
    const cofinsBloco = bloco(imposto, "COFINS");

    const vIpi = numero(ipiBloco, "vIPI");
    const valorProdutos = numero(prod, "vProd");
    const valorDesconto = numero(prod, "vDesc");
    const valorContabil =
      valorProdutos - valorDesconto + numero(prod, "vFrete") + numero(prod, "vSeg") + numero(prod, "vOutro") + vIpi;

    const cstIcms = texto(icmsBloco, "CST");
    const icms = icmsBloco
      ? {
          comCst: cstIcms !== "", // vazio = Simples (CSOSN), que não gera os totalizadores 2020
          cst: cstIcms.slice(-2),
          base: numero(icmsBloco, "vBC"),
          baseSt: numero(icmsBloco, "vBCST"),
          valorSt: numero(icmsBloco, "vICMSST"),
          aliquota: numero(icmsBloco, "pICMS"),
          valor: numero(icmsBloco, "vICMS"),
        }
      : null;

    const cstIpi = texto(ipiBloco, "CST");
    const ipiTributado = /<IPITrib>/i.test(ipiBloco) && vIpi > 0;

    const pisItem: TributoItem = {
      cst: texto(pisBloco, "CST"),
      base: numero(pisBloco, "vBC"),
      aliquota: numero(pisBloco, "pPIS"),
      valor: numero(pisBloco, "vPIS"),
    };
    const cofinsItem: TributoItem = {
      cst: texto(cofinsBloco, "CST"),
      base: numero(cofinsBloco, "vBC"),
      aliquota: numero(cofinsBloco, "pCOFINS"),
      valor: numero(cofinsBloco, "vCOFINS"),
    };

    itens.push({
      codigoProduto: texto(prod, "cProd"),
      ncm: texto(prod, "NCM"),
      cfop: texto(prod, "CFOP"),
      quantidade: numero(prod, "qCom"),
      valorUnitario: numero(prod, "vUnCom"),
      valorContabil,
      valorProdutos: valorProdutos - valorDesconto,
      valorDesconto,
      icms,
      ipi: {
        tributado: ipiTributado,
        cst: cstIpi,
        base: numero(ipiBloco, "vBC"),
        aliquota: numero(ipiBloco, "pIPI"),
        valor: vIpi,
      },
      pis: pisItem,
      cofins: cofinsItem,
    });

    if (indice === 0) {
      pis = {
        cst: pisItem.cst,
        aliquotaPis: /<PISAliq>/i.test(pisBloco) ? pisItem.aliquota : null,
        aliquotaCofins: /<COFINSAliq>/i.test(cofinsBloco) ? cofinsItem.aliquota : null,
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
    modalidadeFrete: texto(transp, "modFrete"),
    informacoesComplementares: texto(infAdic, "infCpl"),
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
