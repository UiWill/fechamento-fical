import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import type { CampoCorrecao } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { CorrecoesService } from "./correcoes.service";

/**
 * Todas as rotas de empresa conferem a organização via JWT, mesmo padrão
 * de documentos-fiscais.controller.ts — sem isso, qualquer conta logada
 * poderia aplicar/consultar correções de empresa de outro cliente.
 */
@Controller()
export class CorrecoesController {
  constructor(private readonly service: CorrecoesService) {}

  private organizacaoIdDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode acessar correções");
    }
    return request.usuario.organizacaoId;
  }

  private usuarioIdDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.sub) {
      throw new ForbiddenException("Usuário não identificado");
    }
    return request.usuario.sub;
  }

  @Get("correcoes/catalogo")
  catalogo() {
    return this.service.catalogoCampos();
  }

  @Get("correcoes/regras")
  listarRegras(@Req() request: AuthenticatedRequest) {
    return this.service.listarRegras(this.organizacaoIdDoUsuario(request));
  }

  @Post("correcoes/regras/:id/desativar")
  desativarRegra(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.service.desativarRegra(id, this.organizacaoIdDoUsuario(request));
  }

  @Get("correcoes/regras/:id/candidatos")
  candidatos(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.service.candidatosParaRegra(id, this.organizacaoIdDoUsuario(request));
  }

  @Post("correcoes/regras/:id/aplicar-em-massa")
  aplicarEmMassa(
    @Param("id") id: string,
    @Body() body: { documentoFiscalIds: string[] },
    @Req() request: AuthenticatedRequest
  ) {
    if (!Array.isArray(body.documentoFiscalIds) || body.documentoFiscalIds.length === 0) {
      throw new BadRequestException('"documentoFiscalIds" é obrigatório e não pode ser vazio');
    }
    return this.service.aplicarEmMassa(
      id,
      this.organizacaoIdDoUsuario(request),
      this.usuarioIdDoUsuario(request),
      body.documentoFiscalIds
    );
  }

  @Post("empresas/:empresaId/correcoes")
  aplicarCorrecao(
    @Param("empresaId") empresaId: string,
    @Body()
    body: {
      documentoFiscalId: string;
      campo: CampoCorrecao;
      valorErrado: string;
      valorCorreto: string;
      ncm?: string;
      descricaoProduto?: string;
      cfopContexto?: string;
      criarRegra?: boolean;
      regraCorrecaoId?: string;
    },
    @Req() request: AuthenticatedRequest
  ) {
    if (!body.documentoFiscalId || !body.campo || !body.valorErrado || !body.valorCorreto) {
      throw new BadRequestException(
        '"documentoFiscalId", "campo", "valorErrado" e "valorCorreto" são obrigatórios'
      );
    }
    return this.service.aplicarCorrecao(
      empresaId,
      this.organizacaoIdDoUsuario(request),
      this.usuarioIdDoUsuario(request),
      body
    );
  }
}
