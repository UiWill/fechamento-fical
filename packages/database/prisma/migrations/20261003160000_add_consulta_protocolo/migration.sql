-- AlterTable
ALTER TABLE "documentos_fiscais"
  ADD COLUMN "cStatConsulta" TEXT,
  ADD COLUMN "xMotivoConsulta" TEXT,
  ADD COLUMN "consultadoEm" TIMESTAMP(3);
