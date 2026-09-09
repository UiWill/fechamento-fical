import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_DOCUMENTOS_FISCAIS,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import { extrairDadosBasicos } from "./xml-utils";

@Injectable()
export class DocumentosFiscaisService {
  private readonly logger = new Logger(DocumentosFiscaisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService,
    private readonly certificados: CertificadosService,
    private readonly fiscalEngine: FiscalEngineClient
  ) {}

  listarPorEmpresa(empresaId: string) {
    return this.prisma.client.documentoFiscal.findMany({
      where: { empresaId },
      orderBy: { recebidoEm: "desc" },
    });
  }

  /**
   * Busca novos documentos endereçados à empresa via NFeDistribuicaoDFe
   * (fiscal-engine -> ACBrLib -> SEFAZ), grava o XML no MinIO e indexa os
   * metadados no Postgres. Pensado para rodar via job agendado por empresa
   * (fase 2 — aqui exposto também como chamada manual/on-demand).
   */
  async sincronizarComSefaz(empresaId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({
      where: { id: empresaId },
    });
    if (!empresa) {
      throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    }

    const nsuControle = await this.prisma.client.nsuControle.upsert({
      where: { empresaId },
      create: { empresaId, ultimoNsu: BigInt(0) },
      update: {},
    });

    const certificado = await this.certificados.obterParaUso(empresaId);

    const resultado = await this.fiscalEngine.distribuicaoDFe({
      cnpj: empresa.cnpj,
      codigoUf: empresa.codigoUf,
      ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
      ultimoNsu: nsuControle.ultimoNsu.toString(),
      certificado,
    });

    let documentosNovos = 0;

    for (const doc of resultado.documentos) {
      const dadosBasicos = extrairDadosBasicos(doc.xml);
      if (!dadosBasicos) {
        this.logger.warn(
          `Documento NSU ${doc.nsu} da empresa ${empresaId} sem chave de acesso reconhecível — ignorado`
        );
        continue;
      }

      const objetoStorageXml = `${empresa.cnpj}/${dadosBasicos.chaveAcesso}.xml`;
      await this.storage.putObject(
        BUCKET_DOCUMENTOS_FISCAIS,
        objetoStorageXml,
        Buffer.from(doc.xml, "utf8")
      );

      await this.prisma.client.documentoFiscal.upsert({
        where: { chaveAcesso: dadosBasicos.chaveAcesso },
        create: {
          empresaId,
          chaveAcesso: dadosBasicos.chaveAcesso,
          tipo: dadosBasicos.modelo === "65" ? "NFCE" : "NFE",
          direcao: "ENTRADA",
          nsu: BigInt(doc.nsu),
          nomeEmitente: dadosBasicos.nomeEmitente,
          cfop: dadosBasicos.cfop,
          valorTotal: dadosBasicos.valorTotal,
          objetoStorageXml,
          emitidoEm: dadosBasicos.dataEmissao,
        },
        // Documento já indexado — Distribuição DFe pode reenviar o mesmo NSU.
        // Só atualiza nomeEmitente/cfop/valorTotal (backfill de registros
        // antigos, de antes desses campos existirem, caso a SEFAZ reenvie o
        // mesmo NSU).
        update: {
          nomeEmitente: dadosBasicos.nomeEmitente,
          cfop: dadosBasicos.cfop,
          valorTotal: dadosBasicos.valorTotal,
        },
      });

      documentosNovos += 1;
    }

    await this.prisma.client.nsuControle.update({
      where: { empresaId },
      data: { ultimoNsu: BigInt(resultado.ultimoNsu) },
    });

    return {
      documentosNovos,
      ultimoNsu: resultado.ultimoNsu,
      cStat: resultado.cStat,
      xMotivo: resultado.xMotivo,
    };
  }
}
