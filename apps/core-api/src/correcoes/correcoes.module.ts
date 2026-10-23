import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { CorrecoesController } from "./correcoes.controller";
import { CorrecoesService } from "./correcoes.service";

@Module({
  imports: [CertificadosModule],
  controllers: [CorrecoesController],
  providers: [CorrecoesService],
  exports: [CorrecoesService],
})
export class CorrecoesModule {}
