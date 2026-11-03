import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Query, Req } from "@nestjs/common";
import { criarRegraFiscalSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { AcessoService } from "../common/acesso/acesso.service";
import { RegrasFiscaisService } from "./regras-fiscais.service";

@Controller("regras-fiscais")
export class RegrasFiscaisController {
  constructor(
    private readonly service: RegrasFiscaisService,
    private readonly acesso: AcessoService
  ) {}

  @Get()
  listar(@Req() request: AuthenticatedRequest) {
    return this.service.listarPorOrganizacao(this.acesso.organizacaoDoUsuario(request));
  }

  @Post()
  async criar(@Body() body: unknown, @Req() request: AuthenticatedRequest) {
    const input = criarRegraFiscalSchema.parse(body);
    const organizacaoId = this.acesso.organizacaoDoUsuario(request);
    if (input.organizacaoId !== organizacaoId) {
      throw new ForbiddenException("Não é possível criar regra em outra organização");
    }
    if (input.empresaId) {
      await this.acesso.garantirEmpresaDaOrganizacao(input.empresaId, organizacaoId);
    }
    for (const id of input.empresaIds ?? []) {
      await this.acesso.garantirEmpresaDaOrganizacao(id, organizacaoId);
    }
    return this.service.criar(input);
  }

  /**
   * Só lê — devolve o que "Classificar pendentes" vai aplicar antes de a
   * pessoa confirmar. "inicio"/"fim" opcionais escopam ao mês que a tela
   * está mostrando; sem eles, olha o histórico inteiro pendente.
   */
  @Get("classificar/:empresaId/preview")
  async preview(
    @Param("empresaId") empresaId: string,
    @Query("inicio") inicio: string | undefined,
    @Query("fim") fim: string | undefined,
    @Req() request: AuthenticatedRequest
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    const periodo = inicio && fim ? { inicio: new Date(inicio), fim: new Date(fim) } : undefined;
    return this.service.previewClassificacao(empresaId, periodo);
  }

  @Post("classificar/:empresaId")
  async classificar(
    @Param("empresaId") empresaId: string,
    @Query("inicio") inicio: string | undefined,
    @Query("fim") fim: string | undefined,
    @Req() request: AuthenticatedRequest
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    const periodo = inicio && fim ? { inicio: new Date(inicio), fim: new Date(fim) } : undefined;
    return this.service.classificarPendentes(empresaId, periodo);
  }

  /** "Exclui" uma regra — na prática desativa (ver comentário no service). */
  @Delete(":id")
  async excluir(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    const organizacaoId = this.acesso.organizacaoDoUsuario(request);
    return this.service.excluir(id, organizacaoId);
  }

  /** Desfaz a classificação automática de um documento — volta pro estado "pendente". */
  @Post("reverter/:empresaId/:documentoId")
  async reverter(
    @Param("empresaId") empresaId: string,
    @Param("documentoId") documentoId: string,
    @Req() request: AuthenticatedRequest
  ) {
    await this.acesso.empresaDoUsuario(request, empresaId);
    return this.service.reverterClassificacao(empresaId, documentoId);
  }
}
