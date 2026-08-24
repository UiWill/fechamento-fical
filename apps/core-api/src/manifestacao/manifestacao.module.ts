import { Module } from "@nestjs/common";
import { ManifestacaoController } from "./manifestacao.controller";
import { ManifestacaoService } from "./manifestacao.service";

@Module({
  controllers: [ManifestacaoController],
  providers: [ManifestacaoService],
  exports: [ManifestacaoService],
})
export class ManifestacaoModule {}
