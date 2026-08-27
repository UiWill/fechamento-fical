import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { ManifestacaoController } from "./manifestacao.controller";
import { ManifestacaoService } from "./manifestacao.service";

@Module({
  imports: [CertificadosModule],
  controllers: [ManifestacaoController],
  providers: [ManifestacaoService],
  exports: [ManifestacaoService],
})
export class ManifestacaoModule {}
