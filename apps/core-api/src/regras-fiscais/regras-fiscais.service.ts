import { Injectable } from "@nestjs/common";
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
}
