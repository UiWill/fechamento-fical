-- CreateEnum
CREATE TYPE "RegimeTributario" AS ENUM ('SIMPLES_NACIONAL', 'SIMPLES_SUBLIMITE_EXCEDIDO', 'MEI', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'REGIME_NORMAL');

-- CreateEnum
CREATE TYPE "OrigemRegimeTributario" AS ENUM ('NOTA_FISCAL', 'BRASIL_API', 'MANUAL');

-- AlterTable: regime tributário da empresa (auto, lido das próprias notas ou da BrasilAPI)
ALTER TABLE "empresas" ADD COLUMN "regimeTributario" "RegimeTributario";
ALTER TABLE "empresas" ADD COLUMN "origemRegimeTributario" "OrigemRegimeTributario";

-- AlterTable: CRT e UF do destinatário por nota, pra calibrar as checagens de Apuração por regime
ALTER TABLE "documentos_fiscais" ADD COLUMN "crt" INTEGER;
ALTER TABLE "documentos_fiscais" ADD COLUMN "ufDestinatario" TEXT;

-- AlterTable: aplicar regra fiscal a um grupo de empresas selecionadas (além de "uma" ou "todas")
ALTER TABLE "regras_fiscais" ADD COLUMN "empresaIds" TEXT[] NOT NULL DEFAULT '{}';
