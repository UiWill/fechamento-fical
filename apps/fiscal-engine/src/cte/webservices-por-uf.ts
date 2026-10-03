/**
 * URL de produção do webservice CTeConsultaV4 por UF — CT-e tem
 * infraestrutura PRÓPRIA (não compartilha nada com a de NF-e, nem a tabela
 * de UFs: SVSP, por exemplo, só existe pra CT-e). Só MG, MS, MT, PR, RS e
 * SP têm webservice próprio; o resto cai num autorizador compartilhado
 * (SVRS ou SVSP, dependendo da UF).
 *
 * Fonte: projeto sped-cte (nfephp-org), `storage/wscte_4.00_mod57.xml` +
 * `storage/autorizadores.json` (chave "57") — mesmo tipo de referência
 * comunitária já usado pra NF-e em webservices-por-uf.ts (NF-e).
 */
export const URL_CONSULTA_PROTOCOLO_CTE_POR_UF: Record<string, string> = {
  AC: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  AL: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  AM: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  AP: "https://nfe.fazenda.sp.gov.br/CTeWS/WS/CTeConsultaV4.asmx",
  BA: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  CE: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  DF: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  ES: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  GO: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  MA: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  MG: "https://cte.fazenda.mg.gov.br/cte/services/CTeConsultaV4",
  MS: "https://producao.cte.ms.gov.br/ws/CTeConsultaV4",
  MT: "https://cte.sefaz.mt.gov.br/ctews2/services/CTeConsultaV4",
  PA: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  PB: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  PE: "https://nfe.fazenda.sp.gov.br/CTeWS/WS/CTeConsultaV4.asmx",
  PI: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  PR: "https://cte.fazenda.pr.gov.br/cte4/CTeConsultaV4",
  RJ: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  RN: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  RO: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  RR: "https://nfe.fazenda.sp.gov.br/CTeWS/WS/CTeConsultaV4.asmx",
  RS: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  SC: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  SE: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
  SP: "https://nfe.fazenda.sp.gov.br/CTeWS/WS/CTeConsultaV4.asmx",
  TO: "https://cte.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx",
};

/** Mesma tabela, ambiente de homologação (SVRS compartilhado — mesma simplificação já usada pra NF-e). */
export const URL_CONSULTA_PROTOCOLO_CTE_HOMOLOGACAO = "https://cte-homologacao.svrs.rs.gov.br/ws/CTeConsultaV4/CTeConsultaV4.asmx";

/** Converte código IBGE da UF (ex: 31) pra sigla (ex: "MG") — mesma tabela usada em nfe/webservices-por-uf.ts, duplicada aqui pra não criar dependência cruzada entre nfe/ e cte/. */
const SIGLA_POR_CODIGO_UF: Record<number, string> = {
  11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA", 16: "AP", 17: "TO",
  21: "MA", 22: "PI", 23: "CE", 24: "RN", 25: "PB", 26: "PE", 27: "AL", 28: "SE", 29: "BA",
  31: "MG", 32: "ES", 33: "RJ", 35: "SP",
  41: "PR", 42: "SC", 43: "RS",
  50: "MS", 51: "MT", 52: "GO", 53: "DF",
};

export function urlConsultaProtocoloCte(codigoUf: number, ambiente: 1 | 2): string {
  if (ambiente === 2) return URL_CONSULTA_PROTOCOLO_CTE_HOMOLOGACAO;
  const sigla = SIGLA_POR_CODIGO_UF[codigoUf];
  const url = sigla ? URL_CONSULTA_PROTOCOLO_CTE_POR_UF[sigla] : undefined;
  if (!url) {
    throw new Error(`Sem URL de Consulta Protocolo de CT-e conhecida pro código de UF ${codigoUf}.`);
  }
  return url;
}
