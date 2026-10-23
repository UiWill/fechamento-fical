-- CreateEnum
CREATE TYPE "CampoCorrecao" AS ENUM ('CFOP', 'NCM', 'CST_ICMS', 'DADOS_DESTINATARIO', 'DADOS_TRANSPORTE', 'INFORMACOES_COMPLEMENTARES', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusCorrecao" AS ENUM ('PENDENTE', 'ENVIADA', 'AUTORIZADA', 'REJEITADA');

-- CreateTable
CREATE TABLE "regras_correcao" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT NOT NULL,
    "criadoPorUsuarioId" TEXT NOT NULL,
    "campo" "CampoCorrecao" NOT NULL,
    "ncm" TEXT,
    "descricaoProduto" TEXT,
    "cfopContexto" TEXT,
    "valorErrado" TEXT NOT NULL,
    "valorCorreto" TEXT NOT NULL,
    "permiteCceSeguro" BOOLEAN NOT NULL DEFAULT true,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regras_correcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correcao_eventos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "documentoFiscalId" TEXT NOT NULL,
    "regraCorrecaoId" TEXT,
    "usuarioId" TEXT NOT NULL,
    "campo" "CampoCorrecao" NOT NULL,
    "valorErrado" TEXT NOT NULL,
    "valorCorreto" TEXT NOT NULL,
    "textoEnviado" TEXT NOT NULL,
    "nSeqEvento" INTEGER NOT NULL,
    "status" "StatusCorrecao" NOT NULL DEFAULT 'PENDENTE',
    "protocoloSefaz" TEXT,
    "motivoSefaz" TEXT,
    "enviadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correcao_eventos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "regras_correcao_organizacaoId_ncm_idx" ON "regras_correcao"("organizacaoId", "ncm");

-- CreateIndex
CREATE INDEX "regras_correcao_organizacaoId_ativa_idx" ON "regras_correcao"("organizacaoId", "ativa");

-- CreateIndex
CREATE INDEX "correcao_eventos_empresaId_idx" ON "correcao_eventos"("empresaId");

-- CreateIndex
CREATE INDEX "correcao_eventos_documentoFiscalId_idx" ON "correcao_eventos"("documentoFiscalId");

-- AddForeignKey
ALTER TABLE "regras_correcao" ADD CONSTRAINT "regras_correcao_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regras_correcao" ADD CONSTRAINT "regras_correcao_criadoPorUsuarioId_fkey" FOREIGN KEY ("criadoPorUsuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correcao_eventos" ADD CONSTRAINT "correcao_eventos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correcao_eventos" ADD CONSTRAINT "correcao_eventos_documentoFiscalId_fkey" FOREIGN KEY ("documentoFiscalId") REFERENCES "documentos_fiscais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correcao_eventos" ADD CONSTRAINT "correcao_eventos_regraCorrecaoId_fkey" FOREIGN KEY ("regraCorrecaoId") REFERENCES "regras_correcao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correcao_eventos" ADD CONSTRAINT "correcao_eventos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
