import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// JwtAuthGuard é registrado globalmente via APP_GUARD em app.module.ts,
// não precisa ser exportado daqui.
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
