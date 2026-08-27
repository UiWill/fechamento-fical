import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./common/prisma/prisma.module";
import { StorageModule } from "./common/storage/storage.module";
import { FiscalEngineModule } from "./common/fiscal-engine/fiscal-engine.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
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
    FiscalEngineModule,
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
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
