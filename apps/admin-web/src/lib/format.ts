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

/** Versão curta da chave de acesso pra caber em tabela — o valor completo fica só no title. */
export function chaveResumida(chave: string): string {
  if (chave.length !== 44) return chave;
  return `${chave.slice(0, 6)}…${chave.slice(-6)}`;
}

/** Número da nota vem embutido na própria chave de acesso (posições 26-34), sem zeros à esquerda. */
export function numeroNotaDaChave(chave: string): string {
  if (chave.length !== 44) return "—";
  return String(Number(chave.slice(25, 34)));
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Chave "AAAA-MM" do mês de uma data ISO — usada para agrupar/filtrar por mês. */
export function chaveMes(iso: string): string {
  return iso.slice(0, 7);
}

export function mesAtual(): string {
  return new Date().toISOString().slice(0, 7);
}

/** Primeiro e último instante (ISO) do mês representado pela chave "AAAA-MM". */
export function limitesDoMes(chave: string): { inicio: string; fim: string } {
  const [ano, mes] = chave.split("-").map(Number);
  const inicio = new Date(Date.UTC(ano, mes - 1, 1));
  const fim = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999));
  return { inicio: inicio.toISOString(), fim: fim.toISOString() };
}

/** Rótulo legível do mês a partir da chave "AAAA-MM", ex: "setembro de 2026". */
export function rotuloMes(chave: string): string {
  const [ano, mes] = chave.split("-").map(Number);
  return new Date(ano, mes - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

export function formatarMoeda(valor: string | number | null): string {
  if (valor === null) return "—";
  const numero = typeof valor === "string" ? Number(valor) : valor;
  if (Number.isNaN(numero)) return "—";
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
