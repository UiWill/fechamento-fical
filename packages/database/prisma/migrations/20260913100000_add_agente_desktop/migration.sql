-- AlterEnum
ALTER TYPE "TipoDocumentoFiscal" ADD VALUE 'CTE';

-- CreateEnum
CREATE TYPE "StatusAgenteInstalacao" AS ENUM ('ATIVO', 'REVOGADO');

-- CreateTable
CREATE TABLE "agente_instalacao_tokens" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT,
    "empresaId" TEXT,
    "nome" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "status" "StatusAgenteInstalacao" NOT NULL DEFAULT 'ATIVO',
    "revogadoEm" TIMESTAMP(3),
    "ultimoHeartbeatEm" TIMESTAMP(3),
    "ultimaVersaoAgente" TEXT,
    "ultimoIpOrigem" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agente_instalacao_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agente_instalacao_tokens_tokenHash_key" ON "agente_instalacao_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "agente_instalacao_tokens_organizacaoId_idx" ON "agente_instalacao_tokens"("organizacaoId");

-- CreateIndex
CREATE INDEX "agente_instalacao_tokens_empresaId_idx" ON "agente_instalacao_tokens"("empresaId");

-- CreateIndex
CREATE INDEX "agente_instalacao_tokens_ultimoHeartbeatEm_idx" ON "agente_instalacao_tokens"("ultimoHeartbeatEm");

-- AddForeignKey
ALTER TABLE "agente_instalacao_tokens" ADD CONSTRAINT "agente_instalacao_tokens_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agente_instalacao_tokens" ADD CONSTRAINT "agente_instalacao_tokens_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Exatamente um de organizacaoId/empresaId deve estar preenchido (nao
-- expressavel via schema Prisma diretamente).
ALTER TABLE "agente_instalacao_tokens" ADD CONSTRAINT "agente_token_escopo_exclusivo" CHECK (
    ("organizacaoId" IS NOT NULL AND "empresaId" IS NULL) OR
    ("organizacaoId" IS NULL AND "empresaId" IS NOT NULL)
);

-- AlterTable
ALTER TABLE "documentos_fiscais" ADD COLUMN "agenteInstalacaoTokenId" TEXT;

-- CreateIndex
CREATE INDEX "documentos_fiscais_agenteInstalacaoTokenId_idx" ON "documentos_fiscais"("agenteInstalacaoTokenId");

-- AddForeignKey
ALTER TABLE "documentos_fiscais" ADD CONSTRAINT "documentos_fiscais_agenteInstalacaoTokenId_fkey" FOREIGN KEY ("agenteInstalacaoTokenId") REFERENCES "agente_instalacao_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
