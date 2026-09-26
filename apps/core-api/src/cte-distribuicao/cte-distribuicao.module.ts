import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { CteDistribuicaoController } from "./cte-distribuicao.controller";
import { CteDistribuicaoService } from "./cte-distribuicao.service";

@Module({
  imports: [CertificadosModule],
  controllers: [CteDistribuicaoController],
  providers: [CteDistribuicaoService],
  exports: [CteDistribuicaoService],
})
export class CteDistribuicaoModule {}
