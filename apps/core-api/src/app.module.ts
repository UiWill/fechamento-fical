import { Module } from "@nestjs/common";
import { PrismaModule } from "./common/prisma/prisma.module";
import { StorageModule } from "./common/storage/storage.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { OrganizacoesModule } from "./organizacoes/organizacoes.module";
import { EmpresasModule } from "./empresas/empresas.module";
import { CertificadosModule } from "./certificados/certificados.module";
import { DocumentosFiscaisModule } from "./documentos-fiscais/documentos-fiscais.module";
import { RegrasFiscaisModule } from "./regras-fiscais/regras-fiscais.module";
import { ManifestacaoModule } from "./manifestacao/manifestacao.module";
import { ExportacaoTxtModule } from "./exportacao-txt/exportacao-txt.module";
import { FaturamentoModule } from "./faturamento/faturamento.module";

@Module({
  imports: [
    PrismaModule,
    StorageModule,
    HealthModule,
    AuthModule,
    OrganizacoesModule,
    EmpresasModule,
    CertificadosModule,
    DocumentosFiscaisModule,
    RegrasFiscaisModule,
    ManifestacaoModule,
    ExportacaoTxtModule,
    FaturamentoModule,
  ],
})
export class AppModule {}
