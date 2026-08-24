import { Injectable, OnModuleInit } from "@nestjs/common";
import { Client } from "minio";

export const BUCKET_DOCUMENTOS_FISCAIS =
  process.env.MINIO_BUCKET_XMLS ?? "afe-documentos-fiscais";
export const BUCKET_CERTIFICADOS =
  process.env.MINIO_BUCKET_CERTIFICADOS ?? "afe-certificados";

@Injectable()
export class ObjectStorageService implements OnModuleInit {
  private readonly client = new Client({
    endPoint: process.env.MINIO_ENDPOINT ?? "localhost",
    port: Number(process.env.MINIO_PORT ?? 9000),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ROOT_USER ?? "",
    secretKey: process.env.MINIO_ROOT_PASSWORD ?? "",
  });

  async onModuleInit() {
    for (const bucket of [BUCKET_DOCUMENTOS_FISCAIS, BUCKET_CERTIFICADOS]) {
      const existe = await this.client.bucketExists(bucket).catch(() => false);
      if (!existe) {
        await this.client.makeBucket(bucket);
      }
    }
  }

  async putObject(bucket: string, key: string, data: Buffer): Promise<void> {
    await this.client.putObject(bucket, key, data);
  }

  async getObject(bucket: string, key: string): Promise<Buffer> {
    const stream = await this.client.getObject(bucket, key);
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks);
  }
}
