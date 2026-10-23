import ExcelJS from "exceljs";
import type { ItemApuracao } from "./api";

const INICIO_DIACRITICOS = String.fromCharCode(0x0300);
const FIM_DIACRITICOS = String.fromCharCode(0x036f);
const MARCAS_DIACRITICAS = new RegExp("[" + INICIO_DIACRITICOS + "-" + FIM_DIACRITICOS + "]", "g");

function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(MARCAS_DIACRITICAS, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// Cores claras (fundo branco do Excel, não o tema escuro da tela) — mesma
// lógica de prioridade usada no destaque das linhas na tela.
const COR_CFOP_DIVERGENTE = "FFF4CCCC"; // vermelho claro
const COR_INCONSISTENTE = "FFFCE5CD"; // laranja claro
const COR_REGIME_MISTURADO = "FFE6CCF4"; // roxo claro
const COR_ALIQUOTA_DIVERGENTE = "FFCFE2F3"; // azul claro
const COR_IBS_CBS_AUSENTE = "FFFFF2CC"; // amarelo claro

function corDaLinha(item: ItemApuracao): string | null {
  if (item.cfopDivergente) return COR_CFOP_DIVERGENTE;
  if (item.tributosInconsistentes.length > 0) return COR_INCONSISTENTE;
  if (item.regimeIcmsMisturado) return COR_REGIME_MISTURADO;
  if (item.aliquotaIcmsDivergente) return COR_ALIQUOTA_DIVERGENTE;
  if (item.ibsCbsObrigatorioAusente) return COR_IBS_CBS_AUSENTE;
  return null;
}

function motivoDaLinha(item: ItemApuracao): string {
  const motivos = [
    item.cfopDivergente ? "CFOP divergente" : null,
    item.tributosInconsistentes.length > 0
      ? `Cálculo errado: ${item.tributosInconsistentes.join(", ")}`
      : null,
    item.regimeIcmsMisturado ? "Regime ICMS misturado (CST + CSOSN)" : null,
    item.aliquotaIcmsDivergente ? "Alíquota ICMS fora do padrão da empresa" : null,
    item.ibsCbsObrigatorioAusente ? "Falta o grupo IBS/CBS obrigatório" : null,
  ].filter((m): m is string => m !== null);
  return motivos.join(" / ");
}

async function baixarPlanilha(wb: ExcelJS.Workbook, nomeArquivo: string) {
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(url);
}

function aplicarCorELegenda(ws: ExcelJS.Worksheet, totalColunas: number, linhaLegendaInicial: number) {
  ws.getRow(1).font = { bold: true, size: 13 };
  const legenda: [string, string][] = [
    [COR_CFOP_DIVERGENTE, "CFOP divergente do esperado pelas regras fiscais"],
    [COR_INCONSISTENTE, "Base × alíquota não bate com o valor do XML"],
    [COR_REGIME_MISTURADO, "Nota com item em CST normal e item em CSOSN ao mesmo tempo"],
    [COR_ALIQUOTA_DIVERGENTE, "Alíquota de ICMS fora do padrão da própria empresa nesse CFOP"],
    [COR_IBS_CBS_AUSENTE, "Nota de 05/10/2026 em diante sem o grupo IBS/CBS obrigatório"],
  ];
  legenda.forEach(([cor, texto], i) => {
    const linha = linhaLegendaInicial + i;
    const celulaCor = ws.getCell(linha, 1);
    celulaCor.fill = { type: "pattern", pattern: "solid", fgColor: { argb: cor } };
    ws.getCell(linha, 2).value = texto;
  });
}

export async function exportarApuracaoIcmsExcel(
  itens: ItemApuracao[],
  empresaNome: string,
  cnpj: string,
  mesRotulo: string
): Promise<void> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Apuração ICMS");

  ws.addRow([`Apuração do ICMS - ${empresaNome} (${cnpj}) - ${mesRotulo}`]);
  ws.addRow([]);

  const colunas = [
    "nNF", "dhEmi", "nItem", "cProd", "xProd", "NCM", "CFOP",
    "CST ICMS", "vBC ICMS", "pICMS", "vICMS",
    "CST IPI", "vBC IPI", "pIPI", "vIPI",
    "CST PIS", "vBC PIS", "pPIS", "vPIS",
    "CST COFINS", "vBC COFINS", "pCOFINS", "vCOFINS",
    "Pendência",
  ];
  const linhaCabecalho = ws.addRow(colunas);
  linhaCabecalho.font = { bold: true };
  linhaCabecalho.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E1E1E" } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });

  for (const i of itens) {
    const linha = ws.addRow([
      i.nNF, i.dhEmi ?? "", i.nItem, i.cProd, i.xProd, i.ncm, i.cfop,
      i.icmsCst ?? "", i.icmsBase ?? "", i.icmsAliquota ?? "", i.icmsValor ?? "",
      i.ipiCst ?? "", i.ipiBase ?? "", i.ipiAliquota ?? "", i.ipiValor ?? "",
      i.pisCst ?? "", i.pisBase ?? "", i.pisAliquota ?? "", i.pisValor ?? "",
      i.cofinsCst ?? "", i.cofinsBase ?? "", i.cofinsAliquota ?? "", i.cofinsValor ?? "",
      motivoDaLinha(i),
    ]);
    const cor = corDaLinha(i);
    if (cor) {
      linha.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: cor } };
      });
    }
  }

  ws.addRow([]);
  ws.addRow(["Legenda das cores:"]);
  aplicarCorELegenda(ws, colunas.length, ws.rowCount + 1);

  ws.columns.forEach((col) => {
    col.width = 14;
  });
  ws.getColumn(5).width = 32; // xProd
  ws.getColumn(24).width = 40; // Pendência

  await baixarPlanilha(wb, `apuracao-icms-${slugify(`${empresaNome}-${mesRotulo}`)}.xlsx`);
}

export async function exportarApuracaoIbsCbsExcel(
  itens: ItemApuracao[],
  empresaNome: string,
  cnpj: string,
  mesRotulo: string
): Promise<void> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Apuração IBS-CBS");

  ws.addRow([`Apuração do IBS/CBS - ${empresaNome} (${cnpj}) - ${mesRotulo}`]);
  ws.addRow([]);

  const colunas = [
    "nNF", "dhEmi", "nItem", "cProd", "xProd", "NCM", "CFOP",
    "CST", "cClassTrib", "vBC",
    "pIBS UF", "vIBS UF", "pIBS Mun", "vIBS Mun", "pCBS", "vCBS",
    "Pendência",
  ];
  const linhaCabecalho = ws.addRow(colunas);
  linhaCabecalho.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E1E1E" } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });

  for (const i of itens) {
    const linha = ws.addRow([
      i.nNF, i.dhEmi ?? "", i.nItem, i.cProd, i.xProd, i.ncm, i.cfop,
      i.ibsCbsCst ?? "", i.cClassTrib ?? "", i.ibsCbsBase ?? "",
      i.ibsUfAliquota ?? "", i.ibsUfValor ?? "", i.ibsMunAliquota ?? "", i.ibsMunValor ?? "",
      i.cbsAliquota ?? "", i.cbsValor ?? "",
      motivoDaLinha(i),
    ]);
    const cor = corDaLinha(i);
    if (cor) {
      linha.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: cor } };
      });
    }
  }

  ws.addRow([]);
  ws.addRow(["Legenda das cores:"]);
  aplicarCorELegenda(ws, colunas.length, ws.rowCount + 1);

  ws.columns.forEach((col) => {
    col.width = 14;
  });
  ws.getColumn(5).width = 32; // xProd
  ws.getColumn(17).width = 40; // Pendência

  await baixarPlanilha(wb, `apuracao-ibs-cbs-${slugify(`${empresaNome}-${mesRotulo}`)}.xlsx`);
}

// Mapa de apuração do ICMS por CST (quadro clássico de livro fiscal) —
// pedido explícito do contador em 2026-10-22 (áudio): quebra o valor
// contábil de cada CFOP por situação tributária do ICMS, pra bater com o
// livro de apuração que ele já preenche manualmente hoje.
const CST_BUCKET: Record<string, keyof LinhaRelatorioCst["buckets"]> = {
  "20": "bReduzido",
  "40": "isentos",
  "41": "naoTrib",
  "51": "diferido",
  "60": "st",
  "10": "st",
  "50": "suspensao",
};

interface LinhaRelatorioCst {
  cfop: string;
  valorContabil: number;
  baseCalculo: number;
  icms: number;
  buckets: {
    bReduzido: number;
    isentos: number;
    naoTrib: number;
    diferido: number;
    st: number;
    suspensao: number;
    outras: number;
  };
}

function relatorioIcmsPorCst(itens: ItemApuracao[]): LinhaRelatorioCst[] {
  const porCfop = new Map<string, LinhaRelatorioCst>();
  for (const i of itens) {
    const linha = porCfop.get(i.cfop) ?? {
      cfop: i.cfop,
      valorContabil: 0,
      baseCalculo: 0,
      icms: 0,
      buckets: { bReduzido: 0, isentos: 0, naoTrib: 0, diferido: 0, st: 0, suspensao: 0, outras: 0 },
    };
    const valor = Number(i.valorProdutos);
    linha.valorContabil += valor;
    linha.baseCalculo += Number(i.icmsBase ?? 0);
    linha.icms += Number(i.icmsValor ?? 0);
    const bucket = i.icmsCst ? CST_BUCKET[i.icmsCst] : undefined;
    linha.buckets[bucket ?? "outras"] += valor;
    porCfop.set(i.cfop, linha);
  }
  return [...porCfop.values()].sort((a, b) => a.cfop.localeCompare(b.cfop));
}

export async function exportarRelatorioIcmsCst(
  itens: ItemApuracao[],
  empresaNome: string,
  cnpj: string,
  mesRotulo: string
): Promise<void> {
  const linhas = relatorioIcmsPorCst(itens);
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Apuração ICMS por CST");

  ws.addRow([`Apuração do ICMS por CST - ${empresaNome} (${cnpj}) - ${mesRotulo}`]);
  ws.getRow(1).font = { bold: true, size: 13 };
  ws.addRow([]);

  const colunas = [
    "CFOP",
    "Valor Contábil",
    "Base Cálculo",
    "ICMS",
    "B.Reduzido (CST 20)",
    "Isentos (CST 40)",
    "Não Trib. (CST 41)",
    "Diferido (CST 51)",
    "ST (CST 60/10)",
    "Suspensão (CST 50)",
    "Outras (CST 90 e demais)",
  ];
  const linhaCabecalho = ws.addRow(colunas);
  linhaCabecalho.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E1E1E" } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });

  const totais = {
    valorContabil: 0,
    baseCalculo: 0,
    icms: 0,
    bReduzido: 0,
    isentos: 0,
    naoTrib: 0,
    diferido: 0,
    st: 0,
    suspensao: 0,
    outras: 0,
  };

  for (const l of linhas) {
    ws.addRow([
      l.cfop,
      l.valorContabil.toFixed(2),
      l.baseCalculo.toFixed(2),
      l.icms.toFixed(2),
      l.buckets.bReduzido.toFixed(2),
      l.buckets.isentos.toFixed(2),
      l.buckets.naoTrib.toFixed(2),
      l.buckets.diferido.toFixed(2),
      l.buckets.st.toFixed(2),
      l.buckets.suspensao.toFixed(2),
      l.buckets.outras.toFixed(2),
    ]);
    totais.valorContabil += l.valorContabil;
    totais.baseCalculo += l.baseCalculo;
    totais.icms += l.icms;
    totais.bReduzido += l.buckets.bReduzido;
    totais.isentos += l.buckets.isentos;
    totais.naoTrib += l.buckets.naoTrib;
    totais.diferido += l.buckets.diferido;
    totais.st += l.buckets.st;
    totais.suspensao += l.buckets.suspensao;
    totais.outras += l.buckets.outras;
  }

  const linhaTotal = ws.addRow([
    "Total",
    totais.valorContabil.toFixed(2),
    totais.baseCalculo.toFixed(2),
    totais.icms.toFixed(2),
    totais.bReduzido.toFixed(2),
    totais.isentos.toFixed(2),
    totais.naoTrib.toFixed(2),
    totais.diferido.toFixed(2),
    totais.st.toFixed(2),
    totais.suspensao.toFixed(2),
    totais.outras.toFixed(2),
  ]);
  linhaTotal.font = { bold: true };

  ws.columns.forEach((col) => {
    col.width = 16;
  });
  ws.getColumn(1).width = 10;

  await baixarPlanilha(wb, `apuracao-icms-cst-${slugify(`${empresaNome}-${mesRotulo}`)}.xlsx`);
}
