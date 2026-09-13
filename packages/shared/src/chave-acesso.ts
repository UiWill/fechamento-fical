/**
 * A chave de acesso de 44 dígitos tem o mesmo layout em NF-e, NFC-e e CT-e
 * (só o campo "modelo" muda): cUF(2) + AAMM(4) + CNPJ emitente(14) +
 * modelo(2) + série(3) + número do documento(9) + tipo de emissão(1) +
 * código numérico(8) + dígito verificador(1).
 */
export interface ChaveAcessoDecodificada {
  codigoUf: string;
  anoMesEmissao: string; // AAMM
  cnpjEmitente: string;
  modelo: string; // "55" NF-e | "65" NFC-e | "57" CT-e
  serie: number;
  numeroDocumento: number;
  tipoEmissao: string;
  codigoNumerico: string;
  digitoVerificador: string;
}

export function decodificarChaveAcesso(chave: string): ChaveAcessoDecodificada | null {
  if (!/^\d{44}$/.test(chave)) return null;

  return {
    codigoUf: chave.slice(0, 2),
    anoMesEmissao: chave.slice(2, 6),
    cnpjEmitente: chave.slice(6, 20),
    modelo: chave.slice(20, 22),
    serie: Number(chave.slice(22, 25)),
    numeroDocumento: Number(chave.slice(25, 34)),
    tipoEmissao: chave.slice(34, 35),
    codigoNumerico: chave.slice(35, 43),
    digitoVerificador: chave.slice(43, 44),
  };
}

/**
 * Confere o dígito verificador (módulo 11, pesos 2-9 cíclicos da direita
 * pra esquerda) dos 43 primeiros dígitos contra o 44º — validação
 * estrutural offline, sem precisar consultar a SEFAZ. Usado pelo agente
 * desktop pra descartar arquivo corrompido/incompleto antes de gastar uma
 * chamada de rede.
 */
export function validarDigitoVerificadorChave(chave: string): boolean {
  if (!/^\d{44}$/.test(chave)) return false;

  const base = chave.slice(0, 43);
  const dvInformado = Number(chave[43]);

  let soma = 0;
  let peso = 2;
  for (let i = base.length - 1; i >= 0; i--) {
    soma += Number(base[i]) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const resto = soma % 11;
  const dvCalculado = resto < 2 ? 0 : 11 - resto;
  return dvCalculado === dvInformado;
}
