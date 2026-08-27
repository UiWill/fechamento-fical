export function mascararCnpj(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return cnpj;
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

/** Formata progressivamente enquanto o usuário digita (funciona com string parcial). */
export function mascararCnpjParcial(valor: string): string {
  const digits = valor.replace(/\D/g, "").slice(0, 14);
  let resultado = digits;
  if (digits.length > 12) {
    resultado = digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5");
  } else if (digits.length > 8) {
    resultado = digits.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
  } else if (digits.length > 5) {
    resultado = digits.replace(/(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
  } else if (digits.length > 2) {
    resultado = digits.replace(/(\d{2})(\d{0,3})/, "$1.$2");
  }
  return resultado;
}

export function mascararChave(chave: string): string {
  return chave.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

/** Lê um File (input type=file) como base64 puro, sem o prefixo data:...;base64, */
export function arquivoParaBase64(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const resultado = reader.result as string;
      resolve(resultado.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(arquivo);
  });
}
