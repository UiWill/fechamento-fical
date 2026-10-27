import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import type { CondicaoPagamento, CriarRegraFiscalInput } from "@afe/shared";

@Injectable()
export class RegrasFiscaisService {
  constructor(private readonly prisma: PrismaService) {}

  listarPorOrganizacao(organizacaoId: string) {
    return this.prisma.client.regraFiscal.findMany({
      where: { organizacaoId, ativa: true },
      orderBy: { cfopEntrada: "asc" },
    });
  }

  criar(input: CriarRegraFiscalInput) {
    return this.prisma.client.regraFiscal.create({ data: input });
  }

  /**
   * Resolve a regra aplicável a um CFOP (de entrada ou de saída — o mesmo
   * mecanismo serve pros dois lados, é só o CFOP do documento que muda):
   * prioriza override específico da empresa; cai para a regra padrão da
   * organização se não houver override. Dentro de cada escopo, prioriza
   * regra com a condição de pagamento batendo exatamente com a do
   * documento; regra sem condição cadastrada (condicaoPagamento null)
   * vale pra qualquer condição — é o comportamento de antes dessa coluna
   * existir, continua valendo pras regras já cadastradas. Alguns CFOPs têm
   * acumulador diferente pra à vista x a prazo no Domínio (ex: venda CFOP
   * 5102 à vista x a mesma venda a prazo) — foi pra isso que esse segundo
   * critério foi adicionado.
   */
  async resolver(
    organizacaoId: string,
    empresaId: string,
    cfop: string,
    condicaoPagamento: CondicaoPagamento | null
  ) {
    const override = await this.melhorRegra(cfop, condicaoPagamento, { empresaId });
    if (override) return override;

    return this.melhorRegra(cfop, condicaoPagamento, { organizacaoId, empresaId: null });
  }

  private async melhorRegra(
    cfop: string,
    condicaoPagamento: CondicaoPagamento | null,
    escopo: { empresaId: string } | { organizacaoId: string; empresaId: null }
  ) {
    if (condicaoPagamento) {
      const exata = await this.prisma.client.regraFiscal.findFirst({
        where: { ...escopo, cfopEntrada: cfop, condicaoPagamento, ativa: true },
      });
      if (exata) return exata;
    }

    return this.prisma.client.regraFiscal.findFirst({
      where: { ...escopo, cfopEntrada: cfop, condicaoPagamento: null, ativa: true },
    });
  }

  /**
   * Aplica o motor de regras a todos os documentos (entrada e saída) da
   * empresa que ainda não foram classificados e têm CFOP conhecido. O CFOP
   * só existe quando a Distribuição DFe trouxe o XML completo (não o
   * resNFe/resumo) ou, pra saída, quando o agente desktop já enviou o XML
   * autorizado — documentos sem CFOP ficam pendentes até isso acontecer
   * (comportamento normal, não um bug).
   */
  async classificarPendentes(empresaId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({
      where: { id: empresaId },
    });
    if (!empresa) throw new NotFoundException(`Empresa ${empresaId} não encontrada`);

    const pendentes = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao: { in: ["ENTRADA", "SAIDA"] },
        classificadoEm: null,
        cfop: { not: null },
      },
    });

    let classificados = 0;
    let semRegra = 0;

    for (const doc of pendentes) {
      const regra = await this.resolver(
        empresa.organizacaoId,
        empresaId,
        doc.cfop!,
        doc.condicaoPagamento
      );
      if (!regra) {
        semRegra++;
        continue;
      }

      await this.prisma.client.documentoFiscal.update({
        where: { id: doc.id },
        data: {
          observacao: regra.observacao,
          acumulador: regra.acumulador,
          classificadoEm: new Date(),
        },
      });
      classificados++;
    }

    return {
      total: pendentes.length,
      classificados,
      semRegra,
      semCfop: await this.prisma.client.documentoFiscal.count({
        where: {
          empresaId,
          direcao: { in: ["ENTRADA", "SAIDA"] },
          classificadoEm: null,
          cfop: null,
        },
      }),
    };
  }
}
