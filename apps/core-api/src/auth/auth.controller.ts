import { Body, Controller, Post } from "@nestjs/common";
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
}
