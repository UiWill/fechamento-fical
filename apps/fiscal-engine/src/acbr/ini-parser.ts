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

// Além das seções de documento acima, um lote real também pode trazer
// resumos de EVENTO (`ResEveNNN`/`InfEveNNN` — ex.: uma Ciência da
// Operação que outro sistema já registrou nessa NF-e) intercalados com os
// documentos. Cada uma tem seu próprio CStat (ex.: 135 "Evento registrado
// e vinculado a NF-e") que também não pode vazar pro status do nível
// superior — mesmo bug que SECAO_DOCUMENTO já evitava pra doc/docZip/resdfe,
// só que faltava cobrir esse outro nome de seção (achado numa resposta real
// da SEFAZ que tinha ResEve001..048 e fazia o cStat do lote virar 135 em
// vez do 138 verdadeiro).
const SECAO_LIMITE_MERGE = /^(doc(zip)?|resdfe|reseve|infeve)\d+$/i;

/**
 * Campos escalares de resposta (cStat, xMotivo, protocolo...) às vezes vêm
 * soltos em __root__ (sem cabeçalho de seção) e às vezes envolvidos numa
 * seção nomeada (ex.: `[DistribuicaoDFe]`, `[StatusServico]`) — depende da
 * função/versão da lib. Mescla __root__ com as seções que vêm antes da
 * lista de documentos/eventos, e PARA na primeira seção de item da lista
 * (documento ou evento) — mais simples e seguro parar de mesclar ao ver o
 * primeiro item da lista do que tentar reconhecer todo tipo de seção que
 * pode aparecer depois dele.
 */
export function mergedRoot(parsed: ParsedIniSections): Record<string, string> {
  let merged: Record<string, string> = {};
  for (const [nome, valores] of Object.entries(parsed)) {
    if (SECAO_LIMITE_MERGE.test(nome)) break;
    merged = { ...merged, ...valores };
  }
  return merged;
}
