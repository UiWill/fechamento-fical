/**
 * Construtores das linhas do layout de importação de Notas Fiscais do
 * Domínio Sistemas (delimitado por "|").
 *
 * Desde 2026-11, todo o arquivo (entrada E saída) é cruzado campo a campo
 * contra a especificação oficial da Domínio ("Leiaute: Domínio Sistemas
 * com Separador" — Importação_com_separador.pdf, documento de 22/05/2019,
 * baixado como 653523320-Layout-Dominio-Sistemas-Separador.pdf na raiz do
 * projeto) e, quando possível, também contra um arquivo-modelo real
 * (ExportacaoDominio-ENDURO-08-2026.txt) pra confirmar o formato exato
 * usado na prática — a doc lista o campo mas nem sempre deixa claro o
 * formato. O bloco 0000/0010/0020/1000 foi originalmente decodificado só
 * por engenharia reversa (sem a doc, que não existia ainda neste projeto);
 * os campos cujo comentário diz "não confirmado" continuam sendo os que só
 * têm essa origem — a doc oficial não ajuda a confirmá-los (ex.: campo 2 de
 * cada registro, "Código da espécie"/constantes sem variação no modelo).
 *
 * IMPORTANTE: o PDF de 2019 é anterior à Reforma Tributária (LC 214/2025) —
 * não tem NENHUM campo de IBS/CBS em registro nenhum (nem no 2030). Um
 * comentário antigo deste arquivo mencionava "campos 111-118 de IBS/CBS" no
 * registro 2030; isso nunca foi confirmado contra uma especificação real e
 * foi removido. Os campos de IBS/CBS que o sistema já trata (telas de
 * Apuração do IBS/CBS, grupo <gIBSCBS> do XML) vivem em `ItemDocumentoFiscal`
 * (ver itens-documento-fiscal.service.ts), não neste TXT — a Domínio ainda
 * não documentou publicamente onde esses valores entram neste leiaute.
 *
 * Registros deliberadamente de fora, com o motivo real (não "falta
 * implementar"):
 *  - 1081-1084/2081-2082 (documentos referenciados) — só se aplicam quando
 *    a nota referencia outro documento (ex.: devolução), e o campo
 *    "Cliente/Fornecedor" deles exige casar com um cadastro que não temos
 *    como resolver com segurança.
 *  - 1060/2060-INSS, 1070, 1090, 1097, 1120, 1130, 1145, 1200, 1300/1310/1330
 *    (lançamentos contábeis), e a grande maioria dos campos de 1030/2030 —
 *    específicos de UF (MG/SP/GO/BA/PE/SE/RS/DF/PA/MT) ou de regime/segmento
 *    que não se aplica a este cliente (combustíveis, veículos, medicamentos,
 *    INSS sobre receita bruta por atividade, EFD-Reinf, contabilidade
 *    integrada). Ver o comentário de cada `linhaXXXX` pros detalhes de quais
 *    campos universais efetivamente entram.
 *  - 1050/1055 (empreendimento imobiliário) — regime não aplicável.
 *  - 0011/0012/0021/0022/0030+ (alterações cadastrais, dependentes,
 *    remetente/destinatário de transporte) — fora do escopo de nota de
 *    mercadoria comum.
 */

import { decodificarChaveAcesso } from "@afe/shared";
import type { EnderecoEmitente } from "../documentos-fiscais/xml-utils";

// Campos de texto livre do XML (descrição de produto, informações
// complementares etc.) podem trazer "|" ou quebra de linha — sem
// sanitizar, isso desalinha os campos da linha ou injeta uma linha nova
// falsa no arquivo que a Domínio vai importar.
function sanitizarCampo(valor: string): string {
  return valor.replace(/[|\r\n]/g, " ");
}

function montarLinha(tamanho: number, valores: Record<number, string>): string {
  const campos = new Array<string>(tamanho).fill("");
  for (const [indice, valor] of Object.entries(valores)) {
    campos[Number(indice)] = sanitizarCampo(valor);
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
  /**
   * Dados do XML do fornecedor pro header (campos 16/26/27/28/39) — opcional
   * porque nem todo chamador tem o XML lido ainda (ver exportacao-txt.service.ts);
   * sem isso os campos ficam "0,00"/vazios como antes.
   */
  totaisXml?: { modalidadeFrete: string; valorProdutos: number; valorFrete: number; valorSeguro: number; valorDespesas: number };
}

/**
 * Campo 16 (modalidade do frete) do registro 1000 — a especificação oficial
 * só documenta "C=CIF ou F=FOB" pra este campo (diferente do campo 18 do
 * 2000/saída, que no arquivo-modelo real tem 6 valores — não misturar os
 * dois). <modFrete> fora de 0/1 (por conta de terceiros, transporte
 * próprio, sem transporte) não tem valor documentado aqui; fica em branco
 * em vez de chutar.
 */
const MODALIDADE_FRETE_ENTRADA: Record<string, string> = { "0": "C", "1": "F" };

/** Registro 1000 — nota fiscal de entrada. */
export function linha1000(n: NotaEntradaParaLayout): string {
  const chave = decodificarChaveAcesso(n.chaveAcesso);
  if (!chave) {
    throw new Error(`Chave de acesso inválida pra exportação TXT: ${n.chaveAcesso}`);
  }
  const valorFormatado = formatarValorBR(n.valorTotal);
  const cfopEntrada = cfopDeEntrada(n.cfop);
  const t = n.totaisXml;

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
    16: t ? MODALIDADE_FRETE_ENTRADA[t.modalidadeFrete] ?? "" : "F",
    17: "T", // constante observada, significado nao confirmado
    25: "E", // idem
    26: t ? formatarValorBR(t.valorFrete) : "0,00",
    27: t ? formatarValorBR(t.valorSeguro) : "0,00",
    28: t ? formatarValorBR(t.valorDespesas) : "0,00",
    // "Valor produtos" (vProd real do XML) — antes duplicava o campo 13
    // (valor contábil da nota, que inclui frete/seguro/IPI/etc.).
    39: t ? formatarValorBR(t.valorProdutos) : valorFormatado,
    // Campo 52 é "Número da declaração de Importação" — não se aplica a
    // compra nacional; antes vinha fixo "N" (bug, não um valor válido do
    // campo), removido.
    54: n.chaveAcesso,
    57: cfopEntrada,
    90: "0,00",
  });
}

/**
 * Registro 1020 — totalizador de ICMS (tipo 1) ou IPI (tipo 2) da nota de
 * ENTRADA, mesma estrutura do 2020 (saída) — um por combinação de
 * classificação/alíquota dos itens. Campos 13/14 (específicos do Estado de
 * GO) ficam de fora.
 *
 * Confirmado campo a campo contra o arquivo-modelo real
 * (ExportacaoDominio-ENDURO-08-2026.txt, 586 ocorrências) — mesma
 * estrutura do 2020 (saída), 21 campos (14 documentados no PDF + 7 campos
 * vazios finais que a Domínio sempre grava), campo 3 sempre "0,00" (igual
 * ao 2020). Registros 1030/1500 também confirmados contra o arquivo real.
 */
export function linha1020(t: TotalImpostoParaLayout): string {
  return montarLinha(21, {
    1: "1020",
    2: String(t.tipo),
    3: "0,00",
    4: formatarValorBR(t.base),
    5: formatarValorBR(t.aliquota),
    6: formatarValorBR(t.valor),
    7: formatarValorBR(t.isentas),
    8: formatarValorBR(t.outras),
    // Campos 9 ("Valor do IPI") e 10 ("Valor da substituição Tributária")
    // deste registro: não tem como saber com segurança, só pelo nome do
    // campo, se é esperado repetir aqui um total que já aparece em outro
    // lugar (linha1030/linha2020) ou somar algo diferente — preferível
    // deixar "0,00" a arriscar mandar um valor errado pro contábil
    // (confirmado "0,00" em todas as ocorrências reais do arquivo-modelo).
    9: "0,00",
    10: "0,00",
    11: formatarValorBR(t.valorContabil),
    // Campos 12 ("Código do recolhimento"), 13 e 14 (valores exclusivos
    // do Estado de GO) — confirmado "0,00" em toda ocorrência real do
    // arquivo-modelo, mesmo não sendo GO.
    12: "0,00",
    13: "0,00",
    14: "0,00",
  });
}

export interface ItemEntradaParaLayout {
  codigoProduto: string;
  quantidade: number;
  unidadeComercial: string;
  cest: string;
  valorIpi: number;
  baseCalculoIcms: number;
  dataEmissao: Date;
  cstIcms: string;
  valorBrutoProduto: number;
  valorDesconto: number;
  baseCalculoIcmsSt: number;
  aliquotaIcms: number;
  aliquotaIcmsSt: number;
  valorIcms: number;
  valorIcmsSt: number;
  valorFrete: number;
  valorSeguro: number;
  valorDespesas: number;
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
  /** CFOP do fornecedor (saída dele, 5/6/7.xxx) — convertido pro de entrada aqui dentro, igual ao campo 6 do 1000. */
  cfop: string;
}

/**
 * Registro 1030 — item (produto) da nota de ENTRADA, registro filho do
 * 1000. Espelha o `linha2030` (mesmos conceitos, numeração de campo
 * diferente — a especificação de entrada tem 91 campos, a de saída 118).
 * Só os campos comerciais/tributários universais; o resto é de regime
 * específico (combustíveis, veículos, medicamentos, DI de importação,
 * EFD-Reinf) que não se aplica a este cliente.
 */
export function linha1030(i: ItemEntradaParaLayout): string {
  const data = formatarDataBR(i.dataEmissao);
  const cfopEntrada = cfopDeEntrada(i.cfop);
  return montarLinha(91, {
    1: "1030",
    2: i.codigoProduto,
    3: formatarValorBR(i.quantidade),
    4: formatarValorBR(i.baseCalculoIcms + i.valorIpi), // "Base Cal. + IPI"
    5: formatarValorBR(i.valorIpi),
    6: formatarValorBR(i.baseCalculoIcms),
    7: "1", // tipo de lancamento: 1 = produto vinculado a nota
    8: data,
    10: i.cstIcms,
    11: formatarValorBR(i.valorBrutoProduto),
    12: formatarValorBR(i.valorDesconto),
    13: formatarValorBR(i.baseCalculoIcms),
    14: formatarValorBR(i.baseCalculoIcmsSt),
    15: formatarValorBR(i.aliquotaIcms),
    18: formatarValorBR(i.valorFrete),
    19: formatarValorBR(i.valorSeguro),
    20: formatarValorBR(i.valorDespesas),
    22: formatarValorBR(i.valorIcms),
    23: formatarValorBR(i.valorIcmsSt),
    27: formatarValorBR(i.valorUnitario),
    28: formatarValorBR(i.aliquotaIcmsSt),
    29: i.cstIpi,
    30: formatarValorBR(i.aliquotaIpi),
    34: cfopEntrada,
    36: formatarValorBR(i.aliquotaPis),
    37: formatarValorBR(i.valorPis),
    38: formatarValorBR(i.aliquotaCofins),
    39: formatarValorBR(i.valorCofins),
    41: i.cstPis,
    42: formatarValorBR(i.baseCalculoPis),
    43: i.cstCofins,
    44: formatarValorBR(i.baseCalculoCofins),
    57: i.unidadeComercial,
    60: formatarValorBR(i.valorContabil),
    91: i.cest,
  });
}

/**
 * Registro 1500 — parcela (duplicata) da nota de ENTRADA; mesma estrutura
 * do 2500 (saída). Confirmado contra o arquivo-modelo real (386
 * ocorrências): 16 campos — identificador da nota/parcela no 14, mais um
 * campo vazio final (15) que a Domínio sempre grava.
 */
export function linha1500(vencimento: Date | null, valor: number, numeroNota: string, parcela: number): string {
  return montarLinha(16, {
    1: "1500",
    2: vencimento ? formatarDataBR(vencimento) : "",
    3: formatarValorBR(valor),
    14: `${numeroNota}/${String(parcela).padStart(2, "0")}`,
  });
}


/**
 * Registro 1060 — totalizador por NCM da nota de ENTRADA, espelho exato
 * do 2060 (mesma estrutura, mesmos 9 campos) — confirmado contra o
 * arquivo-modelo real (ex.: `|1060|64020000|41504,4|41504,4|0|||`), não
 * estava implementado (gap encontrado na auditoria pós-implementação).
 * Mesma ressalva do 2060 quanto ao PDF documentar outro "1060" (INSS).
 */
export function linha1060(ncm: string, valorProdutos: number, valorIpi: number): string {
  return montarLinha(9, {
    1: "1060",
    2: ncm,
    3: numeroCurto(valorProdutos),
    4: numeroCurto(valorProdutos),
    5: numeroCurto(valorIpi),
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

  // Campo 2 ("Código da espécie"): o PDF documenta uma tabela onde NF-e
  // (código 55) seria índice "31" e NFC-e (código 65) seria índice "43" —
  // mas o arquivo-modelo real (só tinha NF-e) sempre grava "36" (que na
  // tabela do PDF é "Conhecimento de Transporte de Cargas Avulso", nada a
  // ver). Ou seja, essa tabela do PDF já está comprovadamente errada pra
  // esse campo (mesma situação do registro 2060). Sem nenhum
  // arquivo-modelo real com NFC-e de saída pra confirmar, mantemos "36"
  // também pra NFC-e em vez de arriscar o índice "43" do PDF, que já se
  // mostrou não confiável nesse campo especificamente.
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
    2: "36", // ver comentario acima (Codigo da especie)
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

/**
 * Registro 2060 — totalizador por NCM da nota, confirmado campo a campo
 * contra o arquivo-modelo real (ExportacaoDominio-ENDURO-08-2026.txt).
 * ATENÇÃO: a especificação oficial de 2019 (PDF) documenta "2060" como um
 * registro DIFERENTE ("INSS Receita Bruta - Receitas por atividade", filho
 * do 2000, sem nenhuma relação com NCM) — ou o número do registro mudou
 * numa versão mais nova do leiaute (o PDF é de 2019), ou o sample usa uma
 * numeração própria da rotina de exportação da Domínio que não bate com
 * esse PDF específico. Mantido como está porque é o que o arquivo-modelo
 * real, gerado pela própria Domínio, de fato usa — não alterar com base só
 * no PDF sem um novo arquivo-modelo pra confirmar.
 */
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
  unidadeComercial: string;
  cest: string;
  valorIpi: number;
  baseCalculoIcms: number;
  dataEmissao: Date;
  cstIcms: string;
  valorBrutoProduto: number;
  valorDesconto: number;
  baseCalculoIcmsSt: number;
  aliquotaIcms: number;
  aliquotaIcmsSt: number;
  valorIcms: number;
  valorIcmsSt: number;
  valorFrete: number;
  valorSeguro: number;
  valorDespesas: number;
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
 * A especificação oficial tem 107 campos (não 118 — número revisado após
 * ler o PDF com mais cuidado); só preenchemos os universais pra NF-e de
 * mercadoria comum (comercial + ICMS/IPI/PIS/COFINS por item) — os demais
 * são de regime específico que este sistema não trata ainda: combustíveis
 * (bico/tanque), veículos (chassi), medicamentos (lote), devolução
 * (campos 69-89), EFD-Reinf (receita bruta por atividade) e benefício
 * fiscal do PR (campo 107). Não há campo de IBS/CBS neste registro na
 * especificação (ver nota no topo do arquivo). Se algum cliente precisar
 * de um desses campos de regime específico, é só adicionar aqui.
 */
export function linha2030(i: ItemSaidaParaLayout): string {
  const data = formatarDataBR(i.dataEmissao);
  return montarLinha(107, {
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
    19: formatarValorBR(i.valorFrete),
    20: formatarValorBR(i.valorSeguro),
    21: formatarValorBR(i.valorDespesas),
    23: formatarValorBR(i.valorIcms),
    24: formatarValorBR(i.valorIcmsSt),
    27: formatarValorBR(i.valorUnitario),
    28: formatarValorBR(i.aliquotaIcmsSt),
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
    60: i.unidadeComercial,
    62: formatarValorBR(i.valorContabil),
    106: i.cest,
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
