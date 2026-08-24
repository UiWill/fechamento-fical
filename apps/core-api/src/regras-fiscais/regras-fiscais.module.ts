import { Module } from "@nestjs/common";
import { RegrasFiscaisController } from "./regras-fiscais.controller";
import { RegrasFiscaisService } from "./regras-fiscais.service";

@Module({
  controllers: [RegrasFiscaisController],
  providers: [RegrasFiscaisService],
  exports: [RegrasFiscaisService],
})
export class RegrasFiscaisModule {}
