import { BadRequestException, Controller, ForbiddenException, Get, Param, Post, Query, Req, Res } from "@nestjs/common";
import type { FastifyReply } from "fastify";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { DocumentosFiscaisService } from "./documentos-fiscais.service";

/**
 * Todas as rotas conferem que :empresaId pertence à organização de quem
 * está chamando (via `request.usuario.organizacaoId`, do JWT) — sem isso,
 * qualquer conta logada poderia listar/sincronizar/zerar NSU/baixar XMLs
 * de uma empresa de outro cliente só sabendo o id (achado numa revisão de
 * segurança automática).
 */
@Controller("empresas/:empresaId/documentos-fiscais")
export class DocumentosFiscaisController {
  constructor(private readonly service: DocumentosFiscaisService) {}

  private organizacaoIdDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode acessar documentos fiscais");
    }
    return request.usuario.organizacaoId;
  }

  @Get()
  listar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    return this.service.listarPorEmpresa(empresaId, this.organizacaoIdDoUsuario(request));
  }

  @Post("sincronizar")
  sincronizar(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    return this.service.sincronizarComSefaz(empresaId, this.organizacaoIdDoUsuario(request));
  }

  /**
   * Reseta o controle de NSU da empresa — usado depois de uma perda de
   * dados (ex: reconstrução de servidor) pra forçar a SEFAZ a reenviar a
   * distribuição inteira de novo, já que ela só manda o que vem depois do
   * último NSU que a gente registrou.
   */
  @Post("nsu/zerar")
  zerarNsu(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    return this.service.zerarNsu(empresaId, this.organizacaoIdDoUsuario(request));
  }

  /** Consulta a situação (cStat) de UM documento na SEFAZ e grava o resultado. */
  @Post(":documentoId/consultar")
  consultarSituacao(
    @Param("empresaId") empresaId: string,
    @Param("documentoId") documentoId: string,
    @Req() request: AuthenticatedRequest
  ) {
    return this.service.consultarSituacao(empresaId, this.organizacaoIdDoUsuario(request), documentoId);
  }

  /** Consulta em lote os documentos (ENTRADA ou SAIDA) ainda sem cStat=100, opcionalmente só num período. */
  @Post("consultar-pendentes")
  consultarPendentes(
    @Param("empresaId") empresaId: string,
    @Query("direcao") direcao: string,
    @Query("inicio") inicio: string | undefined,
    @Query("fim") fim: string | undefined,
    @Req() request: AuthenticatedRequest
  ) {
    if (direcao !== "ENTRADA" && direcao !== "SAIDA") {
      throw new BadRequestException('direcao deve ser "ENTRADA" ou "SAIDA"');
    }
    const periodo = inicio && fim ? { inicio: new Date(inicio), fim: new Date(fim) } : undefined;
    return this.service.consultarPendentes(empresaId, this.organizacaoIdDoUsuario(request), direcao, periodo);
  }

  /**
   * Itens (produtos) de notas de saída autorizadas num período — base das
   * telas de Apuração do ICMS e Apuração do IBS/CBS (mesma lista, as duas
   * telas só escolhem colunas diferentes pra mostrar).
   */
  @Get("apuracao/itens")
  apuracaoItens(
    @Param("empresaId") empresaId: string,
    @Query("inicio") inicio: string,
    @Query("fim") fim: string,
    @Req() request: AuthenticatedRequest
  ) {
    if (!inicio || !fim) {
      throw new BadRequestException('"inicio" e "fim" são obrigatórios');
    }
    return this.service.apuracaoItens(empresaId, this.organizacaoIdDoUsuario(request), new Date(inicio), new Date(fim));
  }

  /** Extrai e persiste os itens de documentos de SAÍDA que ainda não têm — histórico anterior à feature, ou falhas pontuais na ingestão. */
  @Post("itens/reprocessar")
  reprocessarItens(@Param("empresaId") empresaId: string, @Req() request: AuthenticatedRequest) {
    return this.service.reprocessarItens(empresaId, this.organizacaoIdDoUsuario(request));
  }

  @Get("xml-zip")
  async baixarXmlZip(
    @Param("empresaId") empresaId: string,
    @Query("direcao") direcao: string,
    @Query("inicio") inicio: string,
    @Query("fim") fim: string,
    @Query("tipo") tipo: string | undefined,
    @Req() request: AuthenticatedRequest,
    @Res() reply: FastifyReply
  ) {
    if (direcao !== "ENTRADA" && direcao !== "SAIDA" && direcao !== "CTE_DISTRIBUICAO") {
      throw new BadRequestException('direcao deve ser "ENTRADA", "SAIDA" ou "CTE_DISTRIBUICAO"');
    }
    if (tipo !== undefined && tipo !== "NFE" && tipo !== "NFCE" && tipo !== "CTE") {
      throw new BadRequestException('tipo deve ser "NFE", "NFCE" ou "CTE"');
    }
    const stream = await this.service.baixarXmlsEmZip(
      empresaId,
      direcao,
      new Date(inicio),
      new Date(fim),
      this.organizacaoIdDoUsuario(request),
      tipo
    );
    reply
      .header("Content-Type", "application/zip")
      .header("Content-Disposition", `attachment; filename="xmls-${direcao.toLowerCase()}.zip"`)
      .send(stream);
  }
}
