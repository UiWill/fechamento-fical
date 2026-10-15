-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "dataInicioMonitoramento" TIMESTAMP(3);

-- Backfill: empresas ja cadastradas sem corte definido passam a captar
-- so a partir de setembro/2026 (pedido explicito do usuario) -- antes
-- disso as pastas monitoradas tinham anos de XML que nao deviam entrar.
UPDATE "empresas" SET "dataInicioMonitoramento" = '2026-09-01T00:00:00Z' WHERE "dataInicioMonitoramento" IS NULL;
