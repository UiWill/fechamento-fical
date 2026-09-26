import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { AuthenticatedRequest } from "../../auth/jwt-auth.guard";

/**
 * Regra única de isolamento entre organizações (clientes do sistema): a
 * organização de quem chama vem SEMPRE do JWT verificado, nunca de
 * query/body, e qualquer empresa acessada por id precisa pertencer a ela.
 * Empresa de outra organização responde 404 (e não 403) pra não revelar
 * que o id existe.
 */
@Injectable()
export class AcessoService {
  constructor(private readonly prisma: PrismaService) {}

  organizacaoDoUsuario(request: AuthenticatedRequest): string {
    if (!request.usuario?.organizacaoId) {
      throw new ForbiddenException("Usuário sem organização não pode acessar esses dados");
    }
    return request.usuario.organizacaoId;
  }

  async garantirEmpresaDaOrganizacao(empresaId: string, organizacaoId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa || empresa.organizacaoId !== organizacaoId) {
      throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    }
    return empresa;
  }

  /** Atalho dos controllers: descobre a organização do JWT e confere a empresa de uma vez. */
  async empresaDoUsuario(request: AuthenticatedRequest, empresaId: string) {
    return this.garantirEmpresaDaOrganizacao(empresaId, this.organizacaoDoUsuario(request));
  }
}
