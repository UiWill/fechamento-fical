import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  usuario?: { sub: string; organizacaoId: string | null; papel: string };
}

// FASE 2: ainda não aplicado a nenhum controller (@UseGuards(JwtAuthGuard)) —
// as rotas hoje estão abertas de propósito, enquanto o scaffold é validado
// ponta a ponta. Aplicar antes de expor o core-api publicamente.
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!token?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token ausente");
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET não configurado");
      const payload = jwt.verify(token.slice("Bearer ".length), secret) as {
        sub: string;
        organizacaoId: string | null;
        papel: string;
      };
      request.usuario = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }
}
