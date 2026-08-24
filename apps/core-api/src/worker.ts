/**
 * Processo separado para jobs agendados (BullMQ) — mesma base de código do
 * core-api, entrypoint diferente (ver Dockerfile: `node dist/worker.js`).
 *
 * FASE 2: nenhum processor registrado ainda. Os candidatos naturais, na
 * ordem em que provavelmente serão precisos:
 *   1. Polling periódico de NSU por empresa (DocumentosFiscaisService.sincronizarComSefaz)
 *   2. Alerta de certificado vencendo (CertificadosService.listarVencendoEm)
 *   3. Geração mensal de fatura (FaturamentoService.gerarFaturaDoMes)
 *
 * Por enquanto só confirma que a conexão com o Redis está de pé, para que o
 * docker-compose de dev tenha algo verificável rodando neste processo.
 */
import { Queue } from "bullmq";

async function bootstrap() {
  const connection = { url: process.env.REDIS_URL ?? "redis://localhost:6379" };
  const queue = new Queue("afe-jobs", { connection });

  await queue.waitUntilReady();
  // eslint-disable-next-line no-console
  console.log("[worker] conectado ao Redis — nenhum processor registrado ainda (fase 2)");
}

bootstrap();
