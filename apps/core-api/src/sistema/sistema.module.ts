import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { SistemaController } from "./sistema.controller";
import { SistemaService } from "./sistema.service";

@Module({
  imports: [CertificadosModule],
  controllers: [SistemaController],
  providers: [SistemaService],
  exports: [SistemaService],
})
export class SistemaModule {}
