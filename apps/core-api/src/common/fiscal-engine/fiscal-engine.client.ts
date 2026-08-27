import { Injectable } from "@nestjs/common";

export interface CertificadoParaEngine {
  pfxBase64: string;
  senha: string;
}

export interface DistribuicaoDFeRequest {
  cnpj: string;
  codigoUf: number;
  ambiente: 1 | 2;
  ultimoNsu: string;
  certificado: CertificadoParaEngine;
}

export interface DistribuicaoDFeResponse {
  novas: number;
  ultimoNsu: number;
  cStat: string;
  xMotivo: string;
  documentos: Array<{ nsu: number; schema: string; xml: string }>;
}

export type TipoEventoManifestacao =
  | "CONFIRMACAO_OPERACAO"
  | "CIENCIA_OPERACAO"
  | "DESCONHECIMENTO_OPERACAO"
  | "OPERACAO_NAO_REALIZADA";

export interface EnviarEventoRequest {
  cnpj: string;
  codigoUf: number;
  ambiente: 1 | 2;
  chaveAcesso: string;
  tipoEvento: TipoEventoManifestacao;
  numeroSequencial: number;
  justificativa?: string;
  certificado: CertificadoParaEngine;
}

export interface EnviarEventoResponse {
  cStat: string;
  xMotivo: string;
  protocolo?: string;
}

/**
 * Cliente HTTP interno para o serviço fiscal-engine. É a única forma do
 * core-api falar com a SEFAZ — nunca chama ACBrLib/koffi diretamente.
 */
@Injectable()
export class FiscalEngineClient {
  // Serviços Windows nativos, ambos em localhost — não há rede Docker aqui.
  private readonly baseUrl = process.env.FISCAL_ENGINE_URL ?? "http://localhost:3100";
  private readonly internalKey = process.env.FISCAL_ENGINE_INTERNAL_KEY;

  private headers() {
    return {
      "content-type": "application/json",
      ...(this.internalKey ? { "x-internal-key": this.internalKey } : {}),
    };
  }

  async distribuicaoDFe(input: DistribuicaoDFeRequest): Promise<DistribuicaoDFeResponse> {
    const response = await fetch(`${this.baseUrl}/distribuicao-dfe`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`fiscal-engine respondeu ${response.status}: ${body}`);
    }

    return response.json() as Promise<DistribuicaoDFeResponse>;
  }

  async enviarEvento(input: EnviarEventoRequest): Promise<EnviarEventoResponse> {
    const response = await fetch(`${this.baseUrl}/manifestacao`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`fiscal-engine respondeu ${response.status}: ${body}`);
    }

    return response.json() as Promise<EnviarEventoResponse>;
  }
}
