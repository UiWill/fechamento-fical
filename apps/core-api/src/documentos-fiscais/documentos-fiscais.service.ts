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
    private readonly itensDocumentoFiscal: ItensDocumentoFiscalService
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

  async listarPorEmpresa(empresaId: string, organizacaoId: string) {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);
    return this.prisma.client.documentoFiscal.findMany({
      // CT-e da distribuição tem aba e lista próprias (cte-distribuicao).
      where: { empresaId, direcao: { in: ["ENTRADA", "SAIDA"] } },
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
   */
  async consultarPendentesAguardando(empresaId: string, organizacaoId: string, direcao: "ENTRADA" | "SAIDA") {
    const documentoIds = await this.buscarIdsPendentes(empresaId, organizacaoId, direcao);
    const { consultados, falhas } = await this.executarConsultaPendentes(empresaId, organizacaoId, documentoIds);
    return { total: documentoIds.length, consultados, falhas };
  }

  private async buscarIdsPendentes(
    empresaId: string,
    organizacaoId: string,
    direcao: "ENTRADA" | "SAIDA",
    periodo?: { inicio: Date; fim: Date }
  ): Promise<string[]> {
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

    const pendentes = await this.prisma.client.documentoFiscal.findMany({
      where: {
        empresaId,
        direcao,
        tipo: { in: ["NFE", "NFCE"] },
        cStatConsulta: { not: "100" },
        ...(periodo ? { emitidoEm: { gte: periodo.inicio, lte: periodo.fim } } : {}),
      },
      select: { id: true },
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
      include: { documentoFiscal: { select: { chaveAcesso: true, emitidoEm: true } } },
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

    return itens.map((item) => {
      const numeroNota = Number(item.documentoFiscal.chaveAcesso.slice(25, 34));
      return {
        ...item,
        nNF: numeroNota,
        dhEmi: item.documentoFiscal.emitidoEm,
        cfopDivergente: cfopsSaidaEsperados.size > 0 && !cfopsSaidaEsperados.has(item.cfop),
      };
    });
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
    await this.verificarEmpresaDaOrganizacao(empresaId, organizacaoId);

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
      select: { chaveAcesso: true, objetoStorageXml: true },
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
          zip.append(buffer, { name: `${doc.chaveAcesso}.xml` });
        } catch (err) {
          this.logger.error(`Falha ao ler XML ${doc.chaveAcesso} pro zip: ${err}`);
        }
      }
      void zip.finalize();
    })();

    return zip;
  }
}
