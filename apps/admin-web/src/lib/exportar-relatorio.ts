import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { formatarData, formatarMoeda } from "./format";

export interface LinhaRelatorioEntrada {
  data: string;
  numero: string;
  emitente: string;
  valor: string | null;
}

const INICIO_DIACRITICOS = String.fromCharCode(0x0300);
const FIM_DIACRITICOS = String.fromCharCode(0x036f);
const MARCAS_DIACRITICAS = new RegExp("[" + INICIO_DIACRITICOS + "-" + FIM_DIACRITICOS + "]", "g");

function nomeArquivo(empresaNome: string, mesRotulo: string, extensao: string): string {
  const slug = `${empresaNome}-${mesRotulo}`
    .normalize("NFD")
    .replace(MARCAS_DIACRITICAS, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `notas-entrada-${slug}.${extensao}`;
}

export function exportarNotasEntradaPdf(
  linhas: LinhaRelatorioEntrada[],
  empresaNome: string,
  mesRotulo: string
): void {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Notas de entrada - ${empresaNome}`, 14, 16);
  doc.setFontSize(10);
  doc.text(`Periodo: ${mesRotulo}`, 14, 23);

  const total = linhas.reduce((soma, linha) => soma + (linha.valor ? Number(linha.valor) : 0), 0);

  autoTable(doc, {
    startY: 28,
    head: [["Data", "No", "Emitente", "Valor"]],
    body: linhas.map((linha) => [
      formatarData(linha.data),
      linha.numero,
      linha.emitente,
      formatarMoeda(linha.valor),
    ]),
    foot: [["", "", "Total", formatarMoeda(total)]],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [30, 30, 30] },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold" },
  });

  doc.save(nomeArquivo(empresaNome, mesRotulo, "pdf"));
}

export function exportarNotasEntradaExcel(
  linhas: LinhaRelatorioEntrada[],
  empresaNome: string,
  mesRotulo: string
): void {
  const dados = linhas.map((linha) => ({
    Data: formatarData(linha.data),
    Numero: linha.numero,
    Emitente: linha.emitente,
    Valor: linha.valor ? Number(linha.valor) : 0,
  }));

  const planilha = XLSX.utils.json_to_sheet(dados);
  planilha["!cols"] = [{ wch: 12 }, { wch: 10 }, { wch: 48 }, { wch: 16 }];

  const livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Notas de entrada");
  XLSX.writeFile(livro, nomeArquivo(empresaNome, mesRotulo, "xlsx"));
}
