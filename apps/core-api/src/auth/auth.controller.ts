import { Body, Controller, Post } from "@nestjs/common";
import { registrarContaSchema } from "@afe/shared";
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
}
