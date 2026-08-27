import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { validarDigitosCnpj, type CriarEmpresaInput } from "@afe/shared";
import { CODIGO_IBGE_POR_UF } from "./uf";

export interface DadosCnpjConsultado {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  uf: string;
  codigoUf: number;
  situacaoCadastral: string | null;
}

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

  /**
   * Consulta dados públicos do CNPJ (razão social, UF, situação
   * cadastral) via BrasilAPI — agregador de dados abertos da Receita
   * Federal, gratuito e sem necessidade de chave de API. Usado só para
   * pré-preencher o formulário de cadastro; o usuário ainda pode revisar
   * e corrigir antes de salvar.
   */
  async consultarCnpj(cnpjBruto: string): Promise<DadosCnpjConsultado> {
    const cnpj = cnpjBruto.replace(/\D/g, "");

    if (!validarDigitosCnpj(cnpj)) {
      throw new NotFoundException("CNPJ inválido (dígito verificador não confere)");
    }

    let response: Response;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch {
      throw new BadGatewayException(
        "Não foi possível consultar o CNPJ agora — preencha os dados manualmente."
      );
    }

    if (response.status === 404) {
      throw new NotFoundException("CNPJ não encontrado na Receita Federal.");
    }
    if (!response.ok) {
      throw new BadGatewayException(
        "Consulta de CNPJ indisponível no momento — preencha os dados manualmente."
      );
    }

    const dados = (await response.json()) as {
      razao_social: string;
      nome_fantasia: string | null;
      uf: string;
      descricao_situacao_cadastral: string | null;
    };

    const codigoUf = CODIGO_IBGE_POR_UF[dados.uf];
    if (!codigoUf) {
      throw new BadGatewayException(`UF "${dados.uf}" retornada pela Receita não reconhecida.`);
    }

    return {
      cnpj,
      razaoSocial: dados.razao_social,
      nomeFantasia: dados.nome_fantasia,
      uf: dados.uf,
      codigoUf,
      situacaoCadastral: dados.descricao_situacao_cadastral,
    };
  }
}
