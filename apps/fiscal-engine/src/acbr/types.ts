export interface CertificadoInput {
  /**
   * Conteúdo do PFX em base64. O fiscal-engine não tem acesso ao MinIO nem à
   * chave de criptografia — é o core-api quem descriptografa o certificado e
   * envia o conteúdo bruto aqui, por chamada. O fiscal-engine grava em um
   * arquivo temporário só durante a chamada à ACBrLib e apaga em seguida
   * (ver client.ts) — nunca persiste certificado em disco.
   */
  pfxBase64: string;
  senha: string;
}

export interface DistribuicaoDFeInput {
  cnpj: string;
  /** Código IBGE da UF, ex: 31 = MG */
  codigoUf: number;
  /** 1 = produção, 2 = homologação */
  ambiente: 1 | 2;
  certificado: CertificadoInput;
  /** Último NSU processado — o core-api é quem guarda esse estado (tabela nsu_controle) */
  ultimoNsu: string;
}

export interface DocumentoDistribuido {
  nsu: number;
  schema: string;
  xml: string;
}

export interface DistribuicaoDFeResultado {
  novas: number;
  ultimoNsu: number;
  cStat: string;
  xMotivo: string;
  documentos: DocumentoDistribuido[];
}

export interface StatusServicoInput {
  codigoUf: number;
  ambiente: 1 | 2;
}

export interface StatusServicoResultado {
  cStat: string;
  xMotivo: string;
  tempoMedioResposta?: number;
}

/** Códigos de evento do leiaute da SEFAZ (schema oficial, não específico da ACBr). */
export type TipoEventoManifestacao =
  | "CONFIRMACAO_OPERACAO" // 210200
  | "CIENCIA_OPERACAO" // 210210
  | "DESCONHECIMENTO_OPERACAO" // 210220
  | "OPERACAO_NAO_REALIZADA"; // 210240

export interface EnviarEventoInput {
  cnpj: string;
  /** Código IBGE da UF do autor do evento */
  codigoUf: number;
  /** 1 = produção, 2 = homologação */
  ambiente: 1 | 2;
  certificado: CertificadoInput;
  /** Chave de acesso do documento (44 dígitos) */
  chaveAcesso: string;
  tipoEvento: TipoEventoManifestacao;
  /** Normalmente 1 — só sobe se o mesmo evento já foi enviado antes para essa chave */
  numeroSequencial: number;
  /** Obrigatória (15-255 caracteres) para DESCONHECIMENTO_OPERACAO e OPERACAO_NAO_REALIZADA */
  justificativa?: string;
}

export interface EnviarEventoResultado {
  cStat: string;
  xMotivo: string;
  protocolo?: string;
}
