import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import type { CampoCorrecao } from "@afe/shared";

// Mesmos códigos de sucesso documentados pra Manifestação (ver
// manifestacao.service.ts) — cStat 135/136 valem pra qualquer evento
// vinculado a NF-e, CC-e incluída.
const CSTAT_AUTORIZADO = new Set(["135", "136"]);

// SEFAZ aceita no máximo 20 CC-e por documento (nSeqEvento 1-20, cada uma
// soma à anterior, nenhuma substitui).
const MAX_SEQ_EVENTO = 20;

export interface ItemCatalogoCorrecao {
  campo: CampoCorrecao;
  rotulo: string;
  permiteCceSeguro: boolean;
  aviso?: string;
}

// Catálogo fechado de campos corrigíveis — propositalmente SEM campo de
// texto livre. Pedido explícito do usuário em 2026-10-23: "pq tem que ser
// assim e nao a pessoa escrever livremente pq o sistema tem que entender e
// anotar o erro" — só escolhendo de uma lista fixa é que dá pra comparar
// duas correções e dizer "é o mesmo padrão", o que é a base de toda a
// funcionalidade de regra aprendida/aplicação em massa.
export const CATALOGO_CAMPOS_CORRECAO: ItemCatalogoCorrecao[] = [
  {
    campo: "CFOP",
    rotulo: "CFOP",
    // CC-e não pode legalmente corrigir campo que mude o cálculo do
    // imposto (art. 7º §1º-A do Convênio S/N 1970) — CFOP normalmente cai
    // nessa restrição. Mantido no catálogo por decisão explícita do
    // usuário ("Incluir CFOP mesmo assim", 2026-10-23): a tela sempre
    // avisa o risco antes de aplicar, nunca bloqueia.
    permiteCceSeguro: false,
    aviso:
      "CFOP normalmente NÃO pode ser corrigido por CC-e quando afeta o cálculo do imposto — a SEFAZ pode rejeitar o evento, ou aceitá-lo e isso se tornar um problema fiscal depois. Em muitos casos o correto é cancelar a nota e emitir uma substituta. Use com cuidado.",
  },
  { campo: "NCM", rotulo: "NCM", permiteCceSeguro: true },
  { campo: "CST_ICMS", rotulo: "CST do ICMS", permiteCceSeguro: true },
  {
    campo: "DADOS_DESTINATARIO",
    rotulo: "Dados cadastrais do destinatário (endereço, IE — não nome/CNPJ)",
    permiteCceSeguro: true,
  },
  { campo: "DADOS_TRANSPORTE", rotulo: "Dados de transporte", permiteCceSeguro: true },
  {
    campo: "INFORMACOES_COMPLEMENTARES",
    rotulo: "Informações complementares",
    permiteCceSeguro: true,
  },
  { campo: "OUTRO", rotulo: "Outro", permiteCceSeguro: true },
];

// Só esses 3 campos têm um valor "atual" no nível do ITEM (produto) da
// nota — os demais (dados de destinatário/transporte/informações
// complementares) são do documento inteiro, sem equivalente em
// ItemDocumentoFiscal, então não entram na sugestão automática das
// telas de Apuração (só no fluxo manual, a partir do documento).
const CAMPOS_COM_VALOR_NO_ITEM = new Set<CampoCorrecao>(["CFOP", "NCM", "CST_ICMS"]);

function valorAtualNoItem(
  campo: CampoCorrecao,
  item: { cfop: string; ncm: string; icmsCst: string | null }
): string | null {
  switch (campo) {
    case "CFOP":
      return item.cfop;
    case "NCM":
      return item.ncm;
    case "CST_ICMS":
      return item.icmsCst;
    default:
      return null;
  }
}

// Convenção "onde se lê / leia-se" usada de fato em CC-e reais — gerado a
// partir do catálogo fechado acima, nunca digitado livre pelo usuário.
function montarTextoCorrecao(
  campo: CampoCorrecao,
  valorErrado: string,
  valorCorreto: string,
  contexto?: { ncm?: string; descricaoProduto?: string }
): string {
  const rotulo = CATALOGO_CAMPOS_CORRECAO.find((c) => c.campo === campo)?.rotulo ?? campo;
  const refProduto = contexto?.descricaoProduto
    ? ` do produto "${contexto.descricaoProduto}"`
    : contexto?.ncm
      ? ` do(s) item(ns) classificados no NCM ${contexto.ncm}`
      : "";

  if (CAMPOS_COM_VALOR_NO_ITEM.has(campo)) {
    return `Onde se lê ${rotulo} "${valorErrado}"${refProduto}, leia-se ${rotulo} "${valorCorreto}".`;
  }
  return `Correção de ${rotulo.toLowerCase()}: onde se lê "${valorErrado}", leia-se "${valorCorreto}".`;
}

export interface AplicarCorrecaoInput {
  documentoFiscalId: string;
  campo: CampoCorrecao;
  valorErrado: string;
  valorCorreto: string;
  ncm?: string;
  descricaoProduto?: string;
  cfopContexto?: string;
  /** Cria (ou reaproveita) uma RegraCorrecao a partir dessa correção — ignorado quando regraCorrecaoId é informado. */
  criarRegra?: boolean;
  /** Regra já existente sendo reaplicada (fluxo de aplicação em massa) — vincula direto, não tenta criar outra. */
  regraCorrecaoId?: string;
}

@Injectable()
export class CorrecoesService {
  private readonly logger = new Logger(CorrecoesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly certificados: CertificadosService,
    private readonly fiscalEngine: FiscalEngineClient
  ) {}

  catalogoCampos(): ItemCatalogoCorrecao[] {
    return CATALOGO_CAMPOS_CORRECAO;
  }

  listarRegras(organizacaoId: string) {
    return this.prisma.client.regraCorrecao.findMany({
      where: { organizacaoId },
      include: {
        criadoPor: { select: { nome: true, email: true } },
        _count: { select: { correcoesAplicadas: true } },
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  async desativarRegra(id: string, organizacaoId: string) {
    const regra = await this.prisma.client.regraCorrecao.findUnique({ where: { id } });
    if (!regra || regra.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Regra ${id} não encontrada`);
    }
    return this.prisma.client.regraCorrecao.update({ where: { id }, data: { ativa: false } });
  }

  /**
   * Pra cada item (ex: os já carregados na tela de Apuração), diz se bate
   * com alguma regra aprendida ativa da organização — usado pra desenhar
   * o aviso "correção sugerida" na tabela sem round-trip por item. Só os
   * 3 campos com valor no nível do item (CFOP/NCM/CST_ICMS) entram aqui.
   */
  async sugestoesParaItens(
    organizacaoId: string,
    itens: { id: string; ncm: string; cfop: string; icmsCst: string | null }[]
  ): Promise<Record<string, { regraId: string; campo: CampoCorrecao; valorCorreto: string }>> {
    if (itens.length === 0) return {};

    const regras = await this.prisma.client.regraCorrecao.findMany({
      where: { organizacaoId, ativa: true, campo: { in: ["CFOP", "NCM", "CST_ICMS"] } },
    });
    if (regras.length === 0) return {};

    const mapa: Record<string, { regraId: string; campo: CampoCorrecao; valorCorreto: string }> =
      {};
    for (const item of itens) {
      const regra = regras.find((r) => {
        if (r.ncm && r.ncm !== item.ncm) return false;
        if (r.cfopContexto && r.cfopContexto !== item.cfop) return false;
        return valorAtualNoItem(r.campo, item) === r.valorErrado;
      });
      if (regra) {
        mapa[item.id] = { regraId: regra.id, campo: regra.campo, valorCorreto: regra.valorCorreto };
      }
    }
    return mapa;
  }

  private async proximoNumeroSequencial(documentoFiscalId: string): Promise<number> {
    const total = await this.prisma.client.correcaoEvento.count({
      where: { documentoFiscalId, status: { in: ["ENVIADA", "AUTORIZADA"] } },
    });
    const proximo = total + 1;
    if (proximo > MAX_SEQ_EVENTO) {
      throw new BadRequestException(
        `Essa nota já recebeu o máximo de ${MAX_SEQ_EVENTO} Cartas de Correção permitidas pela SEFAZ.`
      );
    }
    return proximo;
  }

  private async criarOuReutilizarRegra(
    organizacaoId: string,
    usuarioId: string,
    input: AplicarCorrecaoInput
  ) {
    const existente = await this.prisma.client.regraCorrecao.findFirst({
      where: {
        organizacaoId,
        campo: input.campo,
        valorErrado: input.valorErrado,
        ncm: input.ncm ?? null,
        cfopContexto: input.cfopContexto ?? null,
        ativa: true,
      },
    });
    if (existente) return existente;

    const catalogoItem = CATALOGO_CAMPOS_CORRECAO.find((c) => c.campo === input.campo);
    return this.prisma.client.regraCorrecao.create({
      data: {
        organizacaoId,
        criadoPorUsuarioId: usuarioId,
        campo: input.campo,
        ncm: input.ncm ?? null,
        descricaoProduto: input.descricaoProduto ?? null,
        cfopContexto: input.cfopContexto ?? null,
        valorErrado: input.valorErrado,
        valorCorreto: input.valorCorreto,
        permiteCceSeguro: catalogoItem?.permiteCceSeguro ?? true,
      },
    });
  }

  /**
   * Envia (de fato) uma Carta de Correção pra SEFAZ pra um documento.
   *
   * ⚠️ Mesmo aviso de primeira-implementação-sem-precedente-validado de
   * manifestacao.service.ts — revalide contra retornos reais da SEFAZ de
   * homologação antes de confiar em produção (ver também o aviso em
   * apps/fiscal-engine/src/nfe/carta-correcao.ts).
   */
  async aplicarCorrecao(
    empresaId: string,
    organizacaoId: string,
    usuarioId: string,
    input: AplicarCorrecaoInput
  ) {
    const [empresa, documento] = await Promise.all([
      this.prisma.client.empresa.findUnique({ where: { id: empresaId } }),
      this.prisma.client.documentoFiscal.findUnique({ where: { id: input.documentoFiscalId } }),
    ]);

    if (!empresa || empresa.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    }
    if (!documento || documento.empresaId !== empresaId) {
      throw new NotFoundException(
        `Documento fiscal ${input.documentoFiscalId} não encontrado para essa empresa`
      );
    }
    // CC-e só pode ser enviada pelo EMITENTE do documento — faz sentido só
    // pra nota de SAÍDA (emitida pela própria empresa). Não há autoridade
    // pra corrigir nota de ENTRADA, emitida por outra empresa (fornecedor).
    if (documento.direcao !== "SAIDA") {
      throw new BadRequestException(
        "Carta de Correção só pode ser enviada pra notas de SAÍDA (emitidas pela própria empresa)."
      );
    }
    if (documento.tipo !== "NFE" && documento.tipo !== "NFCE") {
      throw new BadRequestException("Carta de Correção só se aplica a NF-e/NFC-e.");
    }

    const numeroSequencial = await this.proximoNumeroSequencial(input.documentoFiscalId);
    const textoEnviado = montarTextoCorrecao(input.campo, input.valorErrado, input.valorCorreto, input);
    // Mesmo raciocínio do "órgão autorizador" da Manifestação: usa o UF
    // embutido na própria chave de acesso, não o cadastro da empresa.
    const codigoUfAutorizador = Number(documento.chaveAcesso.slice(0, 2));
    const certificado = await this.certificados.obterParaUso(empresaId);

    let regraCorrecaoId = input.regraCorrecaoId ?? null;
    if (!regraCorrecaoId && input.criarRegra) {
      const regra = await this.criarOuReutilizarRegra(organizacaoId, usuarioId, input);
      regraCorrecaoId = regra.id;
    }

    const evento = await this.prisma.client.correcaoEvento.create({
      data: {
        empresaId,
        documentoFiscalId: input.documentoFiscalId,
        regraCorrecaoId,
        usuarioId,
        campo: input.campo,
        valorErrado: input.valorErrado,
        valorCorreto: input.valorCorreto,
        textoEnviado,
        nSeqEvento: numeroSequencial,
        status: "PENDENTE",
      },
    });

    try {
      const resultado = await this.fiscalEngine.enviarCartaCorrecao({
        codigoUf: codigoUfAutorizador,
        ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
        cnpj: empresa.cnpj,
        chaveAcesso: documento.chaveAcesso,
        numeroSequencial,
        xCorrecao: textoEnviado,
        certificado,
      });

      const autorizado = CSTAT_AUTORIZADO.has(resultado.cStat);
      return this.prisma.client.correcaoEvento.update({
        where: { id: evento.id },
        data: {
          status: autorizado ? "AUTORIZADA" : "REJEITADA",
          protocoloSefaz: resultado.protocolo,
          motivoSefaz: resultado.xMotivo,
          enviadoEm: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(
        { err: error, documentoFiscalId: input.documentoFiscalId },
        "Falha ao enviar carta de correção para a SEFAZ"
      );
      return this.prisma.client.correcaoEvento.update({
        where: { id: evento.id },
        data: {
          status: "REJEITADA",
          motivoSefaz: error instanceof Error ? error.message : "Erro desconhecido",
          enviadoEm: new Date(),
        },
      });
    }
  }

  /**
   * Outros documentos (de qualquer empresa da MESMA organização) cujo item
   * ainda tem o valor errado que essa regra conhece e que ainda não foram
   * corrigidos por ela — candidatos pro botão "aplicar em todas".
   */
  async candidatosParaRegra(regraId: string, organizacaoId: string) {
    const regra = await this.prisma.client.regraCorrecao.findUnique({ where: { id: regraId } });
    if (!regra || regra.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Regra ${regraId} não encontrada`);
    }
    if (!CAMPOS_COM_VALOR_NO_ITEM.has(regra.campo)) {
      // Campos de documento (destinatário/transporte/etc.) não têm como
      // comparar em massa contra item — só fazem sentido aplicados um a um.
      return [];
    }

    const jaAplicados = await this.prisma.client.correcaoEvento.findMany({
      where: { regraCorrecaoId: regraId, status: { in: ["ENVIADA", "AUTORIZADA"] } },
      select: { documentoFiscalId: true },
    });
    const idsJaAplicados = jaAplicados.map((e) => e.documentoFiscalId);

    const itens = await this.prisma.client.itemDocumentoFiscal.findMany({
      where: {
        ...(regra.ncm ? { ncm: regra.ncm } : {}),
        ...(regra.cfopContexto ? { cfop: regra.cfopContexto } : {}),
        documentoFiscalId: { notIn: idsJaAplicados },
        documentoFiscal: {
          direcao: "SAIDA",
          tipo: { in: ["NFE", "NFCE"] },
          empresa: { organizacaoId },
        },
      },
      include: {
        documentoFiscal: {
          select: {
            id: true,
            chaveAcesso: true,
            empresaId: true,
            empresa: { select: { razaoSocial: true } },
          },
        },
      },
    });

    const porDocumento = new Map<
      string,
      { documentoFiscalId: string; empresaId: string; empresaNome: string; chaveAcesso: string }
    >();
    for (const item of itens) {
      if (valorAtualNoItem(regra.campo, item) !== regra.valorErrado) continue;
      if (porDocumento.has(item.documentoFiscalId)) continue;
      porDocumento.set(item.documentoFiscalId, {
        documentoFiscalId: item.documentoFiscalId,
        empresaId: item.documentoFiscal.empresaId,
        empresaNome: item.documentoFiscal.empresa.razaoSocial,
        chaveAcesso: item.documentoFiscal.chaveAcesso,
      });
    }
    return [...porDocumento.values()];
  }

  /**
   * Aplica a mesma regra (já existente) em vários documentos de uma vez —
   * mesmo ritmo de 300ms entre envios já usado na manifestação automática
   * (sincronizacao-agendada.service.ts), pra não martelar a SEFAZ.
   */
  async aplicarEmMassa(
    regraId: string,
    organizacaoId: string,
    usuarioId: string,
    documentoFiscalIds: string[]
  ) {
    const regra = await this.prisma.client.regraCorrecao.findUnique({ where: { id: regraId } });
    if (!regra || regra.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Regra ${regraId} não encontrada`);
    }

    let sucesso = 0;
    let falha = 0;
    for (const documentoFiscalId of documentoFiscalIds) {
      const documento = await this.prisma.client.documentoFiscal.findUnique({
        where: { id: documentoFiscalId },
      });
      if (!documento) {
        falha++;
        continue;
      }
      try {
        const resultado = await this.aplicarCorrecao(documento.empresaId, organizacaoId, usuarioId, {
          documentoFiscalId,
          campo: regra.campo,
          valorErrado: regra.valorErrado,
          valorCorreto: regra.valorCorreto,
          ncm: regra.ncm ?? undefined,
          descricaoProduto: regra.descricaoProduto ?? undefined,
          cfopContexto: regra.cfopContexto ?? undefined,
          regraCorrecaoId: regra.id,
        });
        if (resultado.status === "AUTORIZADA") sucesso++;
        else falha++;
      } catch (error) {
        falha++;
        this.logger.error(
          { err: error, documentoFiscalId },
          "Falha ao aplicar correção em massa"
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    return { total: documentoFiscalIds.length, sucesso, falha };
  }
}
