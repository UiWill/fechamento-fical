import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

export interface CriarOrganizacaoInput {
  razaoSocial: string;
  cnpj: string;
  emailContato: string;
}

@Injectable()
export class OrganizacoesService {
  constructor(private readonly prisma: PrismaService) {}

  listar() {
    return this.prisma.client.organizacao.findMany({
      orderBy: { razaoSocial: "asc" },
    });
  }

  async buscarPorId(id: string) {
    const organizacao = await this.prisma.client.organizacao.findUnique({
      where: { id },
      include: { empresas: true },
    });
    if (!organizacao) {
      throw new NotFoundException(`Organização ${id} não encontrada`);
    }
    return organizacao;
  }

  criar(input: CriarOrganizacaoInput) {
    return this.prisma.client.organizacao.create({ data: input });
  }
}
