import forge from "node-forge";

export interface DadosCertificadoPfx {
  validoAte: Date;
  cnpjCertificado: string | null;
}

/**
 * Lê o PFX de verdade (via node-forge, não o openssl do sistema — o
 * OpenSSL 3.x rejeita como "invalid password" arquivos PKCS12 antigos
 * (RC2-40-CBC/SHA1) que a maioria das ACs brasileiras ainda emite; o
 * node-forge lida com esse formato sem depender de provider legacy) pra
 * extrair a validade e o CNPJ direto do certificado, em vez de confiar no
 * que a pessoa digita. Isso também serve como validação da senha: um PFX
 * com senha errada nunca era detectado antes (só ia falhar depois, na hora
 * de assinar de verdade contra a SEFAZ).
 */
export function lerCertificadoPfx(pfxBuffer: Buffer, senha: string): DadosCertificadoPfx {
  let p12: forge.pkcs12.Pkcs12Pfx;
  try {
    const asn1 = forge.asn1.fromDer(pfxBuffer.toString("binary"));
    p12 = forge.pkcs12.pkcs12FromAsn1(asn1, senha);
  } catch {
    throw new Error("Não foi possível abrir o certificado — senha incorreta ou arquivo corrompido.");
  }

  const oidCertBag = forge.pki.oids.certBag!;
  const bags = p12.getBags({ bagType: oidCertBag });
  const certBag = (bags[oidCertBag] ?? []).find((bag: forge.pkcs12.Bag) => bag.cert);
  if (!certBag?.cert) {
    throw new Error("Não encontrei nenhum certificado dentro do arquivo .pfx.");
  }

  // O CN de um e-CNPJ ICP-Brasil tem o formato "RAZAO SOCIAL:CNPJ" — não dá
  // pra procurar 14 dígitos em qualquer atributo do subject, porque também
  // aparecem OUs com outros números de 14 dígitos que não são o CNPJ (ex:
  // um identificador da AC certificadora).
  const valorCN = certBag.cert.subject.attributes.find(
    (atributo: forge.pki.CertificateField) => atributo.shortName === "CN" || atributo.name === "commonName"
  )?.value;
  const cnpjCertificado = String(valorCN ?? "").match(/(\d{14})$/)?.[1] ?? null;

  return {
    validoAte: certBag.cert.validity.notAfter,
    cnpjCertificado,
  };
}
