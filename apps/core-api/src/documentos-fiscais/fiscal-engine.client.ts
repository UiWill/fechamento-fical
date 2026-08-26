import { Injectable } from "@nestjs/common";

export interface DistribuicaoDFeRequest {
  cnpj: string;
  codigoUf: number;
  ambiente: 1 | 2;
  ultimoNsu: string;
  certificado: { pfxBase64: string; senha: string };
}

export interface DistribuicaoDFeResponse {
  novas: number;
  ultimoNsu: number;
  cStat: string;
  xMotivo: string;
  documentos: Array<{ nsu: number; schema: string; xml: string }>;
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

  async distribuicaoDFe(input: DistribuicaoDFeRequest): Promise<DistribuicaoDFeResponse> {
    const response = await fetch(`${this.baseUrl}/distribuicao-dfe`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.internalKey ? { "x-internal-key": this.internalKey } : {}),
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`fiscal-engine respondeu ${response.status}: ${body}`);
    }

    return response.json() as Promise<DistribuicaoDFeResponse>;
  }
}
