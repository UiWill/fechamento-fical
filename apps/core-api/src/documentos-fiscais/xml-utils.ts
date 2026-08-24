/**
 * Extração mínima de campos do XML de NFe/NFCe via regex — suficiente para
 * indexar metadados (chave, modelo, data de emissão). Parsing fiscal
 * completo (itens, impostos, CFOP por item) é responsabilidade do motor de
 * regras (fase 2), que deve usar um parser XML de verdade, não regex.
 */

export interface DadosBasicosNFe {
  chaveAcesso: string;
  modelo: "55" | "65";
  dataEmissao: Date | null;
}

function extractText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

export function extrairDadosBasicos(xml: string): DadosBasicosNFe | null {
  const idMatch = xml.match(/Id="NFe(\d{44})"/i);
  const chaveAcesso = idMatch?.[1] ?? extractText(xml, "chNFe");
  if (!chaveAcesso || chaveAcesso.length !== 44) return null;

  const modelo = extractText(xml, "mod") === "65" ? "65" : "55";
  const dhEmi = extractText(xml, "dhEmi") || extractText(xml, "dEmi");
  const dataEmissao = dhEmi ? new Date(dhEmi) : null;

  return { chaveAcesso, modelo, dataEmissao };
}
