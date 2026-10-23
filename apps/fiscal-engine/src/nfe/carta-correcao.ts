/**
 * Carta de Correção Eletrônica (CC-e, tpEvento 110110) — SOAP puro, sem
 * ACBrLibNFe, seguindo o mesmo raciocínio já usado em consulta-protocolo.ts
 * (a função equivalente pela DLL já demonstrou instabilidade neste projeto
 * — ver histórico de 2026-10). Baseado numa implementação de referência já
 * validada em produção (fora deste monorepo, NFE_MARKET/src/nfe/eventSender.js)
 * — layout do XML, texto legal obrigatório (xCondUso) e assinatura digital
 * portados de lá; URLs por UF em webservices-por-uf.ts.
 *
 * ⚠️ Ainda sem confirmação contra retorno real da SEFAZ DESTE projeto —
 * testar em homologação (ambiente=2) antes de confiar em produção, mesma
 * exigência já seguida pros outros eventos (manifestação, consulta).
 *
 * Diferente da Manifestação do Destinatário (sempre Ambiente Nacional,
 * cOrgao=91): CC-e vai pra SEFAZ AUTORIZADORA do emitente (cOrgao = código
 * da UF de quem emitiu a nota).
 */
import https from "node:https";
import { SignedXml } from "xml-crypto";
import { pfxParaPem } from "../shared/pfx-para-pem";
import { urlRecepcaoEvento } from "./webservices-por-uf";

const TIMEOUT_MS = 30_000;

export interface EnviarCCeInput {
  codigoUf: number;
  /** 1 = produção, 2 = homologação */
  ambiente: 1 | 2;
  cnpj: string;
  chaveAcesso: string;
  /** 1 a 20 — cada CC-e enviada pra mesma nota soma, não substitui a anterior. Ver CorrecaoEvento.nSeqEvento no banco pra saber o próximo número livre. */
  numeroSequencial: number;
  /** 15 a 1000 caracteres — o texto da correção em si (sem o texto legal fixo, que é adicionado automaticamente). */
  xCorrecao: string;
  certificado: { pfxBase64: string; senha: string };
}

export interface EnviarCCeResultado {
  cStat: string;
  xMotivo: string;
  protocolo?: string;
}

// Texto legal obrigatório em TODA CC-e, definido pelo layout nacional da
// NF-e (Nota Técnica CC-e) — não é redigido por nós, é sempre o mesmo,
// citando o dispositivo legal que autoriza o uso de CC-e.
const X_COND_USO =
  "A Carta de Correção é disciplinada pelo § 1º-A do art. 7º do Convênio S/N, " +
  "de 15 de dezembro de 1970 e pode ser utilizada para regularização de erro " +
  "ocorrido na emissão de documento fiscal, desde que o erro não esteja " +
  "relacionado com: I - as variáveis que determinam o valor do imposto tais " +
  "como: base de cálculo, alíquota, diferença de preço, quantidade, valor da " +
  "operação ou da prestação; II - a correção de dados cadastrais que implique " +
  "mudança do remetente ou do destinatário; III - a data de emissão ou de saída.";

function escapeXml(valor: string): string {
  return valor.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** A ACBrLib usa dd/mm/aaaa (ver eventos.ts); aqui, indo direto no XML, é o formato ISO com fuso -03:00 que o schema da SEFAZ pede de verdade. */
function dataHoraEvento(): string {
  const agora = new Date();
  const brt = new Date(agora.getTime() - 3 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${brt.getUTCFullYear()}-${p(brt.getUTCMonth() + 1)}-${p(brt.getUTCDate())}` +
    `T${p(brt.getUTCHours())}:${p(brt.getUTCMinutes())}:${p(brt.getUTCSeconds())}-03:00`
  );
}

function montarEventoCCe(input: EnviarCCeInput): string {
  const nSeq = String(input.numeroSequencial).padStart(2, "0");
  const idEvento = `ID110110${input.chaveAcesso}${nSeq}`;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<envEvento versao="1.00" xmlns="http://www.portalfiscal.inf.br/nfe">`;
  xml += `<idLote>1</idLote>`;
  xml += `<evento xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00">`;
  xml += `<infEvento Id="${idEvento}">`;
  xml += `<cOrgao>${input.codigoUf}</cOrgao>`;
  xml += `<tpAmb>${input.ambiente}</tpAmb>`;
  xml += `<CNPJ>${input.cnpj}</CNPJ>`;
  xml += `<chNFe>${input.chaveAcesso}</chNFe>`;
  xml += `<dhEvento>${dataHoraEvento()}</dhEvento>`;
  xml += `<tpEvento>110110</tpEvento>`;
  xml += `<nSeqEvento>${input.numeroSequencial}</nSeqEvento>`;
  xml += `<verEvento>1.00</verEvento>`;
  xml += `<detEvento versao="1.00">`;
  xml += `<descEvento>Carta de Correção</descEvento>`;
  xml += `<xCorrecao>${escapeXml(input.xCorrecao.trim())}</xCorrecao>`;
  xml += `<xCondUso>${escapeXml(X_COND_USO)}</xCondUso>`;
  xml += `</detEvento>`;
  xml += `</infEvento>`;
  xml += `</evento>`;
  xml += `</envEvento>`;
  return xml;
}

/** pfxParaPem devolve "folha + cadeia" concatenados — a assinatura do evento usa só o certificado-folha (o da própria empresa), não a cadeia inteira da AC. */
function primeiroCertificado(certConcatenado: string): string {
  const fim = certConcatenado.indexOf("-----END CERTIFICATE-----");
  if (fim === -1) return certConcatenado;
  return certConcatenado.slice(0, fim + "-----END CERTIFICATE-----".length);
}

function assinarEvento(xml: string, keyPem: string, certPem: string): string {
  const sig = new SignedXml({
    privateKey: keyPem,
    publicCert: certPem,
  });
  sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
  sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
  sig.addReference({
    xpath: "//*[local-name(.)='infEvento']",
    transforms: [
      "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
      "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
    ],
    digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
  });
  sig.computeSignature(xml, {
    location: { reference: "//*[local-name(.)='infEvento']", action: "after" },
  });
  return sig.getSignedXml();
}

function montarEnvelopeSoap(codigoUf: number, eventoAssinado: string): string {
  const corpo = eventoAssinado.replace(/^<\?xml[^?]*\?>\s*/i, "");
  return (
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">` +
    `<soap12:Header><nfeCabecMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/"><cUF>${codigoUf}</cUF><versaoDados>1.00</versaoDados></nfeCabecMsg></soap12:Header>` +
    `<soap12:Body><nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeRecepcaoEvento4">${corpo}</nfeDadosMsg></soap12:Body>` +
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
        maxVersion: "TLSv1.2",
        timeout: TIMEOUT_MS,
        headers: {
          "content-type": "application/soap+xml; charset=utf-8",
          "content-length": Buffer.byteLength(envelope, "utf8"),
        },
      },
      (res) => {
        const partes: Buffer[] = [];
        res.on("data", (p: Buffer) => partes.push(p));
        res.on("end", () => {
          const corpo = Buffer.concat(partes).toString("utf8");
          if ((res.statusCode ?? 0) >= 400) {
            reject(new Error(`SEFAZ (Recepção de Evento) respondeu HTTP ${res.statusCode}: ${corpo.slice(0, 500)}`));
            return;
          }
          resolve(corpo);
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Tempo esgotado esperando a SEFAZ (Recepção de Evento).")));
    req.on("error", reject);
    req.write(envelope, "utf8");
    req.end();
  });
}

function texto(xml: string, tag: string): string {
  const m = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`).exec(xml);
  return m?.[1]?.trim() ?? "";
}

export async function enviarCartaCorrecao(input: EnviarCCeInput): Promise<EnviarCCeResultado> {
  const tamanho = input.xCorrecao.trim().length;
  if (tamanho < 15 || tamanho > 1000) {
    throw new Error(`Texto da correção deve ter entre 15 e 1000 caracteres (recebido: ${tamanho}).`);
  }
  if (input.numeroSequencial < 1 || input.numeroSequencial > 20) {
    throw new Error(`Número sequencial de CC-e deve ser de 1 a 20 (recebido: ${input.numeroSequencial}).`);
  }

  const { key, cert } = pfxParaPem(input.certificado.pfxBase64, input.certificado.senha);
  const certFolha = primeiroCertificado(cert);
  const url = urlRecepcaoEvento(input.codigoUf, input.ambiente);

  const eventoXml = montarEventoCCe(input);
  const eventoAssinado = assinarEvento(eventoXml, key, certFolha);
  const envelope = montarEnvelopeSoap(input.codigoUf, eventoAssinado);

  const resposta = await chamarSefaz(url, envelope, { key, cert: certFolha });

  if (/<(?:\w+:)?Fault[\s>]/.test(resposta)) {
    throw new Error(`SEFAZ (Recepção de Evento) devolveu erro SOAP: ${resposta.slice(0, 500)}`);
  }

  const retEvento = /<retEvento[\s\S]*?<\/retEvento>/.exec(resposta)?.[0] ?? resposta;
  const infEvento = /<infEvento[\s\S]*?<\/infEvento>/.exec(retEvento)?.[0] ?? retEvento;

  return {
    cStat: texto(infEvento, "cStat"),
    xMotivo: texto(infEvento, "xMotivo"),
    protocolo: texto(infEvento, "nProt") || undefined,
  };
}
