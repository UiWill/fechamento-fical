/**
 * Validação do dígito verificador do CNPJ (algoritmo módulo 11 oficial da
 * Receita Federal) — detecta números com 14 dígitos mas inválidos (ex:
 * digitados errado, ou sequências como 00000000000000).
 */
export function validarDigitosCnpj(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const calcularDigito = (base: string, pesos: number[]): number => {
    const soma = base
      .split("")
      .reduce((acc, digito, i) => acc + Number(digito) * pesos[i]!, 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const base = digits.slice(0, 12);
  const d1 = calcularDigito(base, pesos1);
  const d2 = calcularDigito(base + d1, pesos2);

  return digits === `${base}${d1}${d2}`;
}
