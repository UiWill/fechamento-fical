-- CreateTable
CREATE TABLE "rotinas_sistema" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "executadoEm" TIMESTAMP(3) NOT NULL,
    "sucesso" BOOLEAN NOT NULL,
    "detalhe" TEXT,

    CONSTRAINT "rotinas_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rotinas_sistema_nome_key" ON "rotinas_sistema"("nome");
