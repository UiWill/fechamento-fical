import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

// @Global: quase todo módulo de domínio (empresas, documentos, faturamento...)
// precisa do Prisma — evitar reimportar PrismaModule em cada um.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
