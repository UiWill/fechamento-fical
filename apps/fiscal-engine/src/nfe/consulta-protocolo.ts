/**
 * Consulta de situação de NF-e/NFC-e por chave de acesso (NFeConsultaProtocolo4)
 * falada direto em Node, sem passar pela ACBrLibNFe — a mesma função pela DLL
 * (NFE_Consultar) derruba o processo inteiro (Access violation / ECONNRESET)
 * em todas as variantes testadas (DLL antiga, nova, multi-thread,
 * single-thread — ver histórico do projeto em 2026-10-03). Igual à
 * Distribuição DFe de CT-e (ver cte/distribuicao-cte.ts): SOAP simples com
 * TLS de cliente (certificado A1 da própria empresa).
 */
import https from "node:https";
import { pfxParaPem } from "../shared/pfx-para-pem";
import { urlConsultaProtocolo } from "./webservices-por-uf";

const NAMESPACE_WSDL = "http://www.portalfiscal.inf.br/nfe/wsdl/NFeConsultaProtocolo4";
const TIMEOUT_MS = 30_000;

export interface ConsultarProtocoloInput {
  codigoUf: number;
  /** 1 = produção, 2 = homologação */
  ambiente: 1 | 2;
  chaveAcesso: string;
  certificado: { pfxBase64: string; senha: string };
}

export interface ConsultarProtocoloResultado {
  cStat: string;
  xMotivo: string;
  consultadoEm?: string;
  protocolo?: string;
}

function montarEnvelope(ambiente: 1 | 2, chaveAcesso: string): string {
  const consSitNFe =
    `<consSitNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">` +
    `<tpAmb>${ambiente}</tpAmb>` +
    `<xServ>CONSULTAR</xServ>` +
    `<chNFe>${chaveAcesso}</chNFe>` +
    `</consSitNFe>`;
  return (
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">` +
    `<soap12:Body><nfeConsultaNF xmlns="${NAMESPACE_WSDL}"><nfeDadosMsg>${consSitNFe}</nfeDadosMsg></nfeConsultaNF></soap12:Body>` +
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
          "content-type": `application/soap+xml; charset=utf-8; action="${NAMESPACE_WSDL}/nfeConsultaNF"`,
        },
      },
      (res) => {
        const partes: Buffer[] = [];
        res.on("data", (p: Buffer) => partes.push(p));
        res.on("end", () => {
          const corpo = Buffer.concat(partes).toString("utf8");
          if ((res.statusCode ?? 0) >= 400) {
            reject(new Error(`SEFAZ (Consulta Protocolo) respondeu HTTP ${res.statusCode}: ${corpo.slice(0, 400)}`));
            return;
          }
          resolve(corpo);
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Tempo esgotado esperando a SEFAZ (Consulta Protocolo).")));
    req.on("error", reject);
    req.write(envelope);
    req.end();
  });
}

function texto(xml: string, tag: string): string {
  const m = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`).exec(xml);
  return m?.[1]?.trim() ?? "";
}

export async function consultarProtocolo(input: ConsultarProtocoloInput): Promise<ConsultarProtocoloResultado> {
  const tls = pfxParaPem(input.certificado.pfxBase64, input.certificado.senha);
  const url = urlConsultaProtocolo(input.codigoUf, input.ambiente);
  const envelope = montarEnvelope(input.ambiente, input.chaveAcesso);
  const resposta = await chamarSefaz(url, envelope, tls);

  if (/<(?:\w+:)?Fault[\s>]/.test(resposta)) {
    throw new Error(`SEFAZ (Consulta Protocolo) devolveu erro SOAP: ${resposta.slice(0, 500)}`);
  }

  const ret = /<retConsSitNFe[\s\S]*?<\/retConsSitNFe>/.exec(resposta)?.[0];
  if (!ret) {
    throw new Error(`Resposta inesperada da SEFAZ (Consulta Protocolo): ${resposta.slice(0, 500)}`);
  }

  // protNFe traz o resultado "oficial" (cStat 100/101/110 etc) quando a nota
  // já foi processada; sem protNFe, o cStat do retorno "cru" (217 = não
  // encontrada, por exemplo) já é a resposta final.
  const protNFe = /<protNFe[\s\S]*?<\/protNFe>/.exec(ret)?.[0];
  const origem = protNFe ? (/<infProt[\s\S]*?<\/infProt>/.exec(protNFe)?.[0] ?? protNFe) : ret;

  return {
    cStat: texto(origem, "cStat") || texto(ret, "cStat"),
    xMotivo: texto(origem, "xMotivo") || texto(ret, "xMotivo"),
    consultadoEm: texto(origem, "dhRecbto") || undefined,
    protocolo: texto(origem, "nProt") || undefined,
  };
}
