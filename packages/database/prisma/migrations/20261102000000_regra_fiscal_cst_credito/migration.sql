-- CST esperado e se o ICMS do item vira crédito, por regra fiscal (CFOP de
-- entrada) — pedido do cliente em 2026-11-01 (caso de substituição
-- tributária: CFOP de ST não gera crédito de ICMS, item deveria vir com
-- CST 60 e sem crédito apropriável).
ALTER TABLE "regras_fiscais" ADD COLUMN "cstEsperado" TEXT;
ALTER TABLE "regras_fiscais" ADD COLUMN "permiteCreditoIcms" BOOLEAN;
