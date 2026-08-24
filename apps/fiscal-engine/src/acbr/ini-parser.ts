/**
 * Parser das respostas em formato INI que a ACBrLibNFe devolve
 * (seções __root__, doc001, doc002, docZip001 ...).
 * Portado de nfe_marketplace/src/nfe/acbrDistribuicao.js (validado em produção).
 */
export type ParsedIniSections = Record<string, Record<string, string>>;

export function parseIniResponse(raw: string): ParsedIniSections {
  const sections: ParsedIniSections = {};
  let current = "__root__";
  sections[current] = {};

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("[") && line.endsWith("]")) {
      current = line.slice(1, -1);
      sections[current] = {};
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex <= 0) continue;

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();
    sections[current]![key] = value;
  }

  return sections;
}

export function readField(
  section: Record<string, string> | undefined,
  ...keys: string[]
): string {
  if (!section) return "";
  for (const key of keys) {
    if (section[key] !== undefined) return section[key]!;
  }
  return "";
}
