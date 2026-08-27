import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import jwt from "jsonwebtoken";
import { IS_PUBLIC_KEY } from "./public.decorator";

export interface AuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  usuario?: { sub: string; organizacaoId: string | null; papel: string };
}

/**
 * Guard global (registrado via APP_GUARD em app.module.ts) — toda rota
 * exige Bearer token válido, exceto as marcadas com @Public() (login,
 * health-check).
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

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
