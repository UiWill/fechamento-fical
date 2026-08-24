import { Module } from "@nestjs/common";
import { FaturamentoController } from "./faturamento.controller";
import { FaturamentoService } from "./faturamento.service";

@Module({
  controllers: [FaturamentoController],
  providers: [FaturamentoService],
  exports: [FaturamentoService],
})
export class FaturamentoModule {}
