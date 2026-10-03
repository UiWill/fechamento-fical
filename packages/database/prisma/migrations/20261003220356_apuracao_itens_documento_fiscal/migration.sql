-- AlterTable
ALTER TABLE "regras_fiscais" ADD COLUMN     "cfopSaidaEsperado" TEXT;

-- CreateTable
CREATE TABLE "itens_documentos_fiscais" (
    "id" TEXT NOT NULL,
    "documentoFiscalId" TEXT NOT NULL,
    "nItem" INTEGER NOT NULL,
    "cProd" TEXT NOT NULL,
    "xProd" TEXT NOT NULL,
    "ncm" TEXT NOT NULL,
    "cfop" TEXT NOT NULL,
    "quantidade" DECIMAL(14,4) NOT NULL,
    "valorUnitario" DECIMAL(14,4) NOT NULL,
    "valorProdutos" DECIMAL(14,2) NOT NULL,
    "icmsCst" TEXT,
    "icmsBase" DECIMAL(14,2),
    "icmsAliquota" DECIMAL(7,4),
    "icmsValor" DECIMAL(14,2),
    "ipiCst" TEXT,
    "ipiBase" DECIMAL(14,2),
    "ipiAliquota" DECIMAL(7,4),
    "ipiValor" DECIMAL(14,2),
    "pisCst" TEXT,
    "pisBase" DECIMAL(14,2),
    "pisAliquota" DECIMAL(7,4),
    "pisValor" DECIMAL(14,2),
    "cofinsCst" TEXT,
    "cofinsBase" DECIMAL(14,2),
    "cofinsAliquota" DECIMAL(7,4),
    "cofinsValor" DECIMAL(14,2),
    "ibsCbsCst" TEXT,
    "cClassTrib" TEXT,
    "ibsCbsBase" DECIMAL(14,2),
    "ibsUfAliquota" DECIMAL(7,4),
    "ibsUfValor" DECIMAL(14,2),
    "ibsMunAliquota" DECIMAL(7,4),
    "ibsMunValor" DECIMAL(14,2),
    "cbsAliquota" DECIMAL(7,4),
    "cbsValor" DECIMAL(14,2),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itens_documentos_fiscais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "itens_documentos_fiscais_documentoFiscalId_idx" ON "itens_documentos_fiscais"("documentoFiscalId");

-- AddForeignKey
ALTER TABLE "itens_documentos_fiscais" ADD CONSTRAINT "itens_documentos_fiscais_documentoFiscalId_fkey" FOREIGN KEY ("documentoFiscalId") REFERENCES "documentos_fiscais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
