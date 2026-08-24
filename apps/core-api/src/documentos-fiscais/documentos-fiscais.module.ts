import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { DocumentosFiscaisController } from "./documentos-fiscais.controller";
import { DocumentosFiscaisService } from "./documentos-fiscais.service";
import { FiscalEngineClient } from "./fiscal-engine.client";

@Module({
  imports: [CertificadosModule],
  controllers: [DocumentosFiscaisController],
  providers: [DocumentosFiscaisService, FiscalEngineClient],
  exports: [DocumentosFiscaisService],
})
export class DocumentosFiscaisModule {}
