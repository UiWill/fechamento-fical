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

  // Sem "methods" explícito, o padrão do @fastify/cors é só GET,HEAD,POST
  // (diferente do pacote "cors" do Express) — sem isso, toda rota
  // DELETE/PUT/PATCH (ex: excluir agente) falha no preflight do navegador
  // mesmo existindo e funcionando certinho no backend.
  //
  // exposedHeaders libera "Content-Disposition" pra leitura via JS no
  // navegador — sem isso, `response.headers.get("content-disposition")`
  // sempre volta null no front mesmo o header chegando de verdade (visível
  // só no inspetor de rede do DevTools, que tem acesso privilegiado). É o
  // que dá o nome real do arquivo em downloads como o da exportação TXT.
  app.enableCors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders: "Content-Disposition",
  });

  const port = Number(process.env.CORE_API_PORT ?? 3000);
  await app.listen(port, "0.0.0.0");
  // eslint-disable-next-line no-console
  console.log(`core-api ouvindo na porta ${port}`);
}

bootstrap();
