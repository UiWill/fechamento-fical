/**
 * Distribuição DFe de CT-e (CTeDistribuicaoDFe) — SEFAZ nacional, serviço
 * separado do de NF-e e sem biblioteca ACBr equivalente instalada no
 * servidor (só existe a ACBrNFe64.dll). Como o serviço é um SOAP simples
 * com TLS de cliente (o próprio certificado A1 da empresa), falamos direto
 * com ele em Node em vez de instalar mais uma DLL nativa.
 *
 * O PFX das empresas usa criptografia antiga (RC2-40) que o OpenSSL 3 do
 * Node recusa como "senha inválida" mesmo com a senha certa — por isso o
 * node-forge converte pra PEM antes de montar o TLS.
 */
import https from "node:https";
import zlib from "node:zlib";
import forge from "node-forge";

const URL_PRODUCAO = "https://www1.cte.fazenda.gov.br/CTeDistribuicaoDFe/CTeDistribuicaoDFe.asmx";
const URL_HOMOLOGACAO = "https://hom1.cte.fazenda.gov.br/CTeDistribuicaoDFe/CTeDistribuicaoDFe.asmx";
const NAMESPACE_WSDL = "http://www.portalfiscal.inf.br/cte/wsdl/CTeDistribuicaoDFe";
const TIMEOUT_MS = 60_000;

export interface EntradaDistribuicaoCte {
  cnpj: string;
  codigoUf: number;
  ambiente: 1 | 2;
  ultimoNsu: string;
  certificado: { pfxBase64: string; senha: string };
}

export interface DocumentoCteDistribuido {
  nsu: number;
  schema: string;
  xml: string;
}

export interface ResultadoDistribuicaoCte {
  novas: number;
  ultimoNsu: number;
  cStat: string;
  xMotivo: string;
  documentos: DocumentoCteDistribuido[];
}

function pfxParaPem(pfxBase64: string, senha: string): { key: string; cert: string } {
  const der = forge.util.decode64(pfxBase64);
  let p12: forge.pkcs12.Pkcs12Pfx;
  try {
    p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(der), senha);
  } catch {
    throw new Error("Não consegui abrir o certificado digital (senha incorreta ou arquivo inválido).");
  }

  const oidChaveCifrada = forge.pki.oids.pkcs8ShroudedKeyBag as string;
  const oidChave = forge.pki.oids.keyBag as string;
  const oidCert = forge.pki.oids.certBag as string;
  const bagsChave = [
    ...(p12.getBags({ bagType: oidChaveCifrada })[oidChaveCifrada] ?? []),
    ...(p12.getBags({ bagType: oidChave })[oidChave] ?? []),
  ];
  const chave = bagsChave[0]?.key as forge.pki.rsa.PrivateKey | undefined;
  if (!chave) throw new Error("Certificado digital sem chave privada.");

  const certs = (p12.getBags({ bagType: oidCert })[oidCert] ?? [])
    .map((b) => b.cert)
    .filter((c): c is forge.pki.Certificate => Boolean(c));
  // O certificado da própria empresa é o que casa com a chave privada; o
  // resto é a cadeia da autoridade certificadora.
  const folha = certs.find((c) => (c.publicKey as forge.pki.rsa.PublicKey).n.compareTo(chave.n) === 0);
  if (!folha) throw new Error("Certificado digital sem o certificado correspondente à chave privada.");
  const cadeia = certs.filter((c) => c !== folha);

  return {
    key: forge.pki.privateKeyToPem(chave),
    cert: [folha, ...cadeia].map((c) => forge.pki.certificateToPem(c)).join("\n"),
  };
}

function montarEnvelope(entrada: EntradaDistribuicaoCte): string {
  const nsu = entrada.ultimoNsu.padStart(15, "0");
  const consulta =
    `<distDFeInt xmlns="http://www.portalfiscal.inf.br/cte" versao="1.00">` +
    `<tpAmb>${entrada.ambiente}</tpAmb>` +
    `<cUFAutor>${entrada.codigoUf}</cUFAutor>` +
    `<CNPJ>${entrada.cnpj}</CNPJ>` +
    `<distNSU><ultNSU>${nsu}</ultNSU></distNSU>` +
    `</distDFeInt>`;
  return (
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">` +
    `<soap12:Body><cteDistDFeInteresse xmlns="${NAMESPACE_WSDL}"><cteDadosMsg>${consulta}</cteDadosMsg></cteDistDFeInteresse></soap12:Body>` +
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
          "content-type": `application/soap+xml; charset=utf-8; action="${NAMESPACE_WSDL}/cteDistDFeInteresse"`,
          "content-length": Buffer.byteLength(envelope),
        },
      },
      (res) => {
        const partes: Buffer[] = [];
        res.on("data", (p: Buffer) => partes.push(p));
        res.on("end", () => {
          const corpo = Buffer.concat(partes).toString("utf8");
          if ((res.statusCode ?? 0) >= 400) {
            reject(new Error(`SEFAZ (CT-e) respondeu HTTP ${res.statusCode}: ${corpo.slice(0, 400)}`));
            return;
          }
          resolve(corpo);
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Tempo esgotado esperando a SEFAZ (CT-e).")));
    req.on("error", reject);
    req.write(envelope);
    req.end();
  });
}

function texto(xml: string, tag: string): string {
  const m = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`).exec(xml);
  return m?.[1]?.trim() ?? "";
}

export async function distribuicaoCtePorUltNSU(entrada: EntradaDistribuicaoCte): Promise<ResultadoDistribuicaoCte> {
  const tls = pfxParaPem(entrada.certificado.pfxBase64, entrada.certificado.senha);
  const url = entrada.ambiente === 1 ? URL_PRODUCAO : URL_HOMOLOGACAO;
  const resposta = await chamarSefaz(url, montarEnvelope(entrada), tls);

  if (/<(?:\w+:)?Fault[\s>]/.test(resposta)) {
    throw new Error(`SEFAZ (CT-e) devolveu erro SOAP: ${resposta.slice(0, 500)}`);
  }

  const ret = /<retDistDFeInt[\s\S]*?<\/retDistDFeInt>/.exec(resposta)?.[0];
  if (!ret) {
    throw new Error(`Resposta inesperada da SEFAZ (CT-e): ${resposta.slice(0, 500)}`);
  }

  const cStat = texto(ret, "cStat");
  const xMotivo = texto(ret, "xMotivo");
  const ultimoNsu = Number(texto(ret, "ultNSU") || entrada.ultimoNsu);

  // 137 = nenhum documento / 656 = consumo indevido (a SEFAZ manda usar o
  // ultNSU devolvido) — não são falha, viram resultado com o cStat preservado.
  if (cStat === "137" || cStat === "656") {
    return { novas: 0, ultimoNsu, cStat, xMotivo, documentos: [] };
  }
  if (cStat !== "138") {
    throw new Error(`SEFAZ (CT-e) retornou cStat=${cStat} (${xMotivo})`);
  }

  const documentos: DocumentoCteDistribuido[] = [];
  const regexDoc = /<docZip\s+([^>]*)>([\s\S]*?)<\/docZip>/g;
  for (const m of ret.matchAll(regexDoc)) {
    const atributos = m[1] ?? "";
    const nsu = /NSU="(\d+)"/.exec(atributos)?.[1];
    const schema = /schema="([^"]+)"/.exec(atributos)?.[1] ?? "";
    const conteudo = (m[2] ?? "").trim();
    if (!nsu || !conteudo) continue;
    const xml = zlib.gunzipSync(Buffer.from(conteudo, "base64")).toString("utf8");
    documentos.push({ nsu: Number(nsu), schema, xml });
  }

  return { novas: documentos.length, ultimoNsu, cStat, xMotivo, documentos };
}
