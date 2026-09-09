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
 * Ficam de fora, por não termos o dado de origem ainda:
 *  - 1020/1060 (totalizadores de ICMS/CFOP) — não capturamos impostos por
 *    item do XML, só o total da nota.
 *  - 1500 (parcelas/duplicatas) — não capturamos condição de pagamento.
 *  - Bloco 2000... (saída) — ainda não existe captura de NF-e/NFC-e de
 *    saída no sistema (ver docs/SESSAO_2026-09-09_relatorio-entrada-e-sync-sefaz.md).
 * Quando esses dados existirem, adicionar novas funções `linhaXXXX` aqui
 * seguindo o mesmo padrão — não precisa mexer no que já existe.
 */

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

export interface ChaveDecodificada {
  cnpjEmitente: string;
  modelo: string;
  serie: number;
  numeroNota: number;
}

/** Decodifica campos fixos da chave de acesso de 44 dígitos (mesma posição em qualquer NFe/NFCe). */
export function decodificarChave(chave: string): ChaveDecodificada | null {
  if (chave.length !== 44) return null;
  return {
    cnpjEmitente: chave.slice(6, 20),
    modelo: chave.slice(20, 22),
    serie: Number(chave.slice(22, 25)),
    numeroNota: Number(chave.slice(25, 34)),
  };
}

/** Registro 0000 — abertura do arquivo (CNPJ do estabelecimento/empresa cliente). */
export function linha0000(cnpjEmpresa: string): string {
  return montarLinha(4, { 1: "0000", 2: cnpjEmpresa });
}

export interface FornecedorParaLayout {
  cnpj: string;
  razaoSocial: string;
  endereco: EnderecoEmitente | null;
  /** Mês de referência da exportação — usado só na "data de cadastro" do fornecedor. */
  mesReferencia: Date;
}

/** Registro 0010 — cadastro do fornecedor (participante da nota de entrada). */
export function linha0010(f: FornecedorParaLayout): string {
  const dataCadastro = formatarDataBR(
    new Date(Date.UTC(f.mesReferencia.getUTCFullYear(), f.mesReferencia.getUTCMonth(), 1))
  );
  const end = f.endereco;

  return montarLinha(34, {
    1: "0010",
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
    28: "N",
  });
}

export interface NotaEntradaParaLayout {
  chaveAcesso: string;
  cfop: string;
  valorTotal: number;
  dataEmissao: Date;
  dataRecebimento: Date;
  /** Quantidade de itens (<det>) da nota, se conhecida — melhor-esforço, pode ficar de fora. */
  quantidadeItens: number | null;
}

/** Registro 1000 — nota fiscal de entrada. */
export function linha1000(n: NotaEntradaParaLayout): string {
  const chave = decodificarChave(n.chaveAcesso);
  if (!chave) {
    throw new Error(`Chave de acesso inválida pra exportação TXT: ${n.chaveAcesso}`);
  }
  const valorFormatado = formatarValorBR(n.valorTotal);

  return montarLinha(100, {
    1: "1000",
    2: "36", // constante observada no arquivo-modelo, significado nao confirmado
    3: chave.cnpjEmitente,
    5: n.quantidadeItens !== null ? String(n.quantidadeItens) : "",
    6: n.cfop,
    7: "1", // constante observada no arquivo-modelo, significado nao confirmado
    8: String(chave.numeroNota),
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
    57: n.cfop,
    90: "0,00",
  });
}
