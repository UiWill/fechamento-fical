-- CreateIndex
-- CONCURRENTLY pra nao travar escrita da tabela enquanto cria (tabela ja
-- tem ~70 mil linhas em producao, com agentes gravando o tempo todo).
CREATE INDEX CONCURRENTLY IF NOT EXISTS "documentos_fiscais_empresaId_direcao_emitidoEm_idx" ON "documentos_fiscais"("empresaId", "direcao", "emitidoEm");
