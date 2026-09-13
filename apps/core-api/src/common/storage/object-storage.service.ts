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
    const caminhoCompleto = path.join(RAIZ_STORAGE, bucket, key);
    await fs.mkdir(path.dirname(caminhoCompleto), { recursive: true });
    await fs.writeFile(caminhoCompleto, data);
  }

  async getObject(bucket: string, key: string): Promise<Buffer> {
    return fs.readFile(path.join(RAIZ_STORAGE, bucket, key));
  }
}
