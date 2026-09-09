import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_DOCUMENTOS_FISCAIS,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import { extrairDadosBasicos } from "./xml-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A SEFAZ devolve no maximo ~50 documentos por chamada de NFeDistribuicaoDFe,
// e limita a NO MAXIMO 20 CONSULTAS POR HORA por CNPJ - vale tanto pra
// cStat=137 (nada novo) quanto pra cStat=138 (tem documento, possivelmente
// mais alem desse lote). Estourar isso derruba cStat=656 "Consumo indevido"
// e BLOQUEIA o CNPJ por 1h. Por isso mantemos uma margem de seguranca
// (18, nao 20) e paramos de vez em vez o loop antes de estourar, mesmo que
// ainda reste backlog - nesse caso o usuario so precisa sincronizar de novo
// mais tarde (o NSU ja avancado nao se perde).
//
// Esse contador fica em memoria (nao sobrevive a reinicio do servico) -
// aceitavel porque reinicio so acontece em deploy, nao no uso normal.
const LIMITE_CONSULTAS_POR_HORA = 18;
const JANELA_HORA_MS = 60 * 60 * 1000;
const PAUSA_ENTRE_LOTES_MS = 1000;

const historicoConsultasPorEmpresa = new Map<string, number[]>();

function consultasDisponiveis(empresaId: string): number {
  const agora = Date.now();
  const historico = (historicoConsultasPorEmpresa.get(empresaId) ?? []).filter(
    (timestamp) => agora - timestamp < JANELA_HORA_MS
  );
  historicoConsultasPorEmpresa.set(empresaId, historico);
  return LIMITE_CONSULTAS_POR_HORA - historico.length;
}

function registrarConsulta(empresaId: string): void {
  const historico = historicoConsultasPorEmpresa.get(empresaId) ?? [];
  historico.push(Date.now());
  historicoConsultasPorEmpresa.set(empresaId, historico);
}

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

    let nsuControle = await this.prisma.client.nsuControle.upsert({
      where: { empresaId },
      create: { empresaId, ultimoNsu: BigInt(0) },
      update: {},
    });

    const certificado = await this.certificados.obterParaUso(empresaId);

    let documentosNovos = 0;
    let ultimoCStat = "";
    let ultimoXMotivo = "";
    let limiteSefazAtingido = false;

    while (true) {
      if (consultasDisponiveis(empresaId) <= 0) {
        limiteSefazAtingido = true;
        break;
      }

      registrarConsulta(empresaId);
      const resultado = await this.fiscalEngine.distribuicaoDFe({
        cnpj: empresa.cnpj,
        codigoUf: empresa.codigoUf,
        ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
        ultimoNsu: nsuControle.ultimoNsu.toString(),
        certificado,
      });
      ultimoCStat = resultado.cStat;
      ultimoXMotivo = resultado.xMotivo;

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

      nsuControle = await this.prisma.client.nsuControle.update({
        where: { empresaId },
        data: { ultimoNsu: BigInt(resultado.ultimoNsu) },
      });

      if (resultado.documentos.length === 0) {
        // Resposta vazia - backlog esgotado, SEFAZ nao tem mais nada alem
        // desse NSU por enquanto.
        break;
      }

      await sleep(PAUSA_ENTRE_LOTES_MS);
    }

    return {
      documentosNovos,
      ultimoNsu: Number(nsuControle.ultimoNsu),
      cStat: ultimoCStat,
      xMotivo: ultimoXMotivo,
      limiteSefazAtingido,
    };
  }
}
