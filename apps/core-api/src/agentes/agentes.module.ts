import { Module } from "@nestjs/common";
import { AgentesController } from "./agentes.controller";
import { AgenteIngestaoController } from "./agente-ingestao.controller";
import { AgentesService } from "./agentes.service";
import { AgenteTokenGuard } from "./agente-token.guard";
import { DocumentosFiscaisModule } from "../documentos-fiscais/documentos-fiscais.module";

@Module({
  imports: [DocumentosFiscaisModule],
  controllers: [AgentesController, AgenteIngestaoController],
  providers: [AgentesService, AgenteTokenGuard],
})
export class AgentesModule {}
