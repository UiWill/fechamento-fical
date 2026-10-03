import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../common/prisma/prisma.service";
import { CteDistribuicaoService } from "../cte-distribuicao/cte-distribuicao.service";
import { DocumentosFiscaisService } from "../documentos-fiscais/documentos-fiscais.service";

@Injectable()
export class SincronizacaoAgendadaService {
  private readonly logger = new Logger(SincronizacaoAgendadaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentosFiscais: DocumentosFiscaisService,
    private readonly cteDistribuicao: CteDistribuicaoService
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
          const resultado = await this.documentosFiscais.consultarPendentes(
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
}
