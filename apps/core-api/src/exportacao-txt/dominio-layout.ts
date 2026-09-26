/**
 * Construtores das linhas do layout de importação de Notas Fiscais do
 * Domínio Sistemas (delimitado por "|").
 *
 * IMPORTANTE: não temos a especificação oficial da Domínio — isso foi
 * decodificado por engenharia reversa a partir de um arquivo de exemplo
 * real (ExportacaoDominio-ENDURO-08-2026.txt, na raiz do projeto). Só
 * preenchemos os campos que conseguimos confirmar cruzando com dados que
 * já conhecemos por outra via (chave de acesso, CFOP, valores da nota).
 * Campos cujo significado exato não foi confirmado ficam com o MESMO
 * valor constante observado no arquivo-modelo (comentado onde isso
 * acontece) — é a aposta mais segura possível sem documentação, mas se o
 * Domínio rejeitar o arquivo, esses são os primeiros suspeitos.
 *
 * FASE 1 (esta implementação): só o bloco de ENTRADA (0000/0010/1000).
 * Campo 5 do 1000 = acumulador e campo 6 = CFOP de ENTRADA (confirmado no modelo).
 * Ficam de fora, por não termos o dado de origem ainda:
 *  - 1020/1060 (totalizadores de ICMS/CFOP) — não capturamos impostos por
 *    item do XML, só o total da nota.
 *  - 1500 (parcelas/duplicatas) — não capturamos condição de pagamento.
 *  - Bloco 2000... (saída) — ainda não existe captura de NF-e/NFC-e de
 *    saída no sistema (ver docs/SESSAO_2026-09-09_relatorio-entrada-e-sync-sefaz.md).
 * Quando esses dados existirem, adicionar novas funções `linhaXXXX` aqui
 * seguindo o mesmo padrão — não precisa mexer no que já existe.
 */

import { decodificarChaveAcesso } from "@afe/shared";
import type { EnderecoEmitente } from "../documentos-fiscais/xml-utils";

function montarLinha(tamanho: number, valores: Record<number, string>): string {
  const campos = new Array<string>(tamanho).fill("");
  for (const [indice, valor] of Object.entries(valores)) {
    campos[Number(indice)] = valor;
  }
  return campos.join("|");
}

function formatarDataBR(data: Date): string {
  const dd = String(data.getUTCDate()).padStart(2, "0");
  const mm = String(data.getUTCMonth() + 1).padStart(2, "0");
  const aaaa = data.getUTCFullYear();
  return `${dd}/${mm}/${aaaa}`;
}

function formatarValorBR(valor: number): string {
  return valor.toFixed(2).replace(".", ",");
}

/** Registro 0000 — abertura do arquivo (CNPJ do estabelecimento/empresa cliente). */
export function linha0000(cnpjEmpresa: string): string {
  return montarLinha(4, { 1: "0000", 2: cnpjEmpresa });
}

export interface ParticipanteParaLayout {
  cnpj: string;
  razaoSocial: string;
  endereco: EnderecoEmitente | null;
  /** Mês de referência da exportação — usado só na "data de cadastro" do fornecedor. */
  mesReferencia: Date;
}

export type FornecedorParaLayout = ParticipanteParaLayout;

/**
 * Registro 0020 — cadastro de FORNECEDOR (participante das notas de entrada);
 * o 0010 é o cadastro de CLIENTE (participante das notas de saída). Confirmado
 * no arquivo-modelo: todo CNPJ dos 1000 está num 0020 e todo dos 2000 num 0010.
 */
export function linha0020(f: ParticipanteParaLayout): string {
  return participante("0020", 35, f, { 30: "N", 31: "N" });
}

/** Registro 0010 — cadastro de CLIENTE (destinatário das notas de saída). */
export function linha0010(f: ParticipanteParaLayout): string {
  return participante("0010", 34, f, { 28: "N" });
}

function participante(
  registro: string,
  tamanho: number,
  f: ParticipanteParaLayout,
  flagsExtras: Record<number, string>
): string {
  const dataCadastro = formatarDataBR(
    new Date(Date.UTC(f.mesReferencia.getUTCFullYear(), f.mesReferencia.getUTCMonth(), 1))
  );
  const end = f.endereco;

  return montarLinha(tamanho, {
    1: registro,
    2: f.cnpj,
    3: f.razaoSocial,
    5: end?.logradouro ?? "",
    6: end?.numero ?? "",
    7: end?.complemento ?? "",
    8: end?.bairro ?? "",
    9: end?.codigoMunicipio ?? "",
    10: end?.uf ?? "",
    12: end?.cep ?? "",
    13: end?.inscricaoEstadual ?? "",
    19: dataCadastro,
    // Flags cujo significado exato nao foi confirmado (sem documentacao
    // oficial) - mesmo valor constante visto em todos os registros 0010
    // do arquivo-modelo.
    22: "N",
    23: "7",
    24: "N",
    25: "N",
    ...flagsExtras,
  });
}


/**
 * A nota do fornecedor traz o CFOP DELE (de saída: 5.xxx dentro do estado,
 * 6.xxx fora, 7.xxx exterior). O Domínio espera no registro de entrada o
 * CFOP de ENTRADA equivalente (1.xxx / 2.xxx / 3.xxx). A troca do primeiro
 * dígito cobre a grande maioria; as poucas exceções comuns ficam na tabela
 * abaixo (ex.: 5.405 - substituição tributária - entra como 1.403).
 */
const EXCECOES_CFOP_ENTRADA: Record<string, string> = {
  "405": "403",
};

export function cfopDeEntrada(cfopEmitente: string): string {
  const cfop = cfopEmitente.replace(/\D/g, "");
  if (cfop.length !== 4) return cfopEmitente;
  const primeiro = cfop.charAt(0);
  const resto = cfop.slice(1);
  const novoPrimeiro = primeiro === "5" ? "1" : primeiro === "6" ? "2" : primeiro === "7" ? "3" : primeiro;
  // 1.xxx / 2.xxx / 3.xxx já são CFOPs de entrada: não mexe.
  if (novoPrimeiro === primeiro && ["1", "2", "3"].includes(primeiro)) return cfop;
  return `${novoPrimeiro}${EXCECOES_CFOP_ENTRADA[resto] ?? resto}`;
}

export interface NotaEntradaParaLayout {
  chaveAcesso: string;
  cfop: string;
  valorTotal: number;
  dataEmissao: Date;
  dataRecebimento: Date;
  /** Código do acumulador (da regra fiscal que classificou a nota); vazio se a nota ainda não foi classificada. */
  acumulador: string | null;
}

/** Registro 1000 — nota fiscal de entrada. */
export function linha1000(n: NotaEntradaParaLayout): string {
  const chave = decodificarChaveAcesso(n.chaveAcesso);
  if (!chave) {
    throw new Error(`Chave de acesso inválida pra exportação TXT: ${n.chaveAcesso}`);
  }
  const valorFormatado = formatarValorBR(n.valorTotal);
  const cfopEntrada = cfopDeEntrada(n.cfop);

  return montarLinha(100, {
    1: "1000",
    2: "36", // constante observada no arquivo-modelo, significado nao confirmado
    3: chave.cnpjEmitente,
    // Confirmado no arquivo-modelo: este campo guarda o código do acumulador
    // (valores como 1, 3, 23, 59, 61, 65) e o seguinte é o CFOP de entrada.
    5: n.acumulador ?? "",
    6: cfopEntrada,
    7: "1", // constante observada no arquivo-modelo, significado nao confirmado
    8: String(chave.numeroDocumento),
    9: String(chave.serie),
    11: formatarDataBR(n.dataRecebimento),
    12: formatarDataBR(n.dataEmissao),
    13: valorFormatado,
    16: "F", // constante observada, significado nao confirmado
    17: "T", // idem
    25: "E", // idem
    26: "0,00",
    27: "0,00",
    28: "0,00",
    39: valorFormatado,
    52: "N",
    54: n.chaveAcesso,
    57: cfopEntrada,
    90: "0,00",
  });
}


// ── Bloco de SAÍDA (2000/2020/2060/2500) — decodificado do mesmo arquivo-modelo ──

/** Formato dos totalizadores 2060 no modelo: sem zeros à direita ("6201,6", "4092", "0"). */
function numeroCurto(valor: number): string {
  return String(Math.round(valor * 100) / 100).replace(".", ",");
}

export interface NotaSaidaParaLayout {
  chaveAcesso: string;
  acumulador: string | null;
  cfop: string;
  ufDestinatario: string;
  documentoDestinatario: string;
  dataEmissao: Date;
  valorNota: number;
  valorIpi: number;
  pisCst: string;
  aliquotaPis: number | null;
  aliquotaCofins: number | null;
}

/** Registro 2000 — nota fiscal de saída. O CFOP vai como está na nota (sem conversão). */
export function linha2000(n: NotaSaidaParaLayout): string {
  const chave = decodificarChaveAcesso(n.chaveAcesso);
  if (!chave) {
    throw new Error(`Chave de acesso inválida pra exportação TXT: ${n.chaveAcesso}`);
  }
  const data = formatarDataBR(n.dataEmissao);
  return montarLinha(79, {
    1: "2000",
    2: "36", // constante observada no arquivo-modelo, significado nao confirmado
    3: n.documentoDestinatario,
    4: n.acumulador ?? "",
    5: n.cfop,
    7: n.ufDestinatario,
    8: "1", // "0" nas notas canceladas / de entrada propria no modelo
    9: String(chave.numeroDocumento),
    10: String(chave.serie),
    12: data,
    13: data,
    14: formatarValorBR(n.valorNota),
    18: "T",
    31: formatarValorBR(n.valorNota - n.valorIpi),
    37: "00",
    41: "0",
    45: n.chaveAcesso,
    52: n.pisCst,
    56: n.aliquotaPis !== null ? formatarValorBR(n.aliquotaPis) : "",
    57: n.aliquotaCofins !== null ? formatarValorBR(n.aliquotaCofins) : "",
    69: formatarValorBR(n.valorIpi),
    77: data,
  });
}

export interface TotalImpostoParaLayout {
  /** 1 = ICMS, 2 = IPI. */
  tipo: 1 | 2;
  base: number;
  aliquota: number;
  valor: number;
  isentas: number;
  outras: number;
  valorContabil: number;
}

/** Registro 2020 — totalizador de ICMS (tipo 1) ou IPI (tipo 2) da nota, um por combinação de classificação/alíquota. */
export function linha2020(t: TotalImpostoParaLayout): string {
  return montarLinha(16, {
    1: "2020",
    2: String(t.tipo),
    3: "0,00",
    4: formatarValorBR(t.base),
    5: formatarValorBR(t.aliquota),
    6: formatarValorBR(t.valor),
    7: formatarValorBR(t.isentas),
    8: formatarValorBR(t.outras),
    9: formatarValorBR(t.valorContabil),
    10: "0,00",
    11: "0,00",
    12: "0,00",
  });
}

/** Registro 2060 — totalizador por NCM da nota. */
export function linha2060(ncm: string, valorProdutos: number, valorIpi: number): string {
  return montarLinha(9, {
    1: "2060",
    2: ncm,
    3: numeroCurto(valorProdutos),
    4: numeroCurto(valorProdutos),
    5: numeroCurto(valorIpi),
  });
}

/** Registro 2500 — parcela (duplicata) da nota de saída; identificação "número/parcela". */
export function linha2500(vencimento: Date | null, valor: number, numeroNota: string, parcela: number): string {
  return montarLinha(24, {
    1: "2500",
    2: vencimento ? formatarDataBR(vencimento) : "",
    3: formatarValorBR(valor),
    22: `${numeroNota}/${String(parcela).padStart(2, "0")}`,
  });
}
