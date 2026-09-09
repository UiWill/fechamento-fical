import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "../common/prisma/prisma.service";
import { DocumentosFiscaisService } from "../documentos-fiscais/documentos-fiscais.service";

@Injectable()
export class SincronizacaoAgendadaService {
  private readonly logger = new Logger(SincronizacaoAgendadaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentosFiscais: DocumentosFiscaisService
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
      select: { id: true, razaoSocial: true },
    });

    this.logger.log(
      `Sincronização noturna iniciada: ${empresas.length} empresa(s) ativa(s) com certificado.`
    );

    for (const empresa of empresas) {
      try {
        const resultado = await this.documentosFiscais.sincronizarComSefaz(empresa.id);
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
    }

    this.logger.log("Sincronização noturna concluída.");
  }
}
