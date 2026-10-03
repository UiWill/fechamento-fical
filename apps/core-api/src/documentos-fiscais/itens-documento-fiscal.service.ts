import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { lerNotaSaida, type ItemSaida } from "../exportacao-txt/saida-xml";

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
    if (nota.itens.length === 0) return 0;

    // Idempotente: reprocessar (ex: depois de um bug na extração) nunca
    // duplica linha, sempre substitui o conjunto inteiro desse documento.
    await this.prisma.client.itemDocumentoFiscal.deleteMany({ where: { documentoFiscalId } });

    await this.prisma.client.itemDocumentoFiscal.createMany({
      data: nota.itens.map((item) => this.paraLinha(documentoFiscalId, item)),
    });

    return nota.itens.length;
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
