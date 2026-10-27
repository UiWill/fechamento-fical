"use client";

/**
 * Legenda compacta das cores de linha das telas de Apuração — sem isso,
 * quem usa o sistema só descobria o significado de cada cor lendo o
 * parágrafo de texto corrido acima da tabela (fácil de pular) ou passando
 * o mouse linha por linha. Uma fileira fixa de bolinha + rótulo curto,
 * com a explicação completa no title (hover), sem ocupar mais que uma
 * linha de altura.
 */
interface ItemLegenda {
  cor: string;
  rotulo: string;
  explicacao: string;
  soSaida?: boolean;
}

const LEGENDA_ICMS: ItemLegenda[] = [
  {
    cor: "var(--vermelho, #e08a8a)",
    rotulo: "CFOP divergente",
    explicacao: "O CFOP desse item não é nenhum dos esperados pelas regras fiscais ativas pra esse tipo de saída.",
    soSaida: true,
  },
  {
    cor: "var(--laranja, #e0963c)",
    rotulo: "Base × alíquota não bate",
    explicacao: "O valor do imposto no XML não corresponde à conta (base × alíquota) do próprio XML — sinal de imposto calculado errado na emissão.",
  },
  {
    cor: "var(--roxo, #a050e0)",
    rotulo: "Regime ICMS misturado",
    explicacao: "A nota tem item no regime normal (CST) e item no Simples Nacional (CSOSN) ao mesmo tempo — não devia acontecer numa nota só.",
  },
  {
    cor: "var(--azul, #4696e0)",
    rotulo: "Alíquota ICMS divergente",
    explicacao: "A alíquota de ICMS desse item é diferente da que a empresa normalmente usa nesse mesmo CFOP.",
  },
];

const LEGENDA_IBS_CBS: ItemLegenda[] = [
  {
    cor: "var(--vermelho, #e08a8a)",
    rotulo: "CFOP divergente",
    explicacao: "O CFOP desse item não é nenhum dos esperados pelas regras fiscais ativas pra esse tipo de saída.",
    soSaida: true,
  },
  {
    cor: "var(--laranja, #e0963c)",
    rotulo: "Base × alíquota não bate",
    explicacao: "O valor de IBS/CBS no XML não corresponde à conta (base × alíquota) do próprio XML.",
  },
  {
    cor: "var(--amarelo, #e0c86a)",
    rotulo: "IBS/CBS obrigatório ausente",
    explicacao: "Nota emitida a partir de 05/10/2026 sem o grupo de tributação da Reforma (gIBSCBS) — a partir dessa data já é obrigatório trazer essa informação.",
  },
  {
    cor: "var(--roxo, #a050e0)",
    rotulo: "Regime ICMS misturado",
    explicacao: "A nota tem item no regime normal (CST) e item no Simples Nacional (CSOSN) ao mesmo tempo — não devia acontecer numa nota só.",
  },
];

export function LegendaApuracao({
  tipo,
  direcao,
}: {
  tipo: "icms" | "ibsCbs";
  direcao: "ENTRADA" | "SAIDA";
}) {
  const itens = (tipo === "icms" ? LEGENDA_ICMS : LEGENDA_IBS_CBS).filter(
    (item) => !item.soSaida || direcao === "SAIDA"
  );

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-md border px-3 py-2"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <span
        className="font-mono text-[0.625rem] uppercase tracking-[0.1em]"
        style={{ color: "var(--muted)" }}
      >
        Cor da linha
      </span>
      {itens.map((item) => (
        <span
          key={item.rotulo}
          title={item.explicacao}
          className="flex cursor-help items-center gap-1.5 text-xs"
          style={{ color: "var(--muted)" }}
        >
          <span
            className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
            style={{ background: item.cor }}
          />
          {item.rotulo}
        </span>
      ))}
    </div>
  );
}
