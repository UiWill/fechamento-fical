/**
 * Extração mínima de campos do XML de NF-e/NFC-e/CT-e via regex —
 * suficiente pra indexar metadados (chave, tipo, data, valor). Parsing
 * fiscal completo (itens, impostos por item) fica fora daqui — quem
 * precisar disso deve usar um parser XML de verdade, não regex.
 *
 * Compartilhado entre core-api (entrada, via SEFAZ) e o agente desktop
 * (saída, lido do disco do cliente) pra garantir que os dois classificam
 * um XML exatamente da mesma forma.
 */
import { decodificarChaveAcesso } from "./chave-acesso";

export type TipoDocumentoFiscalDetectado = "NFE" | "NFCE" | "CTE";

export interface DadosBasicosDocumentoFiscal {
  chaveAcesso: string;
  tipo: TipoDocumentoFiscalDetectado;
  modelo: string; // "55" | "65" | "57"
  /**
   * CNPJ do emitente — sempre extraído da própria chave de acesso (posições
   * 6-20), nunca de uma tag <CNPJ> solta no XML: o documento tem vários
   * CNPJs (emitente, destinatário, transportadora no caso de CT-e), e usar
   * o errado quebraria a validação de autorização do agente desktop.
   */
  cnpjEmitente: string;
  dataEmissao: Date | null;
  nomeEmitente: string | null;
  /**
   * CFOP do primeiro item — só existe pra NF-e/NFC-e, e só quando vem o XML
   * completo (nfeProc), não no resumo (resNFe). Simplificação assume CFOP
   * uniforme entre os itens da nota. Não extraído pra CT-e nesta versão.
   */
  cfop: string | null;
  /** Valor total: vNF pra NF-e/NFC-e, vTPrest pra CT-e. */
  valorTotal: number | null;
  /**
   * true quando o XML capturado é o EVENTO de cancelamento (procEventoNFe,
   * tpEvento 110111) em vez da nota em si — acontece quando o PDV grava o
   * aviso de cancelamento na mesma pasta monitorada. Nesse caso cfop/
   * valorTotal ficam null porque esse tipo de arquivo nunca tem essa
   * informação (não é falha de extração).
   */
  cancelada: boolean;
  /**
   * Protocolo de autorização (cStat/xMotivo/nProt), quando o XML já vem
   * completo (nfeProc, com <protNFe><infProt>...</infProt></protNFe>
   * embutido) — é o caso comum tanto da Distribuição DFe de entrada quanto
   * do XML que o PDV salva depois de uma venda autorizada. Nesses casos
   * não é preciso consultar a SEFAZ de novo pra saber se a nota foi
   * autorizada: já está aqui (achado em 2026-10-21, revisando por que
   * notas de saída recém-chegadas ficavam represadas esperando o cron
   * diário de consulta, quando o próprio XML já tinha a resposta).
   * null = XML sem protocolo (resumo/resNFe, ou nota ainda não
   * processada pela SEFAZ) — nesse caso a consulta separada continua
   * sendo necessária.
   */
  protocolo: { cStat: string; xMotivo: string; nProt: string } | null;
}

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

/** Lê cStat/xMotivo/nProt de dentro de <protNFe><infProt>, nunca de fora desse bloco (evita pegar um <cStat> de outro contexto por engano). */
function extrairProtocolo(xml: string): { cStat: string; xMotivo: string; nProt: string } | null {
  const bloco = xml.match(/<protNFe[^>]*>([\s\S]*?)<\/protNFe>/i)?.[1];
  if (!bloco) return null;
  const cStat = extractText(bloco, "cStat");
  if (!cStat) return null;
  return { cStat, xMotivo: extractText(bloco, "xMotivo"), nProt: extractText(bloco, "nProt") };
}

function tipoPorModelo(modelo: string): TipoDocumentoFiscalDetectado | null {
  if (modelo === "55") return "NFE";
  if (modelo === "65") return "NFCE";
  if (modelo === "57") return "CTE";
  return null;
}

export function extrairDadosBasicos(xml: string): DadosBasicosDocumentoFiscal | null {
  const chaveAcesso =
    xml.match(/Id="NFe(\d{44})"/i)?.[1] ??
    xml.match(/Id="CTe(\d{44})"/i)?.[1] ??
    extractText(xml, "chNFe") ??
    extractText(xml, "chCTe");
  if (!chaveAcesso || chaveAcesso.length !== 44) return null;

  const chaveDecodificada = decodificarChaveAcesso(chaveAcesso);
  if (!chaveDecodificada) return null;

  const tipo = tipoPorModelo(chaveDecodificada.modelo);
  if (!tipo) return null; // modelo desconhecido — nao arrisca classificar

  const dhEmi = extractText(xml, "dhEmi") || extractText(xml, "dEmi");
  const dataEmissao = dhEmi ? new Date(dhEmi) : null;
  // <xNome> aparece solto no resNFe (resumo) e dentro de <emit> no XML
  // completo — em ambos os casos o emitente vem antes do destinatário na
  // ordem do schema, então a primeira ocorrência é sempre a certa.
  const nomeEmitente = extractText(xml, "xNome") || null;
  const cfop = tipo !== "CTE" ? extractText(xml, "CFOP") || null : null;
  const valorTexto = tipo === "CTE" ? extractText(xml, "vTPrest") : extractText(xml, "vNF");
  const valorTotal = valorTexto ? Number(valorTexto) : null;
  // 110111 = "Cancelamento" (ver tabela de eventos da SEFAZ) — outros
  // tpEvento existem (ex: 110110 Carta de Correção) e não significam que
  // a nota foi cancelada, por isso checa o código exato, não só a presença
  // da tag.
  const cancelada = extractText(xml, "tpEvento") === "110111";

  return {
    chaveAcesso,
    tipo,
    modelo: chaveDecodificada.modelo,
    cnpjEmitente: chaveDecodificada.cnpjEmitente,
    dataEmissao,
    nomeEmitente,
    cfop,
    valorTotal: valorTotal !== null && !Number.isNaN(valorTotal) ? valorTotal : null,
    cancelada,
    protocolo: extrairProtocolo(xml),
  };
}
