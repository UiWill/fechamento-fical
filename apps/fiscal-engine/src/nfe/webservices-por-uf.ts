/**
 * URL de produção do webservice NFeConsultaProtocolo4 por UF — ao
 * contrário da Distribuição DFe (um endpoint nacional único), a Consulta
 * Protocolo é servida por cada UF (algumas rodam infraestrutura própria,
 * a maioria usa um "autorizador" compartilhado — SVRS ou SVAN).
 *
 * Fonte: projeto sped-nfe (nfephp-org), `storage/wsnfe_4.00_mod55.xml` +
 * `storage/autorizadores.json` (mapa UF → autorizador pro modelo 55) —
 * referência usada por praticamente todo sistema de NF-e do Brasil, não é
 * documentação oficial única da SEFAZ (que não publica isso num lugar só).
 * Já vem com os autorizadores compartilhados (SVRS/SVAN) resolvidos pra
 * URL final — não precisa de uma segunda tabela de indireção em runtime.
 */
export const URL_CONSULTA_PROTOCOLO_POR_UF: Record<string, string> = {
  AC: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  AL: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  AM: "https://nfe.sefaz.am.gov.br/services2/services/NfeConsulta4",
  AP: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  BA: "https://nfe.sefaz.ba.gov.br/webservices/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
  CE: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  DF: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  ES: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  GO: "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
  MA: "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
  MG: "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeConsultaProtocolo4",
  MS: "https://nfe.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
  MT: "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeConsulta4",
  PA: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PB: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PE: "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
  PI: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PR: "https://nfe.sefa.pr.gov.br/nfe/NFeConsultaProtocolo4",
  RJ: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RN: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RO: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RR: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RS: "https://nfe.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SC: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SE: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SP: "https://nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx",
  TO: "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
};

/** Mesma tabela, ambiente de homologação (todas as UFs compartilhadas por SVRS em homologação — simplificação segura pra teste). */
export const URL_CONSULTA_PROTOCOLO_HOMOLOGACAO = "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx";

/**
 * NFC-e (modelo 65) tem infraestrutura PRÓPRIA e DIFERENTE da NF-e em várias
 * UFs — não é o mesmo endpoint com "nfce." no lugar de "nfe." em todo
 * lugar, e várias UFs que têm webservice de NF-e próprio (BA, PE) caem pro
 * SVRS compartilhado quando é NFC-e. Mandar a chave de uma NFC-e pro
 * endpoint de NF-e retorna cStat 618 ("Chave de Acesso inválida — modelo
 * diferente de 55 e 65") mesmo a chave sendo válida — é só o serviço errado.
 * Fonte: mesmo projeto de referência (nfephp-org/sped-nfe),
 * `storage/wsnfe_4.00_mod65.xml` + `storage/autorizadores.json` (chave "65").
 */
export const URL_CONSULTA_PROTOCOLO_NFCE_POR_UF: Record<string, string> = {
  AC: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  AL: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  AM: "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeConsulta4",
  AP: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  BA: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  CE: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  DF: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  ES: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  GO: "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
  MA: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  MG: "https://nfce.fazenda.mg.gov.br/nfce/services/NFeConsultaProtocolo4",
  MS: "https://nfce.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
  MT: "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeConsulta4",
  PA: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PB: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PE: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PI: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  PR: "https://nfce.sefa.pr.gov.br/nfce/NFeConsultaProtocolo4",
  RJ: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RN: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RO: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RR: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  RS: "https://nfce.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SC: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SE: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
  SP: "https://nfce.fazenda.sp.gov.br/ws/NFeConsultaProtocolo4.asmx",
  TO: "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
};

/** Mesma tabela de NFC-e, ambiente de homologação (SVRS compartilhado). */
export const URL_CONSULTA_PROTOCOLO_NFCE_HOMOLOGACAO = "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx";

/** Converte código IBGE da UF (ex: 31) pra sigla (ex: "MG") — mesma tabela usada em acbr/uf.ts, duplicada aqui pra não criar dependência cruzada entre nfe/ e acbr/. */
const SIGLA_POR_CODIGO_UF: Record<number, string> = {
  11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA", 16: "AP", 17: "TO",
  21: "MA", 22: "PI", 23: "CE", 24: "RN", 25: "PB", 26: "PE", 27: "AL", 28: "SE", 29: "BA",
  31: "MG", 32: "ES", 33: "RJ", 35: "SP",
  41: "PR", 42: "SC", 43: "RS",
  50: "MS", 51: "MT", 52: "GO", 53: "DF",
};

export function urlConsultaProtocolo(codigoUf: number, ambiente: 1 | 2, modelo: "55" | "65"): string {
  const tabela = modelo === "65" ? URL_CONSULTA_PROTOCOLO_NFCE_POR_UF : URL_CONSULTA_PROTOCOLO_POR_UF;
  if (ambiente === 2) {
    return modelo === "65" ? URL_CONSULTA_PROTOCOLO_NFCE_HOMOLOGACAO : URL_CONSULTA_PROTOCOLO_HOMOLOGACAO;
  }
  const sigla = SIGLA_POR_CODIGO_UF[codigoUf];
  const url = sigla ? tabela[sigla] : undefined;
  if (!url) {
    throw new Error(`Sem URL de Consulta Protocolo (modelo ${modelo}) conhecida pro código de UF ${codigoUf}.`);
  }
  return url;
}

/**
 * URL do webservice NFeRecepcaoEvento4 (usado pra Carta de Correção, entre
 * outros eventos de NF-e) — DIFERENTE do de Consulta Protocolo: é um
 * serviço de ESCRITA (manda um evento assinado), não leitura, e várias UFs
 * delegam ele pro SVRS mesmo tendo webservice de consulta próprio (não é a
 * mesma tabela de infraestrutura).
 *
 * Fonte: implementação de referência já validada em produção neste mesmo
 * workspace (NFE_MARKET/src/nfe/eventSender.js — `EVENT_ENDPOINTS` +
 * `SVRS_CUFS`), que por sua vez usa o mesmo mapeamento sped-nfe/autorizadores
 * já citado acima. Confirmado individualmente só pra MG/SP/PR/RS/RJ/BA/CE —
 * o resto cai no SVRS compartilhado (`SVRS_CUFS` da referência). SC não
 * aparecia em nenhuma das duas listas na referência; foi incluída no grupo
 * SVRS por analogia com o padrão de Consulta Protocolo dela (que também usa
 * o SVRS compartilhado pra SC) — ⚠️ essa inferência específica (SC) ainda
 * não foi validada contra retorno real da SEFAZ, ao contrário das outras.
 */
const URL_RECEPCAO_EVENTO_POR_UF: Record<string, string> = {
  MG: "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
  SP: "https://nfe.fazenda.sp.gov.br/nfeweb/services/NFeRecepcaoEvento4",
  PR: "https://nfe.fazenda.pr.gov.br/nfe/NFeRecepcaoEvento4",
  RS: "https://nfe.sefazrs.rs.gov.br/ws/NfeRecepcaoEvento/NFeRecepcaoEvento4.asmx",
  RJ: "https://nfe.fazenda.rj.gov.br/nfe/NFeRecepcaoEvento4",
  BA: "https://nfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4",
  CE: "https://nfe.sefaz.ce.gov.br/nfe4/services/NFeRecepcaoEvento4",
};

const URL_RECEPCAO_EVENTO_HOM_POR_UF: Record<string, string> = {
  MG: "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
  SP: "https://homologacao.nfe.fazenda.sp.gov.br/nfeweb/services/NFeRecepcaoEvento4",
  PR: "https://homologacao.nfe.fazenda.pr.gov.br/nfe/NFeRecepcaoEvento4",
  RS: "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeRecepcaoEvento/NFeRecepcaoEvento4.asmx",
  RJ: "https://homologacao.nfe.fazenda.rj.gov.br/nfe/NFeRecepcaoEvento4",
  BA: "https://hnfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4",
  CE: "https://nfeh.sefaz.ce.gov.br/nfe4/services/NFeRecepcaoEvento4",
};

/** UFs sem webservice de RecepcaoEvento próprio pra esse evento — delegam pro SVRS compartilhado. */
const UFS_SVRS_RECEPCAO_EVENTO = new Set([
  "RO", "AC", "AM", "RR", "PA", "AP", "TO",
  "MA", "PI", "RN", "PB", "PE", "AL", "SE", "ES",
  "MS", "MT", "GO", "DF", "SC",
]);
const URL_SVRS_RECEPCAO_EVENTO_PROD = "https://nfe.svrs.rs.gov.br/ws/NfeRecepcaoEvento/NFeRecepcaoEvento4.asmx";
const URL_SVRS_RECEPCAO_EVENTO_HOM = "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRecepcaoEvento/NFeRecepcaoEvento4.asmx";

export function urlRecepcaoEvento(codigoUf: number, ambiente: 1 | 2): string {
  const sigla = SIGLA_POR_CODIGO_UF[codigoUf];
  if (!sigla) {
    throw new Error(`Código de UF desconhecido: ${codigoUf}.`);
  }
  if (UFS_SVRS_RECEPCAO_EVENTO.has(sigla)) {
    return ambiente === 1 ? URL_SVRS_RECEPCAO_EVENTO_PROD : URL_SVRS_RECEPCAO_EVENTO_HOM;
  }
  const tabela = ambiente === 1 ? URL_RECEPCAO_EVENTO_POR_UF : URL_RECEPCAO_EVENTO_HOM_POR_UF;
  const url = tabela[sigla];
  if (!url) {
    throw new Error(`Sem URL de Recepção de Evento conhecida pra UF ${sigla} (código ${codigoUf}).`);
  }
  return url;
}
