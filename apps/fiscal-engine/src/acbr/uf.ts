// Código IBGE -> sigla UF (necessário pela API da ACBrLib, que espera a sigla).
export const CODIGO_UF: Record<number, string> = {
  12: "AC", 27: "AL", 16: "AP", 13: "AM", 29: "BA", 23: "CE", 53: "DF",
  32: "ES", 52: "GO", 21: "MA", 51: "MT", 50: "MS", 31: "MG", 15: "PA",
  25: "PB", 41: "PR", 26: "PE", 22: "PI", 33: "RJ", 24: "RN", 43: "RS",
  11: "RO", 14: "RR", 42: "SC", 35: "SP", 28: "SE", 17: "TO",
};

export function siglaUf(codigoUf: number): string {
  const sigla = CODIGO_UF[codigoUf];
  if (!sigla) {
    throw new Error(`Código de UF desconhecido: ${codigoUf}`);
  }
  return sigla;
}
