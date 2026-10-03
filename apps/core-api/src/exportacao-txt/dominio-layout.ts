/**
 * Construtores das linhas do layout de importação de Notas Fiscais do
 * Domínio Sistemas (delimitado por "|").
 *
 * O bloco de ENTRADA (0000/0010(cliente)/0020(fornecedor)/1000) foi
 * decodificado por engenharia reversa a partir de um arquivo de exemplo
 * real (ExportacaoDominio-ENDURO-08-2026.txt, na raiz do projeto), sem
 * especificação oficial — por isso os comentários de cada campo dizem o
 * que foi ou não confirmado.
 *
 * O bloco de SAÍDA (2000/2010/2020/2030/2060/2500) já usa a especificação
 * oficial da Domínio ("Leiaute: Domínio Sistemas com Separador", registros
 * 2000+ — suporte.dominioatendimento.com/central/faces/solucao.html?codigo=672),
 * cruzada campo a campo com o mesmo arquivo de exemplo pra confirmar o que
 * cada posição realmente carrega na prática (a doc lista o campo mas nem
 * sempre deixa claro o formato exato usado). Registro 2030 (itens da nota)
 * tem 118 campos na especificação — a maioria é de regime específico
 * (combustíveis, veículos, medicamentos, EFD-Reinf, IBS/CBS da reforma
 * tributária); só preenchemos os campos comerciais/tributários universais
 * (ver comentário em `linha2030`). Registros 2081/2082 (documentos
 * referenciados) ficam de fora — só se aplicam quando a nota referencia
 * outro documento (ex.: devolução), e o campo "Cliente/Fornecedor" deles
 * exige casar com um cadastro que não temos como resolver com segurança.
 *
 * Ficam de fora por não termos o dado de origem:
 *  - 1020/1060 (totalizadores de ICMS/CFOP da ENTRADA) — não capturamos
 *    impostos por item do XML de entrada, só o total da nota.
 *  - 1500 (parcelas/duplicatas da ENTRADA) — não capturamos condição de
 *    pagamento nessas notas.
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

/**
 * Código de <modFrete> da NFe (0..9) pra letra que a Domínio espera no
 * campo 18 do registro 2000. Confirmado só o "2" (a maioria das notas do
 * arquivo-modelo é frete por conta de terceiros, campo = "T"); os outros
 * seguem a mesma lista de opções documentada no campo (C/F/S/T/R/D).
 */
const MODALIDADE_FRETE: Record<string, string> = {
  "0": "C", // contratação por conta do remetente (CIF)
  "1": "F", // contratação por conta do destinatário (FOB)
  "2": "T", // contratação por conta de terceiros
  "3": "R", // transporte próprio por conta do remetente
  "4": "D", // transporte próprio por conta do destinatário
  "9": "S", // sem transporte
};

export interface NotaSaidaParaLayout {
  chaveAcesso: string;
  acumulador: string | null;
  cfop: string;
  ufDestinatario: string;
  documentoDestinatario: string;
  inscricaoEstadualDestinatario: string;
  modalidadeFrete: string;
  dataEmissao: Date;
  valorNota: number;
  valorIpi: number;
  pisCst: string;
  aliquotaPis: number | null;
  aliquotaCofins: number | null;
  /** cStat=101 (cancelamento homologado) na consulta de situação — ver registros filhos (2020/2030/2060/2500) não são gerados pra nota cancelada. */
  cancelada?: boolean;
}

/**
 * Registro 2000 — nota fiscal de saída (spec confirmada: campo 3 =
 * Inscrição do cliente, 4 = acumulador, 5 = CFOP sem conversão, 7 = UF do
 * cliente, 9/10 = número/série da chave, 14 = valor contábil, 31 = valor
 * dos produtos = valor contábil - IPI, 45 = chave, 69 = valor do IPI, 77 =
 * data de entrega — todos batendo exatamente com o arquivo-modelo).
 * Campos 2/8/37/41 ficam com o valor constante observado (a doc não deixa
 * claro o que gera "Código da espécie"/"Segmento"/"Tipo do Título" e o
 * arquivo-modelo só tem essas notas fiscais eletrônicas comuns, sem
 * variação pra confirmar).
 *
 * Nota cancelada (cStat=101 na consulta de situação — ver
 * documentos-fiscais.service.ts `consultarSituacao`) sai como uma linha
 * especial, formato confirmado no arquivo-modelo: valor zerado, campo 16
 * = "NF CANCELADA", campo 8 = "0", campo 37 = "2", sem IE/PIS/COFINS/IPI
 * preenchidos — e sem nenhum registro filho (2020/2030/2060/2500).
 */
export function linha2000(n: NotaSaidaParaLayout): string {
  const chave = decodificarChaveAcesso(n.chaveAcesso);
  if (!chave) {
    throw new Error(`Chave de acesso inválida pra exportação TXT: ${n.chaveAcesso}`);
  }
  const data = formatarDataBR(n.dataEmissao);

  if (n.cancelada) {
    return montarLinha(79, {
      1: "2000",
      2: "36",
      3: n.documentoDestinatario,
      4: n.acumulador ?? "",
      5: n.cfop,
      7: n.ufDestinatario,
      8: "0",
      9: String(chave.numeroDocumento),
      10: String(chave.serie),
      12: data,
      13: data,
      14: "0",
      16: "NF CANCELADA",
      18: MODALIDADE_FRETE[n.modalidadeFrete] ?? "T",
      31: "0",
      37: "2",
      41: "0",
      45: n.chaveAcesso,
      77: data,
    });
  }

  return montarLinha(79, {
    1: "2000",
    2: "36", // constante observada no arquivo-modelo, significado nao confirmado (Codigo da especie)
    3: n.documentoDestinatario,
    4: n.acumulador ?? "",
    5: n.cfop,
    7: n.ufDestinatario,
    8: "1", // constante observada (Segmento) - "0" nas notas canceladas no modelo
    9: String(chave.numeroDocumento),
    10: String(chave.serie),
    12: data,
    13: data,
    14: formatarValorBR(n.valorNota),
    18: MODALIDADE_FRETE[n.modalidadeFrete] ?? "T",
    31: formatarValorBR(n.valorNota - n.valorIpi),
    37: "00", // Codigo do modelo do Documento Fiscal - "0" = documento regular
    41: "0", // constante observada (Tipo do Titulo)
    43: n.inscricaoEstadualDestinatario,
    45: n.chaveAcesso,
    52: n.pisCst,
    56: n.aliquotaPis !== null ? formatarValorBR(n.aliquotaPis) : "",
    57: n.aliquotaCofins !== null ? formatarValorBR(n.aliquotaCofins) : "",
    69: formatarValorBR(n.valorIpi),
    77: data,
  });
}

/** Registro 2010 — informações complementares da nota de saída (o texto de <infCpl> do XML). Só gerado quando a nota tem esse texto. */
export function linha2010(informacoesComplementares: string): string {
  return montarLinha(3, {
    1: "2010",
    2: "1", // 1 = informação complementar de interesse do fisco
    3: informacoesComplementares.slice(0, 300),
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

export interface ItemSaidaParaLayout {
  codigoProduto: string;
  quantidade: number;
  valorIpi: number;
  baseCalculoIcms: number;
  dataEmissao: Date;
  cstIcms: string;
  valorBrutoProduto: number;
  valorDesconto: number;
  baseCalculoIcmsSt: number;
  aliquotaIcms: number;
  valorIcms: number;
  valorIcmsSt: number;
  valorUnitario: number;
  cstIpi: string;
  aliquotaIpi: number;
  cstPis: string;
  baseCalculoPis: number;
  aliquotaPis: number;
  valorPis: number;
  cstCofins: string;
  baseCalculoCofins: number;
  aliquotaCofins: number;
  valorCofins: number;
  valorContabil: number;
}

/**
 * Registro 2030 — item (produto) da nota de saída, registro filho do 2000.
 * A especificação oficial tem 118 campos; só preenchemos os universais pra
 * NF-e de mercadoria comum (comercial + ICMS/IPI/PIS/COFINS por item) — os
 * demais são de regime específico que este sistema não trata ainda:
 * combustíveis (bico/tanque), veículos (chassi), medicamentos (lote),
 * EFD-Reinf (receita bruta por atividade) e IBS/CBS (reforma tributária,
 * campos 111-118). Se algum cliente precisar de um desses, é só adicionar
 * o campo aqui.
 */
export function linha2030(i: ItemSaidaParaLayout): string {
  const data = formatarDataBR(i.dataEmissao);
  return montarLinha(62, {
    1: "2030",
    2: i.codigoProduto,
    3: formatarValorBR(i.quantidade),
    4: formatarValorBR(i.baseCalculoIcms + i.valorIpi), // "Base Cal. + IPI", conforme a especificação
    5: formatarValorBR(i.valorIpi),
    6: formatarValorBR(i.baseCalculoIcms),
    7: "1", // tipo de lancamento: 1 = produto vinculado a nota
    8: data,
    9: i.cstIcms,
    10: formatarValorBR(i.valorBrutoProduto),
    11: formatarValorBR(i.valorDesconto),
    12: formatarValorBR(i.baseCalculoIcms),
    13: formatarValorBR(i.baseCalculoIcmsSt),
    14: formatarValorBR(i.aliquotaIcms),
    23: formatarValorBR(i.valorIcms),
    24: formatarValorBR(i.valorIcmsSt),
    27: formatarValorBR(i.valorUnitario),
    29: i.cstIpi,
    30: formatarValorBR(i.aliquotaIpi),
    48: i.cstPis,
    49: formatarValorBR(i.baseCalculoPis),
    50: formatarValorBR(i.aliquotaPis),
    51: formatarValorBR(i.valorPis),
    52: i.cstCofins,
    53: formatarValorBR(i.baseCalculoCofins),
    54: formatarValorBR(i.aliquotaCofins),
    55: formatarValorBR(i.valorCofins),
    62: formatarValorBR(i.valorContabil),
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
