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
// e limita a NO MAXIMO 20 CONSULTAS POR HORA por CNPJ+CERTIFICADO - vale
// tanto pra cStat=137 (nada novo) quanto pra cStat=138 (tem documento,
// possivelmente mais alem desse lote), e o limite e COMPARTILHADO entre
// QUALQUER sistema que consulte esse mesmo CNPJ (ex: o software do
// contador tambem fazendo Distribuicao DFe pra a mesma empresa) - nao e
// um limite "nosso", e da SEFAZ pra aquele CNPJ.
//
// Por isso duas camadas de protecao:
// 1) Margem de seguranca proativa (18, nao 20) nas NOSSAS proprias
//    chamadas, pra dificilmente sermos nos a estourar sozinhos.
// 2) Deteccao reativa: se AINDA ASSIM vier cStat=656 "Consumo indevido"
//    (porque outro sistema tambem consumiu da mesma cota), paramos na
//    hora e ficamos 1h sem tentar de novo aquele CNPJ - client nenhum
//    controla o outro sistema, entao so da pra reagir ao bloqueio real.
//
// Estourar o limite so atrasa (o NSU ja avancado nao se perde) - o
// usuario so precisa sincronizar de novo mais tarde.
//
// Os dois controles ficam em memoria (nao sobrevivem a reinicio do
// servico) - aceitavel porque reinicio so acontece em deploy.
const LIMITE_CONSULTAS_POR_HORA = 18;
const JANELA_HORA_MS = 60 * 60 * 1000;
const PAUSA_ENTRE_LOTES_MS = 1000;
const CSTAT_CONSUMO_INDEVIDO = "656";

const historicoConsultasPorEmpresa = new Map<string, number[]>();
const bloqueadoAtePorEmpresa = new Map<string, number>();

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

function bloqueadoPelaSefaz(empresaId: string): boolean {
  const ate = bloqueadoAtePorEmpresa.get(empresaId);
  return ate !== undefined && Date.now() < ate;
}

function registrarBloqueioSefaz(empresaId: string): void {
  bloqueadoAtePorEmpresa.set(empresaId, Date.now() + JANELA_HORA_MS);
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
    let limiteSefazAtingido = false;
    let bloqueadoNestaChamada = false;

    if (bloqueadoPelaSefaz(empresaId)) {
      // Bloqueio real ja confirmado (cStat=656) numa tentativa anterior,
      // possivelmente causado por OUTRO sistema consultando o mesmo CNPJ -
      // nem tenta de novo antes da SEFAZ liberar. cStat/xMotivo persistidos
      // ja refletem esse bloqueio (foram gravados no momento em que
      // aconteceu), entao nao precisa nem chamar a SEFAZ pra saber disso.
      return {
        documentosNovos: 0,
        ultimoNsu: Number(nsuControle.ultimoNsu),
        cStat: nsuControle.ultimoCStat ?? CSTAT_CONSUMO_INDEVIDO,
        xMotivo: nsuControle.ultimoXMotivo ?? "Consumo indevido",
        limiteSefazAtingido: true,
        bloqueadoPelaSefaz: true,
        ultimaSincronizacaoEm: nsuControle.atualizadoEm,
      };
    }

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

      // Persiste cStat/xMotivo a cada tentativa (nao so quando ha
      // documento novo) - e o que permite a tela mostrar "por que" da
      // ultima sincronizacao mesmo quando ela rodou sozinha de madrugada,
      // sem ninguem olhando na hora.
      nsuControle = await this.prisma.client.nsuControle.update({
        where: { empresaId },
        data: { ultimoCStat: resultado.cStat, ultimoXMotivo: resultado.xMotivo },
      });

      if (resultado.cStat === CSTAT_CONSUMO_INDEVIDO) {
        // A SEFAZ bloqueou mesmo estando dentro da NOSSA margem de
        // seguranca - so pode ter sido consumo de OUTRO sistema usando o
        // mesmo CNPJ+certificado (ex: o software do contador). Registra o
        // bloqueio de verdade e para na hora, sem processar documentos
        // (resposta de bloqueio nao traz documento nenhum de qualquer jeito).
        registrarBloqueioSefaz(empresaId);
        limiteSefazAtingido = true;
        bloqueadoNestaChamada = true;
        break;
      }

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
      cStat: nsuControle.ultimoCStat ?? "",
      xMotivo: nsuControle.ultimoXMotivo ?? "",
      limiteSefazAtingido,
      bloqueadoPelaSefaz: bloqueadoNestaChamada,
      ultimaSincronizacaoEm: nsuControle.atualizadoEm,
    };
  }
}
