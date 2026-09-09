import { Module } from "@nestjs/common";
import { DocumentosFiscaisModule } from "../documentos-fiscais/documentos-fiscais.module";
import { SincronizacaoAgendadaService } from "./sincronizacao-agendada.service";

@Module({
  imports: [DocumentosFiscaisModule],
  providers: [SincronizacaoAgendadaService],
})
export class SincronizacaoAgendadaModule {}
