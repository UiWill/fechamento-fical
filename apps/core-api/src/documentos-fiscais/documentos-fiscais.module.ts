import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { DocumentosFiscaisController } from "./documentos-fiscais.controller";
import { DocumentosFiscaisService } from "./documentos-fiscais.service";

@Module({
  imports: [CertificadosModule],
  controllers: [DocumentosFiscaisController],
  providers: [DocumentosFiscaisService],
  exports: [DocumentosFiscaisService],
})
export class DocumentosFiscaisModule {}
