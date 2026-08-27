// Sigla -> codigo IBGE da UF, necessario para o cadastro de Empresa
// (o schema Prisma guarda o codigo IBGE, nao a sigla, para a chamada a
// SEFAZ). Mesma lista usada em apps/fiscal-engine/src/acbr/uf.ts.
export const CODIGO_IBGE_POR_UF: Record<string, number> = {
  AC: 12, AL: 27, AP: 16, AM: 13, BA: 29, CE: 23, DF: 53,
  ES: 32, GO: 52, MA: 21, MT: 51, MS: 50, MG: 31, PA: 15,
  PB: 25, PR: 41, PE: 26, PI: 22, RJ: 33, RN: 24, RS: 43,
  RO: 11, RR: 14, SC: 42, SP: 35, SE: 28, TO: 17,
};
