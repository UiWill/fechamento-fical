/**
 * Converte um certificado PFX (base64) pra PEM (chave + certificado),
 * usado nas chamadas SOAP feitas direto em Node (sem ACBrLib) — hoje CT-e
 * Distribuição DFe e NF-e Consulta Protocolo.
 *
 * O PFX das empresas usa criptografia antiga (RC2-40) que o OpenSSL 3 do
 * Node recusa como "senha inválida" mesmo com a senha certa — por isso o
 * node-forge converte pra PEM antes de montar o TLS.
 */
import forge from "node-forge";

export interface CertificadoPem {
  key: string;
  cert: string;
}

export function pfxParaPem(pfxBase64: string, senha: string): CertificadoPem {
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
