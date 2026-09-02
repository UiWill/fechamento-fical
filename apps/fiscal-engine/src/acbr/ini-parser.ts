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

// `docNNN`/`docZipNNN` é o nome usado pela .so Linux (nfe_marketplace,
// versão mais antiga da lib); `ResDFeNNN` é o que a ACBrNFe64.dll do
// Windows usa de fato (confirmado numa resposta real da SEFAZ) — cada
// seção de documento tem seu próprio CStat/XMotivo (status daquele
// documento específico), que não pode ser confundido com o CStat/XMotivo
// do nível superior da resposta.
export const SECAO_DOCUMENTO = /^(doc(zip)?|resdfe)\d+$/i;

/**
 * Campos escalares de resposta (cStat, xMotivo, protocolo...) às vezes vêm
 * soltos em __root__ (sem cabeçalho de seção) e às vezes envolvidos numa
 * seção nomeada (ex.: `[DistribuicaoDFe]`, `[StatusServico]`) — depende da
 * função/versão da lib. Mescla __root__ com as seções que vêm antes da
 * lista de documentos, e PARA no primeiro `ResDFeNNN`/`docNNN` — um lote
 * real pode ter dezenas de documentos e alguns são resumos de EVENTO (não
 * de NF-e), cada um com seu próprio CStat/XMotivo (ex.: 135/136 de
 * manifestação já registrada por outro sistema), que não podem vazar pro
 * status do nível superior mesmo excluídos individualmente — mais simples
 * e seguro parar de mesclar ao ver o primeiro item da lista do que tentar
 * reconhecer todo tipo de seção que pode aparecer depois dele.
 */
export function mergedRoot(parsed: ParsedIniSections): Record<string, string> {
  let merged: Record<string, string> = {};
  for (const [nome, valores] of Object.entries(parsed)) {
    if (SECAO_DOCUMENTO.test(nome)) break;
    merged = { ...merged, ...valores };
  }
  return merged;
}
