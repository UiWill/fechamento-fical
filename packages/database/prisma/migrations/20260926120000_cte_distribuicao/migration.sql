-- AlterEnum
ALTER TYPE "DirecaoDocumento" ADD VALUE 'CTE_DISTRIBUICAO';

-- AlterTable
ALTER TABLE "documentos_fiscais" ADD COLUMN "detalhe" JSONB;

-- CreateTable
CREATE TABLE "nsu_controle_cte" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "ultimoNsu" BIGINT NOT NULL DEFAULT 0,
    "ultimoCStat" TEXT,
    "ultimoXMotivo" TEXT,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nsu_controle_cte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nsu_controle_cte_empresaId_key" ON "nsu_controle_cte"("empresaId");

-- AddForeignKey
ALTER TABLE "nsu_controle_cte" ADD CONSTRAINT "nsu_controle_cte_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
