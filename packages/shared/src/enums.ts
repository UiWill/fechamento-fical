// Espelham os enums do Prisma (packages/database/prisma/schema.prisma).
// Mantidos aqui como union types + zod para que apps/admin-web (frontend)
// não precise depender de @prisma/client diretamente.

export const STATUS_EMPRESA = ["ATIVA", "INATIVA"] as const;
export type StatusEmpresa = (typeof STATUS_EMPRESA)[number];

export const AMBIENTE_FISCAL = ["PRODUCAO", "HOMOLOGACAO"] as const;
export type AmbienteFiscal = (typeof AMBIENTE_FISCAL)[number];

export const TIPO_DOCUMENTO_FISCAL = ["NFE", "NFCE"] as const;
export type TipoDocumentoFiscal = (typeof TIPO_DOCUMENTO_FISCAL)[number];

export const DIRECAO_DOCUMENTO = ["ENTRADA", "SAIDA"] as const;
export type DirecaoDocumento = (typeof DIRECAO_DOCUMENTO)[number];

export const STATUS_DOCUMENTO_FISCAL = [
  "RECEBIDO",
  "MANIFESTADO",
  "CLASSIFICADO",
  "EXPORTADO",
  "ERRO",
] as const;
export type StatusDocumentoFiscal = (typeof STATUS_DOCUMENTO_FISCAL)[number];

export const TIPO_EVENTO_MANIFESTACAO = [
  "CIENCIA_OPERACAO",
  "CONFIRMACAO_OPERACAO",
  "DESCONHECIMENTO_OPERACAO",
  "OPERACAO_NAO_REALIZADA",
] as const;
export type TipoEventoManifestacao = (typeof TIPO_EVENTO_MANIFESTACAO)[number];

// Código de evento SEFAZ (tpEvento) correspondente a cada tipo de manifestação.
export const CODIGO_EVENTO_MANIFESTACAO: Record<TipoEventoManifestacao, string> = {
  CONFIRMACAO_OPERACAO: "210200",
  CIENCIA_OPERACAO: "210210",
  DESCONHECIMENTO_OPERACAO: "210220",
  OPERACAO_NAO_REALIZADA: "210240",
};

export const STATUS_EXPORTACAO_TXT = [
  "PENDENTE",
  "PROCESSANDO",
  "CONCLUIDA",
  "ERRO",
] as const;
export type StatusExportacaoTxt = (typeof STATUS_EXPORTACAO_TXT)[number];

export const STATUS_FATURA = ["ABERTA", "PAGA", "ATRASADA", "CANCELADA"] as const;
export type StatusFatura = (typeof STATUS_FATURA)[number];

export const PAPEL_USUARIO = [
  "ADMIN_PLATAFORMA",
  "ADMIN_ORGANIZACAO",
  "OPERADOR",
] as const;
export type PapelUsuario = (typeof PAPEL_USUARIO)[number];

export const VALOR_MENSALIDADE_POR_CNPJ = 49.9;
