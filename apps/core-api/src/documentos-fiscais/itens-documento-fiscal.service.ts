import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { lerNotaSaida, type ItemSaida } from "../exportacao-txt/saida-xml";
import type { RegimeTributario } from "@afe/shared";

// 1/2/3/4 -> RegimeTributario — mapeamento do CRT (achado em pesquisa,
// 2026-11-01, com múltiplas fontes técnicas concordando: NCM Buscador,
// Alterdata, oobj): 1=Simples, 2=Simples c/ sublimite excedido,
// 3=Regime Normal (não dá pra saber Presumido x Real só pelo CRT),
// 4=MEI. O valor 4 pro MEI é recente (ligado à Reforma Tributária, que
// passou a tratar MEI como regime próprio pra fins de IBS/CBS) — ainda
// não confirmado contra um XML real de MEI; se vier diferente disso na
// prática, ajustar aqui.
function regimeDoCrt(crt: string): RegimeTributario | null {
  switch (crt) {
    case "1":
      return "SIMPLES_NACIONAL";
    case "2":
      return "SIMPLES_SUBLIMITE_EXCEDIDO";
    case "3":
      return "REGIME_NORMAL";
    case "4":
      return "MEI";
    default:
      return null;
  }
}

/**
 * Extrai os itens (produtos) de uma nota de SAÍDA a partir do XML e
 * persiste em ItemDocumentoFiscal — alimenta as telas de Apuração do
 * ICMS e Apuração do IBS/CBS sem precisar reler o XML a cada visita.
 * Reaproveita o mesmo parser (`lerNotaSaida`) já usado pro TXT Domínio.
 */
@Injectable()
export class ItensDocumentoFiscalService {
  private readonly logger = new Logger(ItensDocumentoFiscalService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Só NF-e/NFC-e têm essa estrutura de item/imposto — CT-e nunca chama isso. */
  async extrairEPersistirItens(documentoFiscalId: string, xml: string): Promise<number> {
    const nota = lerNotaSaida(xml);

    // CRT/UF do destinatário vêm mesmo quando a nota não tem <det> ainda
    // (resumo da Distribuição DFe) — atualiza sempre que tiver dado novo,
    // mesmo que os itens em si fiquem pra depois.
    await this.atualizarCrtEDestinatario(documentoFiscalId, nota.crt, nota.destinatario.uf || null);

    if (nota.itens.length === 0) return 0;

    // Idempotente: reprocessar (ex: depois de um bug na extração) nunca
    // duplica linha, sempre substitui o conjunto inteiro desse documento.
    await this.prisma.client.itemDocumentoFiscal.deleteMany({ where: { documentoFiscalId } });

    await this.prisma.client.itemDocumentoFiscal.createMany({
      data: nota.itens.map((item) => this.paraLinha(documentoFiscalId, item)),
    });

    return nota.itens.length;
  }

  /**
   * Grava o CRT/UF-destinatário dessa nota no documento e, quando o CRT
   * veio preenchido, atualiza o regime "aprendido" da empresa — a fonte
   * mais confiável que existe, porque a SEFAZ já rejeita (código 481)
   * nota com CRT que não bate com o cadastro real da empresa lá. Nunca
   * sobrescreve um regime setado manualmente (origemRegimeTributario
   * MANUAL) — quem corrigiu à mão sabe de algo que o CRT não conta.
   *
   * IMPORTANTE: só atualiza o regime da EMPRESA em documento de SAÍDA —
   * em documento de ENTRADA o <emit> do XML é o FORNECEDOR (empresa
   * externa), não o nosso cliente; usar o CRT dele pra setar o regime do
   * nosso cliente seria sobrescrever o regime certo com o de um terceiro
   * aleatório. O CRT/UF ainda são gravados no documento normalmente nos
   * dois casos (é informação real da nota, só não vira "o regime da
   * empresa" quando é de entrada).
   */
  private async atualizarCrtEDestinatario(documentoFiscalId: string, crtBruto: string, ufDestinatario: string | null) {
    const crt = crtBruto ? Number(crtBruto) : null;
    if (crt === null && ufDestinatario === null) return;

    const documento = await this.prisma.client.documentoFiscal.update({
      where: { id: documentoFiscalId },
      data: {
        ...(crt !== null ? { crt } : {}),
        ...(ufDestinatario !== null ? { ufDestinatario } : {}),
      },
      select: { empresaId: true, direcao: true },
    });
    if (documento.direcao !== "SAIDA") return;

    const regime = regimeDoCrt(crtBruto);
    if (!regime) return;

    const empresa = await this.prisma.client.empresa.findUnique({
      where: { id: documento.empresaId },
      select: { origemRegimeTributario: true },
    });
    if (empresa?.origemRegimeTributario === "MANUAL") return;

    await this.prisma.client.empresa.update({
      where: { id: documento.empresaId },
      data: { regimeTributario: regime, origemRegimeTributario: "NOTA_FISCAL" },
    });
  }

  private paraLinha(documentoFiscalId: string, item: ItemSaida) {
    return {
      documentoFiscalId,
      nItem: item.nItem,
      cProd: item.codigoProduto,
      xProd: item.nomeProduto,
      ncm: item.ncm,
      cfop: item.cfop,
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
      valorProdutos: item.valorProdutos,

      icmsCst: item.icms?.cst || null,
      icmsComCst: item.icms?.comCst ?? null,
      icmsBase: item.icms?.base ?? null,
      icmsAliquota: item.icms?.aliquota ?? null,
      icmsValor: item.icms?.valor ?? null,

      ipiCst: item.ipi.cst || null,
      ipiBase: item.ipi.base,
      ipiAliquota: item.ipi.aliquota,
      ipiValor: item.ipi.valor,

      pisCst: item.pis.cst || null,
      pisBase: item.pis.base,
      pisAliquota: item.pis.aliquota,
      pisValor: item.pis.valor,

      cofinsCst: item.cofins.cst || null,
      cofinsBase: item.cofins.base,
      cofinsAliquota: item.cofins.aliquota,
      cofinsValor: item.cofins.valor,

      ibsCbsCst: item.ibsCbs?.cst || null,
      cClassTrib: item.ibsCbs?.cClassTrib || null,
      ibsCbsBase: item.ibsCbs?.base ?? null,
      ibsUfAliquota: item.ibsCbs?.ibsUf.aliquota ?? null,
      ibsUfValor: item.ibsCbs?.ibsUf.valor ?? null,
      ibsMunAliquota: item.ibsCbs?.ibsMun.aliquota ?? null,
      ibsMunValor: item.ibsCbs?.ibsMun.valor ?? null,
      cbsAliquota: item.ibsCbs?.cbs.aliquota ?? null,
      cbsValor: item.ibsCbs?.cbs.valor ?? null,
    };
  }
}
