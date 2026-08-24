import { Injectable, NotImplementedException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class ExportacaoTxtService {
  constructor(private readonly prisma: PrismaService) {}

  listarPorEmpresa(empresaId: string) {
    return this.prisma.client.exportacaoTxt.findMany({
      where: { empresaId },
      orderBy: { criadoEm: "desc" },
    });
  }

  /**
   * FASE 2 — ainda não implementado.
   *
   * Depende do leiaute exato de importação do Domínio Sistemas, que é
   * fornecido pela CAPTAL (Cláusula 3ª, item I do contrato) — não existe
   * precedente disso em nenhum projeto seu, não dá para inventar o layout.
   * Quando o leiaute chegar: ler DocumentoFiscal com status CLASSIFICADO no
   * período, montar as linhas conforme o layout, gravar o .txt no MinIO e
   * marcar os documentos como EXPORTADO.
   */
  async gerar(_empresaId: string, _periodoInicio: Date, _periodoFim: Date) {
    throw new NotImplementedException(
      "Geração de TXT para o Domínio Sistemas aguarda o leiaute da CAPTAL — ver comentário em exportacao-txt.service.ts"
    );
  }
}
