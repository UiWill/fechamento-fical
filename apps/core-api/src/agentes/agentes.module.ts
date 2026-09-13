import { Module } from "@nestjs/common";
import { AgentesController } from "./agentes.controller";
import { AgenteIngestaoController } from "./agente-ingestao.controller";
import { AgentesService } from "./agentes.service";
import { AgenteTokenGuard } from "./agente-token.guard";

@Module({
  controllers: [AgentesController, AgenteIngestaoController],
  providers: [AgentesService, AgenteTokenGuard],
})
export class AgentesModule {}
