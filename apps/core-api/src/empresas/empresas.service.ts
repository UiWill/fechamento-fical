import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import type { CriarEmpresaInput } from "@afe/shared";

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) {}

  listarPorOrganizacao(organizacaoId: string) {
    return this.prisma.client.empresa.findMany({
      where: { organizacaoId },
      orderBy: { razaoSocial: "asc" },
    });
  }

  async buscarPorId(id: string) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id } });
    if (!empresa) {
      throw new NotFoundException(`Empresa ${id} não encontrada`);
    }
    return empresa;
  }

  criar(input: CriarEmpresaInput) {
    // status ATIVA por padrão -> passa a contar no faturamento do mês corrente
    return this.prisma.client.empresa.create({ data: input });
  }

  ativar(id: string) {
    return this.prisma.client.empresa.update({
      where: { id },
      data: { status: "ATIVA", desativadaEm: null },
    });
  }

  desativar(id: string) {
    return this.prisma.client.empresa.update({
      where: { id },
      data: { status: "INATIVA", desativadaEm: new Date() },
    });
  }
}
