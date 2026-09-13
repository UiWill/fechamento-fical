import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

// Campos BigInt do Prisma (nsu, ultimoNsu...) quebram JSON.stringify sem
// isto — Node não sabe serializar BigInt nativamente.
(BigInt.prototype as unknown as { toJSON(): string }).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // Default do Fastify é 1MB — o lote de XML em base64 do agente desktop
    // (ver apps/core-api/src/agentes/) estoura isso fácil.
    new FastifyAdapter({ bodyLimit: 20 * 1024 * 1024 })
  );

  app.enableCors();

  const port = Number(process.env.CORE_API_PORT ?? 3000);
  await app.listen(port, "0.0.0.0");
  // eslint-disable-next-line no-console
  console.log(`core-api ouvindo na porta ${port}`);
}

bootstrap();
