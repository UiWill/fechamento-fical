import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import crypto from "node:crypto";
import { PrismaService } from "../common/prisma/prisma.service";

export interface AgenteAutenticado {
  id: string;
  organizacaoId: string | null;
  empresaId: string | null;
}

export interface AgenteAuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  ip?: string;
  agenteToken?: AgenteAutenticado;
}

export function hashTokenAgente(tokenBruto: string): string {
  return crypto.createHash("sha256").update(tokenBruto).digest("hex");
}

/**
 * Guard separado do JwtAuthGuard (humano) — protege as rotas do agente
 * desktop. Aplicado explicitamente via @UseGuards() nas rotas marcadas
 * @Public() (pra escapar do JwtAuthGuard global), não registrado como
 * APP_GUARD. Mesma ideia do x-internal-key do fiscal-engine (credencial
 * estática, sem identidade humana), mas com lookup no banco pra permitir
 * revogação — o header estático do fiscal-engine não tem como ser revogado
 * sem reiniciar o serviço com uma env var nova.
 */
@Injectable()
export class AgenteTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AgenteAuthenticatedRequest>();
    const header = request.headers["x-agente-token"];
    const query = request.query?.["token"];
    // Fallback pra query string: o agente desktop sempre manda o header,
    // mas o link de "baixar instalador" no admin-web é clicado direto no
    // navegador (não dá pra mandar cabeçalho customizado a partir de um
    // link comum), então esse endpoint específico depende do fallback.
    const tokenBruto = Array.isArray(header) ? header[0] : (header ?? (Array.isArray(query) ? query[0] : query));

    if (!tokenBruto) {
      throw new UnauthorizedException("Token de agente ausente");
    }

    const registro = await this.prisma.client.agenteInstalacaoToken.findUnique({
      where: { tokenHash: hashTokenAgente(tokenBruto) },
    });

    if (!registro || registro.status !== "ATIVO") {
      throw new UnauthorizedException("Token de agente inválido ou revogado");
    }

    request.agenteToken = {
      id: registro.id,
      organizacaoId: registro.organizacaoId,
      empresaId: registro.empresaId,
    };
    return true;
  }
}
