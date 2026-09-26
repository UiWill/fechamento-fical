import { Module } from "@nestjs/common";
import { CteDistribuicaoModule } from "../cte-distribuicao/cte-distribuicao.module";
import { DocumentosFiscaisModule } from "../documentos-fiscais/documentos-fiscais.module";
import { SincronizacaoAgendadaService } from "./sincronizacao-agendada.service";

@Module({
  imports: [DocumentosFiscaisModule, CteDistribuicaoModule],
  providers: [SincronizacaoAgendadaService],
})
export class SincronizacaoAgendadaModule {}
