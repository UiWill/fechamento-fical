import { Module } from "@nestjs/common";
import { CertificadosModule } from "../certificados/certificados.module";
import { CorrecoesModule } from "../correcoes/correcoes.module";
import { RegrasFiscaisModule } from "../regras-fiscais/regras-fiscais.module";
import { DocumentosFiscaisController } from "./documentos-fiscais.controller";
import { DocumentosFiscaisService } from "./documentos-fiscais.service";
import { ItensDocumentoFiscalService } from "./itens-documento-fiscal.service";

@Module({
  imports: [CertificadosModule, CorrecoesModule, RegrasFiscaisModule],
  controllers: [DocumentosFiscaisController],
  providers: [DocumentosFiscaisService, ItensDocumentoFiscalService],
  exports: [DocumentosFiscaisService, ItensDocumentoFiscalService],
})
export class DocumentosFiscaisModule {}
