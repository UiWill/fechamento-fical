// Espelham os enums do Prisma (packages/database/prisma/schema.prisma).
// Mantidos aqui como union types + zod para que apps/admin-web (frontend)
// não precise depender de @prisma/client diretamente.

export const STATUS_EMPRESA = ["ATIVA", "INATIVA"] as const;
export type StatusEmpresa = (typeof STATUS_EMPRESA)[number];

export const AMBIENTE_FISCAL = ["PRODUCAO", "HOMOLOGACAO"] as const;
export type AmbienteFiscal = (typeof AMBIENTE_FISCAL)[number];

export const TIPO_DOCUMENTO_FISCAL = ["NFE", "NFCE", "CTE"] as const;
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

// À vista x a prazo — ver comentário em xml-documento-fiscal.ts e no
// schema.prisma (DocumentoFiscal.condicaoPagamento / RegraFiscal.condicaoPagamento).
export const CONDICAO_PAGAMENTO = ["AVISTA", "APRAZO"] as const;
export type CondicaoPagamento = (typeof CONDICAO_PAGAMENTO)[number];

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

export const STATUS_AGENTE_INSTALACAO = ["ATIVO", "REVOGADO"] as const;
export type StatusAgenteInstalacao = (typeof STATUS_AGENTE_INSTALACAO)[number];

export const CAMPO_CORRECAO = [
  "CFOP",
  "NCM",
  "CST_ICMS",
  "DADOS_DESTINATARIO",
  "DADOS_TRANSPORTE",
  "INFORMACOES_COMPLEMENTARES",
  "OUTRO",
] as const;
export type CampoCorrecao = (typeof CAMPO_CORRECAO)[number];

export const STATUS_CORRECAO = ["PENDENTE", "ENVIADA", "AUTORIZADA", "REJEITADA"] as const;
export type StatusCorrecao = (typeof STATUS_CORRECAO)[number];

// Regime tributário da empresa — usado pra calibrar as checagens de
// Apuração ICMS/IBS-CBS por regime (ex: empresa do Simples não é
// obrigada a destacar IBS/CBS, item com CSOSN só é esperado pra quem
// está aqui como SIMPLES_NACIONAL/MEI). LUCRO_PRESUMIDO/LUCRO_REAL só
// dá pra distinguir via BrasilAPI (não vem no CRT da nota, que só diz
// "Regime Normal") — REGIME_NORMAL é o valor usado enquanto isso não
// foi resolvido ainda.
export const REGIME_TRIBUTARIO = [
  "SIMPLES_NACIONAL",
  "SIMPLES_SUBLIMITE_EXCEDIDO",
  "MEI",
  "LUCRO_PRESUMIDO",
  "LUCRO_REAL",
  "REGIME_NORMAL",
] as const;
export type RegimeTributario = (typeof REGIME_TRIBUTARIO)[number];

// De onde veio o valor de Empresa.regimeTributario — importa pra UI saber
// se pode confiar/sobrescrever automaticamente. NOTA_FISCAL (lido do CRT
// das próprias notas da empresa) é a fonte mais confiável, porque a SEFAZ
// já valida contra o cadastro real dela (rejeição 481 se divergir).
// MANUAL nunca é sobrescrito automaticamente.
export const ORIGEM_REGIME_TRIBUTARIO = ["NOTA_FISCAL", "BRASIL_API", "MANUAL"] as const;
export type OrigemRegimeTributario = (typeof ORIGEM_REGIME_TRIBUTARIO)[number];

export const VALOR_MENSALIDADE_POR_CNPJ = 49.9;
