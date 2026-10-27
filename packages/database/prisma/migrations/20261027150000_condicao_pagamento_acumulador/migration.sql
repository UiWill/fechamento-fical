-- CreateEnum
CREATE TYPE "CondicaoPagamento" AS ENUM ('AVISTA', 'APRAZO');

-- AlterTable
ALTER TABLE "documentos_fiscais" ADD COLUMN "condicaoPagamento" "CondicaoPagamento";

-- AlterTable
ALTER TABLE "regras_fiscais" ADD COLUMN "condicaoPagamento" "CondicaoPagamento";
