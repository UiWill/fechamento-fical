import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import type { CriarRegraFiscalInput } from "@afe/shared";

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
   * Resolve a regra aplicável a um CFOP: prioriza override específico da
   * empresa; cai para a regra padrão da organização se não houver override.
   * Motor de classificação completo (aplicar em lote sobre documentos
   * recebidos) é fase 2 — isto é só a resolução de uma regra isolada.
   */
  async resolver(organizacaoId: string, empresaId: string, cfopEntrada: string) {
    const override = await this.prisma.client.regraFiscal.findFirst({
      where: { empresaId, cfopEntrada, ativa: true },
    });
    if (override) return override;

    return this.prisma.client.regraFiscal.findFirst({
      where: { organizacaoId, empresaId: null, cfopEntrada, ativa: true },
    });
  }

  /**
   * Aplica o motor de regras a todos os documentos ENTRADA da empresa que
   * ainda não foram classificados e têm CFOP conhecido. O CFOP só existe
   * quando a Distribuição DFe trouxe o XML completo (não o resNFe/resumo) —
   * documentos sem CFOP ficam pendentes até a SEFAZ mandar a versão
   * completa (isso é comportamento normal da SEFAZ, não um bug).
   */
  async classificarPendentes(empresaId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({
      where: { id: empresaId },
    });
    if (!empresa) throw new NotFoundException(`Empresa ${empresaId} não encontrada`);

    const pendentes = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao: "ENTRADA",
        classificadoEm: null,
        cfop: { not: null },
      },
    });

    let classificados = 0;
    let semRegra = 0;

    for (const doc of pendentes) {
      const regra = await this.resolver(empresa.organizacaoId, empresaId, doc.cfop!);
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
        where: { empresaId, direcao: "ENTRADA", classificadoEm: null, cfop: null },
      }),
    };
  }
}
