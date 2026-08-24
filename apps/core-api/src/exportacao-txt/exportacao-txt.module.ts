import { Module } from "@nestjs/common";
import { ExportacaoTxtController } from "./exportacao-txt.controller";
import { ExportacaoTxtService } from "./exportacao-txt.service";

@Module({
  controllers: [ExportacaoTxtController],
  providers: [ExportacaoTxtService],
  exports: [ExportacaoTxtService],
})
export class ExportacaoTxtModule {}
