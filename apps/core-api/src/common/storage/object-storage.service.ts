import { Injectable, OnModuleInit } from "@nestjs/common";
import fs from "node:fs/promises";
import path from "node:path";

export const BUCKET_DOCUMENTOS_FISCAIS =
  process.env.STORAGE_BUCKET_XMLS ?? "afe-documentos-fiscais";
export const BUCKET_CERTIFICADOS =
  process.env.STORAGE_BUCKET_CERTIFICADOS ?? "afe-certificados";
export const BUCKET_EXPORTACOES_TXT =
  process.env.STORAGE_BUCKET_EXPORTACOES_TXT ?? "afe-exportacoes-txt";
export const BUCKET_AGENTE_RELEASES =
  process.env.STORAGE_BUCKET_AGENTE_RELEASES ?? "afe-agente-desktop-releases";

const RAIZ_STORAGE = process.env.OBJECT_STORAGE_PATH ?? path.join(process.cwd(), "object-storage");

const BUCKETS_VALIDOS = new Set([
  BUCKET_DOCUMENTOS_FISCAIS,
  BUCKET_CERTIFICADOS,
  BUCKET_EXPORTACOES_TXT,
  BUCKET_AGENTE_RELEASES,
]);

/**
 * Resolve bucket+key pro caminho absoluto no disco, garantindo que o
 * resultado nunca escape da pasta do bucket — a maioria das chaves hoje já
 * vem de valores internos validados (CNPJ, chave de 44 dígitos, cuid), mas
 * um dos chamadores (versão do agente desktop) aceita uma string mais
 * livre; melhor blindar aqui uma vez do que confiar em cada chamador.
 */
function resolverCaminhoSeguro(bucket: string, key: string): string {
  if (!BUCKETS_VALIDOS.has(bucket)) {
    throw new Error(`Bucket desconhecido: ${bucket}`);
  }
  if (key.includes("\0")) {
    throw new Error("Chave de objeto inválida");
  }

  const pastaBucket = path.resolve(RAIZ_STORAGE, bucket);
  const caminhoCompleto = path.resolve(pastaBucket, key);
  const relativo = path.relative(pastaBucket, caminhoCompleto);

  if (relativo.startsWith("..") || path.isAbsolute(relativo)) {
    throw new Error(`Chave de objeto tenta escapar do bucket: ${key}`);
  }

  return caminhoCompleto;
}

/**
 * Armazenamento de objetos em disco local (pasta por "bucket", arquivo por
 * chave) — substitui o MinIO, que descontinuou os binários gratuitos pra
 * Windows (repositório arquivado, sem mais releases). Nosso uso nunca
 * precisou da API S3 de verdade (nenhum cliente externo fala com o
 * storage, só este service) — filesystem local resolve com a mesma
 * interface, sem processo/serviço externo pra manter.
 */
@Injectable()
export class ObjectStorageService implements OnModuleInit {
  async onModuleInit() {
    for (const bucket of [
      BUCKET_DOCUMENTOS_FISCAIS,
      BUCKET_CERTIFICADOS,
      BUCKET_EXPORTACOES_TXT,
      BUCKET_AGENTE_RELEASES,
    ]) {
      await fs.mkdir(path.join(RAIZ_STORAGE, bucket), { recursive: true });
    }
  }

  async putObject(bucket: string, key: string, data: Buffer): Promise<void> {
    const caminhoCompleto = resolverCaminhoSeguro(bucket, key);
    await fs.mkdir(path.dirname(caminhoCompleto), { recursive: true });
    await fs.writeFile(caminhoCompleto, data);
  }

  async getObject(bucket: string, key: string): Promise<Buffer> {
    return fs.readFile(resolverCaminhoSeguro(bucket, key));
  }
}
