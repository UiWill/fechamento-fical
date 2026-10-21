import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../common/prisma/prisma.service";
import { CteDistribuicaoService } from "../cte-distribuicao/cte-distribuicao.service";
import { DocumentosFiscaisService } from "../documentos-fiscais/documentos-fiscais.service";
import { ManifestacaoService } from "../manifestacao/manifestacao.service";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Depois de N rejeições reais (não a duplicidade cStat 573, que já marca o
// documento como MANIFESTADO e sai da consulta de pendentes), desiste de
// tentar esse documento automaticamente — sem isso o cron tentava pra
// sempre uma nota realmente rejeitada pela SEFAZ, todo dia, sem nunca
// resolver nem avisar claramente (achado numa varredura de bugs em
// 2026-10-21).
const MAX_TENTATIVAS_MANIFESTACAO = 3;

@Injectable()
export class SincronizacaoAgendadaService {
  private readonly logger = new Logger(SincronizacaoAgendadaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentosFiscais: DocumentosFiscaisService,
    private readonly cteDistribuicao: CteDistribuicaoService,
    private readonly manifestacao: ManifestacaoService
  ) {}

  /**
   * Roda de hora em hora entre meia-noite e 5h da manhã (6 janelas). Cada
   * chamada a sincronizarComSefaz já respeita o limite de 18 consultas/hora
   * por CNPJ da SEFAZ; rodar 1x por hora deixa o contador de cada empresa
   * "descansar" antes da próxima janela, então o backlog vai sendo esgotado
   * noite após noite sem correr risco de bloqueio (erro 656).
   *
   * Esse limite é da SEFAZ por CNPJ+certificado, não "nosso" — se outro
   * sistema (ex: o do contador) também consultar a mesma empresa, pode vir
   * bloqueio mesmo dentro da nossa margem de segurança. sincronizarComSefaz
   * detecta isso (cStat=656) e evita novas tentativas por 1h; aqui só
   * registramos no log pra ficar visível qual empresa foi afetada.
   */
  @Cron("0 0,1,2,3,4,5 * * *")
  async sincronizarTodasAsEmpresas() {
    const empresas = await this.prisma.client.empresa.findMany({
      where: { status: "ATIVA", certificado: { isNot: null } },
      select: { id: true, razaoSocial: true, organizacaoId: true },
    });

    this.logger.log(
      `Sincronização noturna iniciada: ${empresas.length} empresa(s) ativa(s) com certificado.`
    );

    for (const empresa of empresas) {
      try {
        const resultado = await this.documentosFiscais.sincronizarComSefaz(empresa.id, empresa.organizacaoId);
        const sufixo = resultado.bloqueadoPelaSefaz
          ? " — BLOQUEADO pela SEFAZ (consumo indevido, possivelmente outro sistema consultando o mesmo CNPJ)"
          : resultado.limiteSefazAtingido
            ? " — limite da SEFAZ atingido nesta janela"
            : "";
        this.logger.log(`[${empresa.razaoSocial}] ${resultado.documentosNovos} documento(s) novo(s)${sufixo}`);
      } catch (err) {
        this.logger.error(
          `[${empresa.razaoSocial}] falha na sincronização noturna: ${
            err instanceof Error ? err.message : err
          }`
        );
      }

      // CT-e é outro serviço da SEFAZ, com cota própria: uma falha aqui não
      // pode atrapalhar a NF-e (nem o contrário).
      try {
        const cte = await this.cteDistribuicao.sincronizar(empresa.id);
        this.logger.log(
          `[${empresa.razaoSocial}] CT-e: ${cte.documentosNovos} novo(s)${cte.bloqueadoPelaSefaz ? " — BLOQUEADO pela SEFAZ" : ""}`
        );
      } catch (err) {
        this.logger.error(
          `[${empresa.razaoSocial}] falha na sincronização noturna de CT-e: ${err instanceof Error ? err.message : err}`
        );
      }
    }

    this.logger.log("Sincronização noturna concluída.");
  }

  /**
   * Uma vez por dia, consulta na SEFAZ (por chave de acesso) a situação de
   * toda nota de entrada/saída ainda sem cStat=100 — é o que libera a nota
   * pro TXT de exportação (ver exportacao-txt.service.ts). Roda às 6h,
   * depois da última janela de sincronização de Distribuição DFe (0h-5h),
   * pra não disputar nada com ela.
   *
   * Religado em 2026-10-03: a consulta passou a ser feita por SOAP direto
   * (fiscal-engine/src/nfe/consulta-protocolo.ts), sem ACBrLibNFe — a
   * versão anterior (via NFE_Consultar) derrubava o processo inteiro em
   * toda variante de DLL testada; a nova é puro Node, sem risco de queda,
   * e já testada com sucesso contra a SEFAZ real (cStat 100, protocolo
   * recebido).
   */
  @Cron("0 6 * * *")
  async consultarSituacaoPendenteDeTodasAsEmpresas() {
    const empresas = await this.prisma.client.empresa.findMany({
      where: { status: "ATIVA", certificado: { isNot: null } },
      select: { id: true, razaoSocial: true, organizacaoId: true },
    });

    this.logger.log(`Consulta diária de situação iniciada: ${empresas.length} empresa(s).`);

    for (const empresa of empresas) {
      for (const direcao of ["ENTRADA", "SAIDA"] as const) {
        try {
          const resultado = await this.documentosFiscais.consultarPendentesAguardando(
            empresa.id,
            empresa.organizacaoId,
            direcao
          );
          if (resultado.total > 0) {
            this.logger.log(
              `[${empresa.razaoSocial}] ${direcao}: ${resultado.consultados}/${resultado.total} consultada(s)${
                resultado.falhas > 0 ? `, ${resultado.falhas} falha(s)` : ""
              }`
            );
          }
        } catch (err) {
          this.logger.error(
            `[${empresa.razaoSocial}] falha na consulta diária de situação (${direcao}): ${
              err instanceof Error ? err.message : err
            }`
          );
        }
      }
    }

    this.logger.log("Consulta diária de situação concluída.");
  }

  /**
   * Manifestação automática do destinatário (entrada) — pedido do usuário
   * em 2026-10-20. Manda SÓ "Ciência da Operação" (não "Confirmação",
   * "Desconhecimento" ou "Operação não realizada") — é o único dos 4 tipos
   * que não afirma nada sobre o conteúdo da nota (só avisa a Receita que a
   * empresa está ciente que ela existe contra o CNPJ dela), decisão
   * explícita do usuário pra evitar criar um registro formal errado numa
   * nota que ninguém verificou (fraude, nota errada etc.) — esses 3 outros
   * tipos continuam manuais, pelo botão na tela.
   *
   * Roda às 7h, depois da consulta de situação (6h) — não depende dela,
   * mas evita rodar os dois ao mesmo tempo. Pega TODO o histórico
   * pendente de cada empresa (não só notas novas), então a primeira
   * execução pode demorar — sem problema, cron não tem timeout de HTTP.
   */
  @Cron("0 7 * * *")
  async manifestarAutomaticamenteTodasAsEmpresas() {
    const empresas = await this.prisma.client.empresa.findMany({
      where: { status: "ATIVA", certificado: { isNot: null } },
      select: { id: true, razaoSocial: true },
    });

    this.logger.log(`Manifestação automática iniciada: ${empresas.length} empresa(s).`);

    for (const empresa of empresas) {
      try {
        const pendentes = await this.prisma.client.documentoFiscal.findMany({
          where: { empresaId: empresa.id, direcao: "ENTRADA", tipo: "NFE", status: { not: "MANIFESTADO" } },
          select: {
            id: true,
            _count: {
              select: {
                manifestacoes: { where: { tipoEvento: "CIENCIA_OPERACAO", status: "REJEITADA" } },
              },
            },
          },
        });
        if (pendentes.length === 0) continue;

        const desistidos = pendentes.filter((d) => d._count.manifestacoes >= MAX_TENTATIVAS_MANIFESTACAO);
        const aTentar = pendentes.filter((d) => d._count.manifestacoes < MAX_TENTATIVAS_MANIFESTACAO);
        if (desistidos.length > 0) {
          this.logger.warn(
            `[${empresa.razaoSocial}] ${desistidos.length} documento(s) com ${MAX_TENTATIVAS_MANIFESTACAO}+ rejeições — manifestação automática desistiu, requer verificação manual.`
          );
        }
        if (aTentar.length === 0) continue;

        let enviadas = 0;
        let falhas = 0;
        for (const doc of aTentar) {
          try {
            const evento = await this.manifestacao.enviar(empresa.id, doc.id, "CIENCIA_OPERACAO");
            if (evento.status === "AUTORIZADA") {
              enviadas++;
            } else {
              falhas++;
            }
          } catch (err) {
            falhas++;
            this.logger.error(
              `[${empresa.razaoSocial}] falha ao manifestar documento ${doc.id}: ${
                err instanceof Error ? err.message : err
              }`
            );
          }
          // Mesmo espaçamento já usado em outras chamadas autenticadas por
          // certificado pra SEFAZ nesse projeto (consultarPendentes) — evita
          // rajada de requisições.
          await sleep(300);
        }
        this.logger.log(
          `[${empresa.razaoSocial}] manifestação automática: ${enviadas}/${aTentar.length} enviada(s)${
            falhas > 0 ? `, ${falhas} falha(s)` : ""
          }`
        );
      } catch (err) {
        // Isola cada empresa (mesmo padrão de sincronizarTodasAsEmpresas) —
        // uma falha ao buscar pendentes de uma empresa não pode travar a
        // manifestação automática das empresas seguintes nesta execução.
        this.logger.error(
          `[${empresa.razaoSocial}] falha na manifestação automática: ${
            err instanceof Error ? err.message : err
          }`
        );
      }
    }

    this.logger.log("Manifestação automática concluída.");
  }
}
