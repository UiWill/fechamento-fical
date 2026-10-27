-- AlterTable
ALTER TABLE "agente_instalacao_tokens" ADD COLUMN "ultimoLogRecebido" TEXT;
ALTER TABLE "agente_instalacao_tokens" ADD COLUMN "ultimoLogRecebidoEm" TIMESTAMP(3);
