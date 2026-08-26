-- CreateEnum
CREATE TYPE "PapelUsuario" AS ENUM ('ADMIN_PLATAFORMA', 'ADMIN_ORGANIZACAO', 'OPERADOR');

-- CreateEnum
CREATE TYPE "StatusEmpresa" AS ENUM ('ATIVA', 'INATIVA');

-- CreateEnum
CREATE TYPE "AmbienteFiscal" AS ENUM ('PRODUCAO', 'HOMOLOGACAO');

-- CreateEnum
CREATE TYPE "TipoDocumentoFiscal" AS ENUM ('NFE', 'NFCE');

-- CreateEnum
CREATE TYPE "DirecaoDocumento" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "StatusDocumentoFiscal" AS ENUM ('RECEBIDO', 'MANIFESTADO', 'CLASSIFICADO', 'EXPORTADO', 'ERRO');

-- CreateEnum
CREATE TYPE "TipoEventoManifestacao" AS ENUM ('CIENCIA_OPERACAO', 'CONFIRMACAO_OPERACAO', 'DESCONHECIMENTO_OPERACAO', 'OPERACAO_NAO_REALIZADA');

-- CreateEnum
CREATE TYPE "StatusManifestacao" AS ENUM ('PENDENTE', 'ENVIADA', 'AUTORIZADA', 'REJEITADA');

-- CreateEnum
CREATE TYPE "StatusExportacaoTxt" AS ENUM ('PENDENTE', 'PROCESSANDO', 'CONCLUIDA', 'ERRO');

-- CreateEnum
CREATE TYPE "StatusFatura" AS ENUM ('ABERTA', 'PAGA', 'ATRASADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "organizacoes" (
    "id" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "emailContato" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" "PapelUsuario" NOT NULL DEFAULT 'OPERADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "codigoUf" INTEGER NOT NULL,
    "ambiente" "AmbienteFiscal" NOT NULL DEFAULT 'HOMOLOGACAO',
    "status" "StatusEmpresa" NOT NULL DEFAULT 'ATIVA',
    "ativadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desativadaEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsu_controle" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "ultimoNsu" BIGINT NOT NULL DEFAULT 0,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nsu_controle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nomeArquivoOriginal" TEXT NOT NULL,
    "objetoStorage" TEXT NOT NULL,
    "senhaCriptografada" TEXT NOT NULL,
    "ivCriptografia" TEXT NOT NULL,
    "validoAte" TIMESTAMP(3) NOT NULL,
    "alertaVencimentoEnviado" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_fiscais" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "chaveAcesso" TEXT NOT NULL,
    "tipo" "TipoDocumentoFiscal" NOT NULL,
    "direcao" "DirecaoDocumento" NOT NULL,
    "nsu" BIGINT,
    "status" "StatusDocumentoFiscal" NOT NULL DEFAULT 'RECEBIDO',
    "cfop" TEXT,
    "objetoStorageXml" TEXT NOT NULL,
    "emitidoEm" TIMESTAMP(3),
    "recebidoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentos_fiscais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manifestacao_eventos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "documentoFiscalId" TEXT NOT NULL,
    "tipoEvento" "TipoEventoManifestacao" NOT NULL,
    "status" "StatusManifestacao" NOT NULL DEFAULT 'PENDENTE',
    "protocoloSefaz" TEXT,
    "motivoSefaz" TEXT,
    "enviadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manifestacao_eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regras_fiscais" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT NOT NULL,
    "empresaId" TEXT,
    "cfopEntrada" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT,
    "acumulador" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regras_fiscais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exportacoes_txt" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "periodoInicio" TIMESTAMP(3) NOT NULL,
    "periodoFim" TIMESTAMP(3) NOT NULL,
    "status" "StatusExportacaoTxt" NOT NULL DEFAULT 'PENDENTE',
    "objetoStorageTxt" TEXT,
    "totalDocumentos" INTEGER NOT NULL DEFAULT 0,
    "erro" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidoEm" TIMESTAMP(3),

    CONSTRAINT "exportacoes_txt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faturas" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT NOT NULL,
    "referenciaMes" INTEGER NOT NULL,
    "referenciaAno" INTEGER NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "status" "StatusFatura" NOT NULL DEFAULT 'ABERTA',
    "geradaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pagaEm" TIMESTAMP(3),

    CONSTRAINT "faturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_fatura" (
    "id" TEXT NOT NULL,
    "faturaId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "itens_fatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "organizacaoId" TEXT,
    "usuarioId" TEXT,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidadeId" TEXT,
    "detalhes" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizacoes_cnpj_key" ON "organizacoes"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_organizacaoId_idx" ON "usuarios"("organizacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "empresas"("cnpj");

-- CreateIndex
CREATE INDEX "empresas_organizacaoId_idx" ON "empresas"("organizacaoId");

-- CreateIndex
CREATE INDEX "empresas_status_idx" ON "empresas"("status");

-- CreateIndex
CREATE UNIQUE INDEX "nsu_controle_empresaId_key" ON "nsu_controle"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_empresaId_key" ON "certificados"("empresaId");

-- CreateIndex
CREATE INDEX "certificados_validoAte_idx" ON "certificados"("validoAte");

-- CreateIndex
CREATE UNIQUE INDEX "documentos_fiscais_chaveAcesso_key" ON "documentos_fiscais"("chaveAcesso");

-- CreateIndex
CREATE INDEX "documentos_fiscais_empresaId_direcao_status_idx" ON "documentos_fiscais"("empresaId", "direcao", "status");

-- CreateIndex
CREATE INDEX "documentos_fiscais_empresaId_tipo_idx" ON "documentos_fiscais"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "manifestacao_eventos_empresaId_status_idx" ON "manifestacao_eventos"("empresaId", "status");

-- CreateIndex
CREATE INDEX "regras_fiscais_organizacaoId_cfopEntrada_idx" ON "regras_fiscais"("organizacaoId", "cfopEntrada");

-- CreateIndex
CREATE INDEX "regras_fiscais_empresaId_cfopEntrada_idx" ON "regras_fiscais"("empresaId", "cfopEntrada");

-- CreateIndex
CREATE INDEX "exportacoes_txt_empresaId_status_idx" ON "exportacoes_txt"("empresaId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_organizacaoId_referenciaAno_referenciaMes_key" ON "faturas"("organizacaoId", "referenciaAno", "referenciaMes");

-- CreateIndex
CREATE INDEX "itens_fatura_faturaId_idx" ON "itens_fatura"("faturaId");

-- CreateIndex
CREATE INDEX "audit_logs_organizacaoId_criadoEm_idx" ON "audit_logs"("organizacaoId", "criadoEm");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nsu_controle" ADD CONSTRAINT "nsu_controle_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_fiscais" ADD CONSTRAINT "documentos_fiscais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifestacao_eventos" ADD CONSTRAINT "manifestacao_eventos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifestacao_eventos" ADD CONSTRAINT "manifestacao_eventos_documentoFiscalId_fkey" FOREIGN KEY ("documentoFiscalId") REFERENCES "documentos_fiscais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regras_fiscais" ADD CONSTRAINT "regras_fiscais_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regras_fiscais" ADD CONSTRAINT "regras_fiscais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exportacoes_txt" ADD CONSTRAINT "exportacoes_txt_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_fatura" ADD CONSTRAINT "itens_fatura_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "faturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_fatura" ADD CONSTRAINT "itens_fatura_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
