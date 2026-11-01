import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { validarDigitosCnpj, type CriarEmpresaInput, type RegimeTributario } from "@afe/shared";
import { CODIGO_IBGE_POR_UF } from "./uf";

export interface DadosCnpjConsultado {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  uf: string;
  codigoUf: number;
  situacaoCadastral: string | null;
}

/** Campos da BrasilAPI usados nos dois pontos de consulta (cadastro e regime). */
interface DadosBrutosCnpj {
  razao_social: string;
  nome_fantasia: string | null;
  uf: string;
  descricao_situacao_cadastral: string | null;
  opcao_pelo_mei: boolean | null;
  opcao_pelo_simples: boolean | null;
  regime_tributario: { ano: number; forma_de_tributacao: string }[] | null;
}

/**
 * opcao_pelo_mei/opcao_pelo_simples vêm direto do cadastro da Receita
 * (confiável); "Lucro Presumido"/"Lucro Real" só aparecem dentro de
 * regime_tributario[], um registro por ano de escrituração (ECF) — pega
 * o ano mais recente disponível (achado em pesquisa, 2026-11-01, via
 * teste real contra a BrasilAPI: CNPJ do Banco do Brasil trouxe
 * forma_de_tributacao="LUCRO REAL" todo ano desde 2016).
 */
function regimeDaBrasilApi(dados: DadosBrutosCnpj): RegimeTributario | null {
  // MEI é tecnicamente um sub-regime do Simples (LC 123 Art. 18-A) — checa
  // primeiro, prevalece independente do valor de opcao_pelo_simples.
  if (dados.opcao_pelo_mei) return "MEI";
  if (dados.opcao_pelo_simples) return "SIMPLES_NACIONAL";
  if (dados.opcao_pelo_simples === false) {
    const maisRecente = [...(dados.regime_tributario ?? [])].sort((a, b) => b.ano - a.ano)[0];
    if (maisRecente?.forma_de_tributacao === "LUCRO REAL") return "LUCRO_REAL";
    if (maisRecente?.forma_de_tributacao === "LUCRO PRESUMIDO") return "LUCRO_PRESUMIDO";
    return "REGIME_NORMAL";
  }
  return null;
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

  /** Rotas por :id devem responder 404 (não 403) pra empresa de outra organização, pra não revelar que o id existe. */
  private async empresaDaOrganizacao(id: string, organizacaoId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id }, select: { organizacaoId: true } });
    if (!empresa || empresa.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Empresa ${id} não encontrada`);
    }
  }

  async buscarPorId(id: string, organizacaoId: string) {
    await this.empresaDaOrganizacao(id, organizacaoId);
    const empresa = await this.prisma.client.empresa.findUnique({
      where: { id },
      include: {
        nsuControle: { select: { atualizadoEm: true, ultimoCStat: true, ultimoXMotivo: true } },
      },
    });
    if (!empresa) {
      throw new NotFoundException(`Empresa ${id} não encontrada`);
    }
    const { nsuControle, ...resto } = empresa;
    return {
      ...resto,
      ultimaSincronizacaoEm: nsuControle?.atualizadoEm ?? null,
      ultimoCStatSefaz: nsuControle?.ultimoCStat ?? null,
      ultimoXMotivoSefaz: nsuControle?.ultimoXMotivo ?? null,
    };
  }

  criar(input: CriarEmpresaInput) {
    // status ATIVA por padrão -> passa a contar no faturamento do mês corrente
    return this.prisma.client.empresa.create({ data: input });
  }

  async ativar(id: string, organizacaoId: string) {
    await this.empresaDaOrganizacao(id, organizacaoId);
    return this.prisma.client.empresa.update({
      where: { id },
      data: { status: "ATIVA", desativadaEm: null },
    });
  }

  async desativar(id: string, organizacaoId: string) {
    await this.empresaDaOrganizacao(id, organizacaoId);
    return this.prisma.client.empresa.update({
      where: { id },
      data: { status: "INATIVA", desativadaEm: new Date() },
    });
  }

  /**
   * Troca produção/homologação — decide direto o tpAmb enviado à SEFAZ
   * (ver documentos-fiscais.service.ts). Cadastrar uma empresa real como
   * homologação por engano faz toda sincronização "funcionar" (sem erro
   * nenhum) mas sempre voltar vazia, porque homologação é um ambiente de
   * teste da SEFAZ completamente isolado da produção.
   */
  async alterarAmbiente(id: string, organizacaoId: string, ambiente: "PRODUCAO" | "HOMOLOGACAO") {
    await this.empresaDaOrganizacao(id, organizacaoId);
    return this.prisma.client.empresa.update({ where: { id }, data: { ambiente } });
  }

  async alterarDataInicioMonitoramento(id: string, organizacaoId: string, dataInicioMonitoramento: Date) {
    await this.empresaDaOrganizacao(id, organizacaoId);
    return this.prisma.client.empresa.update({ where: { id }, data: { dataInicioMonitoramento } });
  }

  /**
   * Consulta dados públicos do CNPJ (razão social, UF, situação
   * cadastral) via BrasilAPI — agregador de dados abertos da Receita
   * Federal, gratuito e sem necessidade de chave de API. Usado só para
   * pré-preencher o formulário de cadastro; o usuário ainda pode revisar
   * e corrigir antes de salvar.
   */
  async consultarCnpj(cnpjBruto: string): Promise<DadosCnpjConsultado> {
    const { cnpj, dados } = await this.buscarDadosBrutosCnpj(cnpjBruto);

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

  /**
   * Consulta a BrasilAPI só pelo regime tributário e grava em Empresa —
   * pra empresa que já tinha cadastro (pedido do usuário em 2026-11-01)
   * ou que ainda não emitiu nenhuma nota (sem CRT pra aprender sozinha
   * ainda, ver itens-documento-fiscal.service.ts). Nunca sobrescreve um
   * regime já aprendido de nota fiscal real (NOTA_FISCAL é mais
   * confiável que a BrasilAPI) nem um setado manualmente.
   */
  async atualizarRegimeViaReceita(id: string, organizacaoId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id } });
    if (!empresa || empresa.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Empresa ${id} não encontrada`);
    }
    if (empresa.origemRegimeTributario === "NOTA_FISCAL" || empresa.origemRegimeTributario === "MANUAL") {
      return empresa;
    }

    const { dados } = await this.buscarDadosBrutosCnpj(empresa.cnpj);
    const regime = regimeDaBrasilApi(dados);
    if (!regime) {
      throw new BadGatewayException("A Receita não informou o regime tributário desse CNPJ.");
    }

    return this.prisma.client.empresa.update({
      where: { id },
      data: { regimeTributario: regime, origemRegimeTributario: "BRASIL_API" },
    });
  }

  /** Correção manual — passa a ignorar atualização automática (ver atualizarCrtEDestinatario / atualizarRegimeViaReceita). */
  async definirRegimeTributarioManual(id: string, organizacaoId: string, regime: RegimeTributario) {
    await this.empresaDaOrganizacao(id, organizacaoId);
    return this.prisma.client.empresa.update({
      where: { id },
      data: { regimeTributario: regime, origemRegimeTributario: "MANUAL" },
    });
  }

  private async buscarDadosBrutosCnpj(cnpjBruto: string): Promise<{ cnpj: string; dados: DadosBrutosCnpj }> {
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
        headers: {
          // Sem User-Agent de navegador, a proteção anti-bot da BrasilAPI
          // (Vercel) responde 403 pro user-agent padrao do fetch do Node.
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
        },
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

    const dados = (await response.json()) as DadosBrutosCnpj;
    return { cnpj, dados };
  }
}
