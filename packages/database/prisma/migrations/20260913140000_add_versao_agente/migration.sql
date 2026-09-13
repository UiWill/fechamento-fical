-- CreateTable
CREATE TABLE "versoes_agente" (
    "id" TEXT NOT NULL,
    "versao" TEXT NOT NULL,
    "objetoStorageExe" TEXT NOT NULL,
    "obrigatoria" BOOLEAN NOT NULL DEFAULT false,
    "notas" TEXT,
    "publicadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "versoes_agente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "versoes_agente_versao_key" ON "versoes_agente"("versao");
