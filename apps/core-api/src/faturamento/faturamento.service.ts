import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { VALOR_MENSALIDADE_POR_CNPJ } from "@afe/shared";

@Injectable()
export class FaturamentoService {
  constructor(private readonly prisma: PrismaService) {}

  listarPorOrganizacao(organizacaoId: string) {
    return this.prisma.client.fatura.findMany({
      where: { organizacaoId },
      include: { itens: true },
      orderBy: [{ referenciaAno: "desc" }, { referenciaMes: "desc" }],
    });
  }

  /**
   * Gera (ou substitui, se ainda ABERTA) a fatura do mês de referência:
   * R$49,90 por CNPJ que estava ATIVA na organização nesse período.
   * Cobrança em si (Pix/boleto/gateway) é decisão de negócio ainda em
   * aberto com a CAPTAL — este método só calcula e registra o valor devido.
   */
  async gerarFaturaDoMes(organizacaoId: string, ano: number, mes: number) {
    const empresasAtivas = await this.prisma.client.empresa.findMany({
      where: { organizacaoId, status: "ATIVA" },
    });

    const valorTotal = empresasAtivas.length * VALOR_MENSALIDADE_POR_CNPJ;

    return this.prisma.client.$transaction(async (tx) => {
      const fatura = await tx.fatura.upsert({
        where: {
          organizacaoId_referenciaAno_referenciaMes: {
            organizacaoId,
            referenciaAno: ano,
            referenciaMes: mes,
          },
        },
        create: {
          organizacaoId,
          referenciaAno: ano,
          referenciaMes: mes,
          valorTotal,
        },
        update: { valorTotal },
      });

      await tx.itemFatura.deleteMany({ where: { faturaId: fatura.id } });
      if (empresasAtivas.length > 0) {
        await tx.itemFatura.createMany({
          data: empresasAtivas.map((empresa) => ({
            faturaId: fatura.id,
            empresaId: empresa.id,
            valor: VALOR_MENSALIDADE_POR_CNPJ,
          })),
        });
      }

      return fatura;
    });
  }
}
