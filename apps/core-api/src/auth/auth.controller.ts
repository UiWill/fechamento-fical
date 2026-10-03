import { Body, Controller, ForbiddenException, Post, Req } from "@nestjs/common";
import { registrarContaSchema } from "@afe/shared";
import type { AuthenticatedRequest } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() body: { email: string; senha: string }) {
    return this.service.login(body.email, body.senha);
  }

  @Public()
  @Post("registrar")
  registrar(@Body() body: unknown) {
    const input = registrarContaSchema.parse(body);
    return this.service.registrarConta(input);
  }

  /** Rota autenticada (sem @Public) — só a própria pessoa troca a própria senha. */
  @Post("trocar-senha")
  trocarSenha(@Body() body: { senhaAtual: string; novaSenha: string }, @Req() request: AuthenticatedRequest) {
    if (!request.usuario?.sub) {
      throw new ForbiddenException("Sessão inválida");
    }
    return this.service.trocarSenha(request.usuario.sub, body.senhaAtual, body.novaSenha);
  }
}
