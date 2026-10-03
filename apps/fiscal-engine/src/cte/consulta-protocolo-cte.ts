/**
 * Consulta de situação de CT-e por chave de acesso (CTeConsultaV4) falada
 * direto em Node, mesmo padrão já provado pra NF-e (ver
 * ../nfe/consulta-protocolo.ts) e pra CT-e Distribuição DFe (ver
 * distribuicao-cte.ts) — SOAP simples com TLS de cliente (certificado A1
 * da própria empresa), sem ACBr.
 *
 * Diferença importante em relação à consulta de NF-e: CT-e exige um SOAP
 * Header ("cteCabecMsg" com cUF e versaoDados) em TODA chamada, não só o
 * Body — confirmado contra a implementação de referência (sped-cte,
 * nfephp-org, `Common/Tools.php::sefazConsultaChave`). Esquecer o Header
 * faz a SEFAZ rejeitar a chamada.
 */
import https from "node:https";
import { pfxParaPem } from "../shared/pfx-para-pem";
import { urlConsultaProtocoloCte } from "./webservices-por-uf";

const NAMESPACE_WSDL = "http://www.portalfiscal.inf.br/cte/wsdl/CTeConsultaV4";
const NAMESPACE_PORTAL = "http://www.portalfiscal.inf.br/cte";
const VERSAO = "4.00";
const TIMEOUT_MS = 30_000;

export interface ConsultarProtocoloCteInput {
  codigoUf: number;
  /** 1 = produção, 2 = homologação */
  ambiente: 1 | 2;
  chaveAcesso: string;
  certificado: { pfxBase64: string; senha: string };
}

export interface ConsultarProtocoloCteResultado {
  cStat: string;
  xMotivo: string;
  consultadoEm?: string;
  protocolo?: string;
}

function montarEnvelope(codigoUf: number, ambiente: 1 | 2, chaveAcesso: string): string {
  const consSitCTe =
    `<consSitCTe xmlns="${NAMESPACE_PORTAL}" versao="${VERSAO}">` +
    `<tpAmb>${ambiente}</tpAmb>` +
    `<xServ>CONSULTAR</xServ>` +
    `<chCTe>${chaveAcesso}</chCTe>` +
    `</consSitCTe>`;
  const cabecalho = `<cteCabecMsg xmlns="${NAMESPACE_WSDL}"><cUF>${codigoUf}</cUF><versaoDados>${VERSAO}</versaoDados></cteCabecMsg>`;
  return (
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">` +
    `<soap12:Header>${cabecalho}</soap12:Header>` +
    `<soap12:Body><cteDadosMsg xmlns="${NAMESPACE_WSDL}">${consSitCTe}</cteDadosMsg></soap12:Body>` +
    `</soap12:Envelope>`
  );
}

function chamarSefaz(url: string, envelope: string, tls: { key: string; cert: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const alvo = new URL(url);
    const req = https.request(
      {
        method: "POST",
        hostname: alvo.hostname,
        path: alvo.pathname,
        key: tls.key,
        cert: tls.cert,
        minVersion: "TLSv1.2",
        timeout: TIMEOUT_MS,
        headers: {
          "content-type": `application/soap+xml; charset=utf-8; action="${NAMESPACE_WSDL}/cteConsultaCT"`,
        },
      },
      (res) => {
        const partes: Buffer[] = [];
        res.on("data", (p: Buffer) => partes.push(p));
        res.on("end", () => {
          const corpo = Buffer.concat(partes).toString("utf8");
          if ((res.statusCode ?? 0) >= 400) {
            reject(new Error(`SEFAZ (Consulta Protocolo CT-e) respondeu HTTP ${res.statusCode}: ${corpo.slice(0, 400)}`));
            return;
          }
          resolve(corpo);
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Tempo esgotado esperando a SEFAZ (Consulta Protocolo CT-e).")));
    req.on("error", reject);
    req.write(envelope);
    req.end();
  });
}

function texto(xml: string, tag: string): string {
  const m = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`).exec(xml);
  return m?.[1]?.trim() ?? "";
}

export async function consultarProtocoloCte(input: ConsultarProtocoloCteInput): Promise<ConsultarProtocoloCteResultado> {
  const tls = pfxParaPem(input.certificado.pfxBase64, input.certificado.senha);
  const url = urlConsultaProtocoloCte(input.codigoUf, input.ambiente);
  const envelope = montarEnvelope(input.codigoUf, input.ambiente, input.chaveAcesso);
  const resposta = await chamarSefaz(url, envelope, tls);

  if (/<(?:\w+:)?Fault[\s>]/.test(resposta)) {
    throw new Error(`SEFAZ (Consulta Protocolo CT-e) devolveu erro SOAP: ${resposta.slice(0, 500)}`);
  }

  const ret = /<retConsSitCTe[\s\S]*?<\/retConsSitCTe>/.exec(resposta)?.[0];
  if (!ret) {
    throw new Error(`Resposta inesperada da SEFAZ (Consulta Protocolo CT-e): ${resposta.slice(0, 500)}`);
  }

  // protCTe traz o resultado "oficial" (cStat 100/101/110 etc) quando o
  // CT-e já foi processado; sem protCTe, o cStat do retorno "cru" já é a
  // resposta final (ex: 217 = não encontrado).
  const protCTe = /<protCTe[\s\S]*?<\/protCTe>/.exec(ret)?.[0];
  const origem = protCTe ? (/<infProt[\s\S]*?<\/infProt>/.exec(protCTe)?.[0] ?? protCTe) : ret;

  return {
    cStat: texto(origem, "cStat") || texto(ret, "cStat"),
    xMotivo: texto(origem, "xMotivo") || texto(ret, "xMotivo"),
    consultadoEm: texto(origem, "dhRecbto") || undefined,
    protocolo: texto(origem, "nProt") || undefined,
  };
}
