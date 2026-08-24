import crypto from "node:crypto";

/**
 * Envelope encryption (AES-256-GCM) para dados sensíveis em repouso —
 * certificado digital (PFX) e sua senha. A chave mestra (CERT_MASTER_KEY)
 * vive só em variável de ambiente do core-api; nunca é persistida no banco
 * nem sai deste processo.
 */

const ALGORITHM = "aes-256-gcm";

function getMasterKey(): Buffer {
  const hex = process.env.CERT_MASTER_KEY;
  if (!hex) {
    throw new Error(
      "CERT_MASTER_KEY não configurada. Gere com: openssl rand -hex 32"
    );
  }
  const key = Buffer.from(hex, "hex");
  if (key.length !== 32) {
    throw new Error("CERT_MASTER_KEY deve ter 32 bytes (64 caracteres hex)");
  }
  return key;
}

export interface EncryptedPayload {
  /** ciphertext + authTag concatenados, em base64 */
  conteudoCriptografado: string;
  /** IV usado nesta cifra, em base64 — necessário para decifrar */
  iv: string;
}

export function encryptBuffer(plain: Buffer): EncryptedPayload {
  const key = getMasterKey();
  const iv = crypto.randomBytes(12); // 96 bits, recomendado para GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const ciphertext = Buffer.concat([cipher.update(plain), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    conteudoCriptografado: Buffer.concat([ciphertext, authTag]).toString("base64"),
    iv: iv.toString("base64"),
  };
}

export function decryptBuffer(payload: EncryptedPayload): Buffer {
  const key = getMasterKey();
  const iv = Buffer.from(payload.iv, "base64");
  const combined = Buffer.from(payload.conteudoCriptografado, "base64");

  const authTag = combined.subarray(combined.length - 16);
  const ciphertext = combined.subarray(0, combined.length - 16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

export function encryptString(plain: string): EncryptedPayload {
  return encryptBuffer(Buffer.from(plain, "utf8"));
}

export function decryptString(payload: EncryptedPayload): string {
  return decryptBuffer(payload).toString("utf8");
}
