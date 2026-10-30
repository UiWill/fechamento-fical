import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import archiver from "archiver";
import type { Readable } from "node:stream";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_DOCUMENTOS_FISCAIS,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { CertificadosService } from "../certificados/certificados.service";
import { FiscalEngineClient } from "../common/fiscal-engine/fiscal-engine.client";
import { extrairDadosBasicos } from "./xml-utils";
import { ItensDocumentoFiscalService } from "./itens-documento-fiscal.service";
import { CorrecoesService } from "../correcoes/correcoes.service";
import { decodificarChaveAcesso } from "@afe/shared";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Data a partir da qual o grupo gIBSCBS passa a ser obrigatório em toda
// NF-e/NFC-e (LC 214/2025, Reforma Tributária) — usado só pra sinalizar
// "deveria ter vindo e não veio" na apuração, não bloqueia nada.
const DATA_OBRIGATORIEDADE_IBS_CBS = new Date("2026-10-05T00:00:00Z");
const TOLERANCIA_ARREDONDAMENTO = 0.02;

/**
 * Confere base × alíquota ≈ valor pra cada tributo do item (tolerância de
 * R$0,02 pra arredondamento) — pega erro de cálculo do próprio PDV/sistema
 * emissor do cliente, não do nosso sistema (só lemos o que já veio pronto
 * no XML). Tributo sem base/alíquota/valor (nenhum dos três) não entra na
 * checagem — não dá pra confundir "não se aplica" com "está errado".
 */
function conferirAritmetica(
  base: unknown,
  aliquota: unknown,
  valor: unknown
): boolean {
  if (base === null || aliquota === null || valor === null) return true;
  const b = Number(base);
  const a = Number(aliquota);
  const v = Number(valor);
  if (!Number.isFinite(b) || !Number.isFinite(a) || !Number.isFinite(v)) return true;
  return Math.abs((b * a) / 100 - v) <= TOLERANCIA_ARREDONDAMENTO;
}

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

// A SEFAZ tambem exige esperar 1h depois de responder cStat=137 "nenhum
// documento localizado" antes de consultar de novo - repetir antes disso
// (mesmo sem estourar as 20 consultas) tambem derruba 656. Isso mordeu a
// sincronizacao noturna na pratica: agendada de hora em hora, uma janela
// que termina com "nada novo" e a proxima execucao (1h depois, mas com
// alguns segundos de variacao de agendamento) as vezes cai um pouco ANTES
// de completar a 1h cheia. Por isso registramos e checamos isso tambem,
// nao so o bloqueio 656 em si.
const ultimaRespostaVaziaPorEmpresa = new Map<string, number>();

function aguardandoJanelaAposRespostaVazia(empresaId: string): boolean {
  const quando = ultimaRespostaVaziaPorEmpresa.get(empresaId);
  return quando !== undefined && Date.now() - quando < JANELA_HORA_MS;
}

function registrarRespostaVazia(empresaId: string): void {
  ultimaRespostaVaziaPorEmpresa.set(empresaId, Date.now());
}

@Injectable()
export class DocumentosFiscaisService {
  private readonly logger = new Logger(DocumentosFiscaisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService,
    private readonly certificados: CertificadosService,
    private readonly fiscalEngine: FiscalEngineClient,
    private readonly itensDocumentoFiscal: ItensDocumentoFiscalService,
    private readonly correcoes: CorrecoesService
  ) {}

  /**
   * Confere que a empresa pertence à organização de quem está chamando —
   * sem isso, qualquer conta logada (de qualquer organização) conseguiria
   * listar/sincronizar/zerar NSU/baixar XMLs de uma empresa de outro
   * cliente só sabendo o id (achado numa revisão de segurança
   * automática).
   */
  private async verificarEmpresaDaOrganizacao(empresaId: string, organizacaoId: string) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) throw new NotFoundException(`Empresa ${empresaId} não encontrada`);
    if (empresa.organizacaoId !== organizacaoId) {
      throw new ForbiddenException("Essa empresa não pertence à sua organização");
    }
    return empresa;
  }

  async listarPorEmpresa(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    inicio: Date,
    fim: Date
  ) {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);
    return this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao,
        // Mesmo fallback que o admin-web já fazia no filtro client-side
        // (chaveMes(doc.emitidoEm ?? doc.recebidoEm)) — documento sem
        // emitidoEm cai no mês em que foi recebido.
        OR: [
          { emitidoEm: { gte: inicio, lte: fim } },
          { emitidoEm: null, recebidoEm: { gte: inicio, lte: fim } },
        ],
      },
      // nome do agente desktop que enviou (só existe pra SAIDA) — o
      // admin-web usa isso pra mostrar de qual instalação veio cada nota.
      include: { agenteInstalacaoToken: { select: { nome: true } } },
      orderBy: { recebidoEm: "desc" },
    });
  }

  /**
   * Busca novos documentos endereçados à empresa via NFeDistribuicaoDFe
   * (fiscal-engine -> ACBrLib -> SEFAZ), grava o XML no armazenamento de objetos e indexa os
   * metadados no Postgres. Pensado para rodar via job agendado por empresa
   * (fase 2 — aqui exposto também como chamada manual/on-demand).
   */
  async sincronizarComSefaz(empresaId: string, organizacaoId: string) {
    const empresa = await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

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

    if (aguardandoJanelaAposRespostaVazia(empresaId)) {
      // A tentativa anterior ja veio "nada novo" (cStat=137) ha menos de
      // 1h - nem chama a SEFAZ de novo, senao ela mesma bloqueia com 656.
      return {
        documentosNovos: 0,
        ultimoNsu: Number(nsuControle.ultimoNsu),
        cStat: nsuControle.ultimoCStat ?? "137",
        xMotivo: nsuControle.ultimoXMotivo ?? "Nenhum documento localizado",
        limiteSefazAtingido: true,
        bloqueadoPelaSefaz: false,
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

        const documentoEntrada = await this.prisma.client.documentoFiscal.upsert({
          where: { chaveAcesso: dadosBasicos.chaveAcesso },
          create: {
            empresaId,
            chaveAcesso: dadosBasicos.chaveAcesso,
            tipo: dadosBasicos.tipo,
            direcao: "ENTRADA",
            nsu: BigInt(doc.nsu),
            nomeEmitente: dadosBasicos.nomeEmitente,
            cfop: dadosBasicos.cfop,
            condicaoPagamento: dadosBasicos.condicaoPagamento,
            valorTotal: dadosBasicos.valorTotal,
            objetoStorageXml,
            emitidoEm: dadosBasicos.dataEmissao,
            // Protocolo já vem no XML completo da Distribuição DFe na
            // maioria dos casos (nfeProc) — grava direto, sem precisar do
            // cron diário de consulta à SEFAZ (ver xml-documento-fiscal.ts).
            ...(dadosBasicos.protocolo
              ? {
                  cStatConsulta: dadosBasicos.protocolo.cStat,
                  xMotivoConsulta: dadosBasicos.protocolo.xMotivo,
                  consultadoEm: new Date(),
                }
              : {}),
          },
          // Documento já indexado — Distribuição DFe pode reenviar o mesmo NSU.
          // Só atualiza nomeEmitente/cfop/valorTotal (backfill de registros
          // antigos, de antes desses campos existirem, caso a SEFAZ reenvie o
          // mesmo NSU) e o protocolo, se ainda não tinha.
          update: {
            nomeEmitente: dadosBasicos.nomeEmitente,
            cfop: dadosBasicos.cfop,
            condicaoPagamento: dadosBasicos.condicaoPagamento,
            valorTotal: dadosBasicos.valorTotal,
            ...(dadosBasicos.protocolo
              ? {
                  cStatConsulta: dadosBasicos.protocolo.cStat,
                  xMotivoConsulta: dadosBasicos.protocolo.xMotivo,
                  consultadoEm: new Date(),
                }
              : {}),
          },
        });

        // A Distribuição DFe às vezes manda só o resumo (resNFe, sem <det>)
        // antes do XML completo chegar — lerNotaSaida() simplesmente não
        // acha nenhum <det> nesse caso e extrairEPersistirItens() não grava
        // nada (sem erro), então é seguro chamar sempre.
        if (dadosBasicos.tipo === "NFE" || dadosBasicos.tipo === "NFCE") {
          try {
            await this.itensDocumentoFiscal.extrairEPersistirItens(documentoEntrada.id, doc.xml);
          } catch (err) {
            this.logger.warn(`Falha ao extrair itens do documento ${documentoEntrada.id}: ${err}`);
          }
        }

        documentosNovos += 1;
      }

      nsuControle = await this.prisma.client.nsuControle.update({
        where: { empresaId },
        data: { ultimoNsu: BigInt(resultado.ultimoNsu) },
      });

      if (resultado.documentos.length === 0) {
        // Resposta vazia - backlog esgotado, SEFAZ nao tem mais nada alem
        // desse NSU por enquanto. Registra pra nao consultar de novo antes
        // de 1h (ver aguardandoJanelaAposRespostaVazia acima).
        registrarRespostaVazia(empresaId);
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

  /**
   * Zera o NSU controle da empresa, forcando a proxima sincronizacao a
   * pedir a Distribuicao DFe de novo desde o inicio. Necessario quando o
   * banco/armazenamento foi perdido (ex: reconstrucao de servidor) mas a
   * SEFAZ ja tinha avancado o NSU pra alem do que a gente tem salvo aqui -
   * sem isso, a SEFAZ acha que ja mandou tudo que a gente "ja recebeu" e
   * nunca reenvia os documentos que perdemos.
   */
  async zerarNsu(empresaId: string, organizacaoId: string) {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    await this.prisma.client.nsuControle.upsert({
      where: { empresaId },
      create: { empresaId, ultimoNsu: 0 },
      update: { ultimoNsu: 0, ultimoCStat: null, ultimoXMotivo: null },
    });

    return { ok: true };
  }

  /**
   * Consulta a situação de UM documento (NF-e/NFC-e) na SEFAZ por chave de
   * acesso — grava cStat/xMotivo/consultadoEm no próprio DocumentoFiscal.
   * Só cStat=100 (autorizado) entra no TXT de exportação (ver
   * exportacao-txt.service.ts) — os demais (cancelado, denegado,
   * duplicidade) ficam de fora até alguém decidir o que fazer com eles.
   */
  async consultarSituacao(empresaId: string, organizacaoId: string, documentoId: string) {
    const empresa = await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);
    const documento = await this.prisma.client.documentoFiscal.findUnique({ where: { id: documentoId } });
    if (!documento || documento.empresaId !== empresaId) {
      throw new NotFoundException(`Documento ${documentoId} não encontrado`);
    }
    if (documento.tipo === "CTE") {
      // O serviço de consulta usado aqui (NFeConsultaProtocolo4) só aceita
      // chave de modelo 55/65 — mandar uma chave de CT-e (modelo 57) pra
      // ele sempre volta cStat 618 ("Chave de Acesso inválida"), que não
      // tem nada a ver com a nota em si, é só o webservice errado. Consulta
      // de situação de CT-e ainda não foi implementada (ver cte-distribuicao).
      throw new BadRequestException("Consulta de situação de CT-e ainda não está disponível.");
    }
    // NF-e (modelo 55) e NFC-e (modelo 65) também usam webservices DIFERENTES
    // em várias UFs (ver fiscal-engine/src/nfe/webservices-por-uf.ts) — sem
    // mandar o modelo certo, uma NFC-e consultada no serviço de NF-e também
    // volta cStat 618 por engano.
    const modelo = documento.tipo === "NFCE" ? "65" : "55";

    const certificado = await this.certificados.obterParaUso(empresaId);
    const resultado = await this.fiscalEngine.consultarProtocolo({
      codigoUf: empresa.codigoUf,
      ambiente: empresa.ambiente === "PRODUCAO" ? 1 : 2,
      chaveAcesso: documento.chaveAcesso,
      modelo,
      certificado,
    });

    return this.prisma.client.documentoFiscal.update({
      where: { id: documentoId },
      data: {
        cStatConsulta: resultado.cStat,
        xMotivoConsulta: resultado.xMotivo,
        consultadoEm: new Date(),
      },
    });
  }

  /**
   * Consulta em lote os documentos pendentes (NF-e/NFC-e cujo cStat ainda
   * não é 100) de uma direção, opcionalmente só dentro de um período — usado
   * pelo botão "Consultar pendentes" da tela, escopado ao mês selecionado.
   * Um período com milhares de notas (realista aqui — algumas empresas têm
   * +5000 notas de saída por mês) não cabe numa chamada HTTP síncrona (o
   * navegador/proxy derruba a conexão por timeout bem antes de terminar) —
   * por isso só CONTA e DISPARA o processamento em segundo plano (sem
   * "await" no loop), e devolve na hora. O resultado final fica só
   * refletido nos documentos (cStatConsulta/consultadoEm), que a tela relê
   * depois — não tem acompanhamento de progresso ainda.
   */
  async consultarPendentes(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    periodo?: { inicio: Date; fim: Date }
  ) {
    const documentoIds = await this.buscarIdsPendentes(empresaId, organizacaoId, direcao, periodo);

    // Não espera o loop terminar (dispara e devolve) — chamado pela tela via
    // HTTP, onde o navegador/proxy derrubaria a conexão por timeout bem
    // antes de milhares de notas terminarem de ser consultadas. O resultado
    // fica refletido nos documentos (cStatConsulta/consultadoEm), que a
    // tela relê depois.
    void this.executarConsultaPendentes(empresaId, organizacaoId, documentoIds);

    return { total: documentoIds.length, iniciado: documentoIds.length > 0 };
  }

  /**
   * Mesma consulta em lote, mas ESPERA o loop terminar antes de devolver —
   * usado pelo cron diário (sincronizacao-agendada.service.ts), que não tem
   * timeout de navegador e precisa continuar serializado (uma empresa/
   * direção por vez) pra não martelar a SEFAZ com várias empresas em
   * paralelo.
   *
   * `limite` existe pra dar rodízio justo entre empresas — sem ele, uma
   * empresa com fila grande (ex: supermercado com milhares de NFC-e/mês)
   * consumia a execução inteira do cron e as empresas seguintes da lista
   * nunca eram alcançadas naquele dia (achado em 2026-10-21: uma empresa
   * ficou com só 14 notas de saída consultadas em semanas, de 15 mil
   * pendentes, porque outras empresas à frente na lista monopolizavam
   * cada execução). Pega as mais ANTIGAS primeiro (orderBy emitidoEm asc)
   * pra garantir progresso real dia após dia, mesmo com o limite.
   */
  async consultarPendentesAguardando(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    limite?: number
  ) {
    const documentoIds = await this.buscarIdsPendentes(empresaId, organizacaoId, direcao, undefined, limite);
    const { consultados, falhas } = await this.executarConsultaPendentes(empresaId, organizacaoId, documentoIds);
    return { total: documentoIds.length, consultados, falhas };
  }

  private async buscarIdsPendentes(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    periodo?: { inicio: Date; fim: Date },
    limite?: number
  ): Promise<string[]> {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    const pendentes = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao,
        tipo: { in: ["NFE", "NFCE"] },
        // "cStatConsulta: { not: '100' }" sozinho NÃO pega os registros com
        // cStatConsulta nulo (o caso normal de um documento que acabou de
        // chegar e nunca foi consultado) — vira "<> '100'" em SQL, que
        // exclui NULL por definição. Era por isso que o cron diário nunca
        // pegava documento nenhum recém-chegado: só reprocessava os raros
        // que já tinham algum cStat errado gravado antes (achado em
        // 2026-10-21 rodando um backfill manual, que encontrou só 2
        // pendentes nesse filtro quando o banco tinha dezenas de milhares).
        OR: [{ cStatConsulta: null }, { cStatConsulta: { not: "100" } }],
        ...(periodo ? { emitidoEm: { gte: periodo.inicio, lte: periodo.fim } } : {}),
      },
      select: { id: true },
      orderBy: { emitidoEm: "asc" },
      ...(limite ? { take: limite } : {}),
    });
    return pendentes.map((d) => d.id);
  }

  private async executarConsultaPendentes(
    empresaId: string,
    organizacaoId: string,
    documentoIds: string[]
  ): Promise<{ consultados: number; falhas: number }> {
    let consultados = 0;
    let falhas = 0;
    for (const documentoId of documentoIds) {
      try {
        await this.consultarSituacao(empresaId, organizacaoId, documentoId);
        consultados += 1;
      } catch (err) {
        falhas += 1;
        this.logger.warn(`Falha ao consultar documento ${documentoId}: ${err}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    this.logger.log(
      `Consulta em lote concluída pra empresa ${empresaId}: ${consultados} consultada(s), ${falhas} falha(s) de ${documentoIds.length} total.`
    );
    return { consultados, falhas };
  }

  /**
   * Itens (produtos) de notas autorizadas (cStat=100) num período, de
   * ENTRADA ou SAÍDA — base das telas de Apuração do ICMS e Apuração do
   * IBS/CBS. As duas telas usam a mesma busca, só mudam as colunas que o
   * admin-web decide exibir; aqui devolvemos tudo de uma vez.
   */
  async apuracaoItens(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    inicio: Date,
    fim: Date
  ) {
    const empresa = await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    const itens = await this.prisma.client.itemDocumentoFiscal.findMany({
      where: {
        documentoFiscal: {
          empresaId,
          direcao,
          tipo: { in: ["NFE", "NFCE"] },
          cStatConsulta: "100",
          emitidoEm: { gte: inicio, lte: fim },
        },
      },
      include: { documentoFiscal: { select: { chaveAcesso: true, emitidoEm: true, tipo: true } } },
      orderBy: [{ documentoFiscal: { emitidoEm: "asc" } }, { nItem: "asc" }],
    });

    // "De/para" (cfopEntrada -> cfopSaidaEsperado) só faz sentido pra
    // SAÍDA — define quais CFOPs de saída são esperados quando a regra
    // tem o campo preenchido. Sem rastreio de estoque (que entrada virou
    // qual saída), a checagem possível é: o CFOP de saída desse item está
    // entre os valores que ALGUMA regra ativa da empresa/organização
    // espera ver na saída? Se a empresa não configurou nenhum
    // cfopSaidaEsperado ainda, ninguém é marcado como divergente.
    const cfopsSaidaEsperados =
      direcao === "SAIDA"
        ? new Set(
            (
              await this.prisma.client.regraFiscal.findMany({
                where: {
                  organizacaoId: empresa.organizacaoId,
                  ativa: true,
                  cfopSaidaEsperado: { not: null },
                  OR: [{ empresaId }, { empresaId: null }],
                },
                select: { cfopSaidaEsperado: true },
              })
            ).map((r) => r.cfopSaidaEsperado)
          )
        : new Set<string | null>();

    // Regime misturado: uma nota com item em CST "normal" e item em CSOSN
    // (Simples Nacional) ao mesmo tempo — uma empresa não tem os dois
    // regimes juntos, então isso é sinal forte de erro de emissão.
    const regimesPorNota = new Map<string, Set<boolean>>();
    for (const item of itens) {
      if (item.icmsComCst === null) continue;
      const regimes = regimesPorNota.get(item.documentoFiscalId) ?? new Set<boolean>();
      regimes.add(item.icmsComCst);
      regimesPorNota.set(item.documentoFiscalId, regimes);
    }
    const notasComRegimeMisturado = new Set(
      [...regimesPorNota.entries()].filter(([, regimes]) => regimes.size > 1).map(([id]) => id)
    );

    // Alíquota de ICMS fora do padrão -- comparado com as PRÓPRIAS notas
    // dessa empresa no mesmo CFOP e período (sem precisar de tabela de
    // referência externa por UF/NCM, que não existe). Só sinaliza quando
    // há amostra suficiente (>=3 itens no CFOP) e uma alíquota claramente
    // majoritária (>50%) -- com pouca amostra ou tudo dividido meio a
    // meio não dá pra dizer qual é "a errada".
    const contagemPorCfop = new Map<string, Map<string, number>>();
    for (const item of itens) {
      if (item.icmsAliquota === null) continue;
      const aliq = item.icmsAliquota.toString();
      const porCfop = contagemPorCfop.get(item.cfop) ?? new Map<string, number>();
      porCfop.set(aliq, (porCfop.get(aliq) ?? 0) + 1);
      contagemPorCfop.set(item.cfop, porCfop);
    }
    const modaPorCfop = new Map<string, { aliquota: string; contagem: number; total: number }>();
    for (const [cfop, contagens] of contagemPorCfop) {
      let total = 0;
      let melhorAliquota = "";
      let melhorContagem = 0;
      for (const [aliq, contagem] of contagens) {
        total += contagem;
        if (contagem > melhorContagem) {
          melhorContagem = contagem;
          melhorAliquota = aliq;
        }
      }
      modaPorCfop.set(cfop, { aliquota: melhorAliquota, contagem: melhorContagem, total });
    }

    // Regra aprendida (Carta de Correção) que já conhece esse exato
    // padrão errado — some direto na tabela como "correção sugerida", pra
    // aplicar com um clique em vez de repetir o processo manual (pedido
    // explícito do usuário em 2026-10-23). Só CFOP/NCM/CST ICMS têm valor
    // no nível do item — ver CAMPOS_COM_VALOR_NO_ITEM em correcoes.service.ts.
    // Só NF-e entra — CC-e não existe pra NFC-e na SEFAZ (ver aviso em
    // correcoes.service.ts, aplicarCorrecao).
    const sugestoes =
      direcao === "SAIDA"
        ? await this.correcoes.sugestoesParaItens(
            empresa.organizacaoId,
            itens
              .filter((item) => item.documentoFiscal.tipo === "NFE")
              .map((item) => ({ id: item.id, ncm: item.ncm, cfop: item.cfop, icmsCst: item.icmsCst }))
          )
        : {};

    // Cálculo do valor esperado (base × alíquota / 100) pra cada tributo
    // com inconsistência — é esse número, junto do valor que realmente veio
    // no XML, que aparece no "?" de cada linha na tela (pedido do usuário:
    // "explicando que tal valor não bate com tal coisa", sem precisar ficar
    // lendo a linha toda procurando qual célula está errada).
    function valorEsperado(base: unknown, aliquota: unknown): string | null {
      const b = Number(base);
      const a = Number(aliquota);
      if (!Number.isFinite(b) || !Number.isFinite(a)) return null;
      return ((b * a) / 100).toFixed(2);
    }

    return itens.map((item) => {
      const numeroNota = Number(item.documentoFiscal.chaveAcesso.slice(25, 34));
      const inconsistencias = [
        { nome: "ICMS", base: item.icmsBase, aliquota: item.icmsAliquota, valor: item.icmsValor },
        { nome: "PIS", base: item.pisBase, aliquota: item.pisAliquota, valor: item.pisValor },
        { nome: "COFINS", base: item.cofinsBase, aliquota: item.cofinsAliquota, valor: item.cofinsValor },
        { nome: "IBS UF", base: item.ibsCbsBase, aliquota: item.ibsUfAliquota, valor: item.ibsUfValor },
        { nome: "IBS Municipal", base: item.ibsCbsBase, aliquota: item.ibsMunAliquota, valor: item.ibsMunValor },
        { nome: "CBS", base: item.ibsCbsBase, aliquota: item.cbsAliquota, valor: item.cbsValor },
      ].filter(({ base, aliquota, valor }) => !conferirAritmetica(base, aliquota, valor));
      const tributosInconsistentes = inconsistencias.map(({ nome }) => nome);

      const cfopDivergente = cfopsSaidaEsperados.size > 0 && !cfopsSaidaEsperados.has(item.cfop);
      // Só sinaliza ausência em quem já deveria ter o grupo (reforma é
      // obrigatória a partir de 05/10/2026) — nota mais antiga sem o
      // grupo é normal, não é pendência.
      const ibsCbsObrigatorioAusente =
        !item.ibsCbsCst &&
        item.documentoFiscal.emitidoEm !== null &&
        item.documentoFiscal.emitidoEm >= DATA_OBRIGATORIEDADE_IBS_CBS;
      const regimeIcmsMisturado = notasComRegimeMisturado.has(item.documentoFiscalId);
      const moda = modaPorCfop.get(item.cfop);
      const aliquotaIcmsDivergente =
        item.icmsAliquota !== null &&
        moda !== undefined &&
        moda.total >= 3 &&
        moda.contagem / moda.total > 0.5 &&
        item.icmsAliquota.toString() !== moda.aliquota;

      // Detalhe campo-a-campo exibido no "?" de cada linha pendente — cada
      // entrada diz exatamente qual valor era esperado e qual veio no XML,
      // em vez de só marcar a linha como "tem algo errado".
      const detalheDivergencias: { campo: string; esperado: string; atual: string }[] = [
        ...(cfopDivergente
          ? [
              {
                campo: "CFOP",
                esperado: [...cfopsSaidaEsperados].filter((c): c is string => c !== null).join(" ou "),
                atual: item.cfop,
              },
            ]
          : []),
        ...inconsistencias.map(({ nome, base, aliquota, valor }) => ({
          campo: `${nome} (base × alíquota)`,
          esperado: valorEsperado(base, aliquota) ?? "—",
          atual: valor === null ? "—" : String(valor),
        })),
        ...(regimeIcmsMisturado
          ? [
              {
                campo: "Regime tributário do ICMS",
                esperado: "Mesmo regime (CST normal ou CSOSN/Simples) em todos os itens da nota",
                atual: "Nota com itens em CST normal e CSOSN misturados",
              },
            ]
          : []),
        ...(aliquotaIcmsDivergente && moda
          ? [
              {
                campo: "Alíquota de ICMS",
                esperado: `${moda.aliquota}% (a mais usada pela empresa nesse CFOP)`,
                atual: `${item.icmsAliquota}%`,
              },
            ]
          : []),
        ...(ibsCbsObrigatorioAusente
          ? [
              {
                campo: "Grupo IBS/CBS",
                esperado: "Presente (obrigatório em notas emitidas a partir de 05/10/2026)",
                atual: "Ausente no XML",
              },
            ]
          : []),
      ];

      return {
        ...item,
        nNF: numeroNota,
        dhEmi: item.documentoFiscal.emitidoEm,
        tipo: item.documentoFiscal.tipo,
        cfopDivergente,
        tributosInconsistentes,
        ibsCbsObrigatorioAusente,
        regimeIcmsMisturado,
        aliquotaIcmsDivergente,
        detalheDivergencias,
        correcaoSugerida: sugestoes[item.id] ?? null,
      };
    });
  }

  /**
   * Números de nota (NF-e/NFC-e) que faltam na sequência — forte indício
   * de nota que nunca chegou no sistema (declaração incompleta). Usa o
   * HISTÓRICO INTEIRO da empresa pra achar os buracos (não só o período
   * pedido) pra não dar falso positivo na virada do mês — ex: nota 101
   * emitida em outubro não pode parecer "faltando setembro" só porque
   * setembro terminou na 100. Só devolve os buracos que caem perto do
   * período pedido (nota antes OU depois do buraco emitida dentro dele).
   * Numeração de NF-e e NFC-e é independente, e cada série também —
   * agrupa por tipo+série.
   */
  async apuracaoNumeracaoFaltando(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    inicio: Date,
    fim: Date
  ) {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    const documentos = await this.prisma.client.documentoFiscal.findMany({
      where: { empresaId, direcao, tipo: { in: ["NFE", "NFCE"] } },
      select: { chaveAcesso: true, tipo: true, emitidoEm: true },
    });

    const porSerie = new Map<
      string,
      { tipo: string; serie: number; numero: number; emitidoEm: Date | null }[]
    >();
    for (const doc of documentos) {
      const decodificada = decodificarChaveAcesso(doc.chaveAcesso);
      if (!decodificada) continue;
      const chave = `${doc.tipo}-${decodificada.serie}`;
      const lista = porSerie.get(chave) ?? [];
      lista.push({ tipo: doc.tipo, serie: decodificada.serie, numero: decodificada.numeroDocumento, emitidoEm: doc.emitidoEm });
      porSerie.set(chave, lista);
    }

    const LIMITE = 300;
    const faltando: {
      tipo: string;
      serie: number;
      numero: number;
      anterior: { numero: number; emitidoEm: Date | null };
      proximo: { numero: number; emitidoEm: Date | null };
    }[] = [];
    let truncado = false;

    for (const lista of porSerie.values()) {
      const ordenada = [...lista].sort((a, b) => a.numero - b.numero);
      for (let i = 1; i < ordenada.length; i++) {
        const anterior = ordenada[i - 1]!;
        const proximo = ordenada[i]!;
        const gap = proximo.numero - anterior.numero;
        if (gap <= 1) continue;
        const relevante =
          (anterior.emitidoEm && anterior.emitidoEm >= inicio && anterior.emitidoEm <= fim) ||
          (proximo.emitidoEm && proximo.emitidoEm >= inicio && proximo.emitidoEm <= fim);
        if (!relevante) continue;
        // Buraco gigante (milhares) quase sempre é faixa de numeração
        // nunca usada por essa empresa (ex: pulou de propósito) — listar
        // número por número não ajuda ninguém, só soma como 1 aviso.
        if (gap > 1000) {
          faltando.push({
            tipo: anterior.tipo,
            serie: anterior.serie,
            numero: -1,
            anterior: { numero: anterior.numero, emitidoEm: anterior.emitidoEm },
            proximo: { numero: proximo.numero, emitidoEm: proximo.emitidoEm },
          });
          continue;
        }
        for (let numero = anterior.numero + 1; numero < proximo.numero; numero++) {
          if (faltando.length >= LIMITE) {
            truncado = true;
            break;
          }
          faltando.push({
            tipo: anterior.tipo,
            serie: anterior.serie,
            numero,
            anterior: { numero: anterior.numero, emitidoEm: anterior.emitidoEm },
            proximo: { numero: proximo.numero, emitidoEm: proximo.emitidoEm },
          });
        }
        if (truncado) break;
      }
      if (truncado) break;
    }

    return { faltando, truncado };
  }

  /**
   * Reprocessa (extrai e persiste) os itens de documentos (NF-e/NFC-e, de
   * ENTRADA ou SAÍDA) que ainda não têm nenhuma linha em
   * ItemDocumentoFiscal — cobre tanto histórico anterior à feature de
   * Apuração quanto qualquer nota que falhou na extração automática da
   * ingestão. Mesmo padrão "conta e dispara em segundo plano" de
   * consultarPendentes — milhares de documentos não cabem numa chamada
   * HTTP síncrona.
   */
  async reprocessarItens(empresaId: string, organizacaoId: string, direcao: "ENTRADA" | "SAIDA") {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    const documentos = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao,
        tipo: { in: ["NFE", "NFCE"] },
        itens: { none: {} },
      },
      select: { id: true, objetoStorageXml: true },
    });

    void this.executarReprocessamentoItens(documentos);

    return { total: documentos.length, iniciado: documentos.length > 0 };
  }

  private async executarReprocessamentoItens(
    documentos: { id: string; objetoStorageXml: string }[]
  ): Promise<void> {
    let processados = 0;
    let falhas = 0;
    for (const doc of documentos) {
      try {
        const xml = await this.storage.getObject(BUCKET_DOCUMENTOS_FISCAIS, doc.objetoStorageXml);
        await this.itensDocumentoFiscal.extrairEPersistirItens(doc.id, xml.toString("utf8"));
        processados += 1;
      } catch (err) {
        falhas += 1;
        this.logger.warn(`Falha ao reprocessar itens do documento ${doc.id}: ${err}`);
      }
    }
    this.logger.log(`Reprocessamento de itens concluído: ${processados} processado(s), ${falhas} falha(s) de ${documentos.length} total.`);
  }

  /**
   * Monta um .zip com os XMLs dos documentos filtrados (mesmo criterio da
   * tela: direcao + periodo) e devolve como stream, pra nao precisar
   * carregar tudo em memoria de uma vez quando o mes tiver muitos documentos.
   */
  async baixarXmlsEmZip(
    empresaId: string,
    direcao: "ENTRADA" | "SAIDA" | "CTE_DISTRIBUICAO",
    inicio: Date,
    fim: Date,
    organizacaoId: string,
    tipo?: "NFE" | "NFCE" | "CTE"
  ): Promise<Readable> {
    const empresa = await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);
    // Sanitiza pra tirar caracteres que o Windows não aceita em nome de
    // arquivo (< > : " / \ | ? *) — razão social vem livre do cadastro,
    // sem essa limpeza um nome com "/" ia quebrar o caminho dentro do zip.
    const nomeEmpresaArquivo = empresa.razaoSocial.replace(/[<>:"/\\|?*]/g, "");

    const documentos = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao,
        ...(tipo ? { tipo } : {}),
        OR: [
          { emitidoEm: { gte: inicio, lt: fim } },
          { emitidoEm: null, recebidoEm: { gte: inicio, lt: fim } },
        ],
      },
      select: {
        chaveAcesso: true,
        objetoStorageXml: true,
        cancelada: true,
        emitidoEm: true,
        recebidoEm: true,
      },
    });

    const zip = archiver("zip", { zlib: { level: 9 } });
    zip.on("warning", (err) => this.logger.warn(`Aviso ao gerar zip de XMLs: ${err}`));

    // Nao usar `await` no loop antes de retornar o stream — o chamador
    // (controller) precisa comecar a consumir o stream em paralelo com o
    // preenchimento, senao arquivos grandes de XML enchem o buffer interno
    // do archiver e travam.
    void (async () => {
      for (const doc of documentos) {
        try {
          const buffer = await this.storage.getObject(BUCKET_DOCUMENTOS_FISCAIS, doc.objetoStorageXml);
          // Pasta separada por status dentro do zip (pedido do usuário em
          // 2026-10-28: antes vinha tudo junto numa pasta só, difícil de
          // separar o que foi cancelado do que foi autorizado de verdade).
          // "Inutilizados" não entra aqui — o agente desktop já descarta
          // esse tipo de arquivo (faixa de numeração não usada, sem
          // conteúdo de nota) antes de mandar pro servidor, então não tem
          // esse dado salvo pra incluir.
          const pasta = doc.cancelada ? "Cancelados" : "Autorizados";
          // Nome do arquivo com CNPJ + nome da empresa + data — antes era
          // só a chave de acesso (44 dígitos ilegíveis), difícil de saber
          // do que se tratava sem abrir o XML (pedido do usuário em
          // 2026-10-28).
          const data = (doc.emitidoEm ?? doc.recebidoEm).toISOString().slice(0, 10);
          const nomeArquivo = `${empresa.cnpj}_${nomeEmpresaArquivo}_${data}_${doc.chaveAcesso}.xml`;
          zip.append(buffer, { name: `${pasta}/${nomeArquivo}` });
        } catch (err) {
          this.logger.error(`Falha ao ler XML ${doc.chaveAcesso} pro zip: ${err}`);
        }
      }
      void zip.finalize();
    })();

    return zip;
  }
}
