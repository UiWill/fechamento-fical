-- AlterTable
ALTER TABLE "documentos_fiscais" ADD COLUMN     "acumulador" TEXT,
ADD COLUMN     "classificadoEm" TIMESTAMP(3),
ADD COLUMN     "observacao" TEXT;
