import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CertificadosService } from "../certificados/certificados.service";

// Mesmo limite já usado na tela de Agentes pra marcar "offline" na lista
// (ver MINUTOS_PARA_CONSIDERAR_ATRASADO em admin-web/.../agentes/page.tsx)
// — mantido igual aqui pra não ter dois números diferentes dizendo coisas
// diferentes sobre o mesmo agente em telas diferentes.
const MINUTOS_PARA_CONSIDERAR_OFFLINE = 10;

const DIAS_PARA_ALERTAR_CERTIFICADO = 30;

// Quanto tempo sem rodar uma rotina agendada é considerado "atrasada" —
// cada uma roda 1x/dia numa janela própria; a tolerância é generosa (30h,
// não 24h) pra não dar falso positivo só por checar a tela um pouco antes
// do horário de hoje ainda ter chegado.
const ROTINAS_ESPERADAS: { nome: string; rotulo: string; toleranciaHoras: number }[] = [
  { nome: "sincronizacao-noturna", rotulo: "Sincronização com a SEFAZ (0h–5h)", toleranciaHoras: 30 },
  { nome: "consulta-situacao-diaria", rotulo: "Consulta de situação pendente (6h)", toleranciaHoras: 30 },
  { nome: "manifestacao-automatica", rotulo: "Manifestação automática (Ciência, 7h)", toleranciaHoras: 30 },
  { nome: "backup-diario", rotulo: "Backup diário do servidor (21h)", toleranciaHoras: 30 },
];

@Injectable()
export class SistemaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly certificados: CertificadosService
  ) {}

  /** Upsert por nome — só o estado mais recente de cada rotina importa pro painel. */
  async registrarRotina(nome: string, sucesso: boolean, detalhe?: string) {
    await this.prisma.client.rotinaSistema.upsert({
      where: { nome },
      create: { nome, sucesso, detalhe, executadoEm: new Date() },
      update: { sucesso, detalhe, executadoEm: new Date() },
    });
  }

  async obterSaude(organizacaoId: string) {
    const [certificadosVencendo, agentesOffline, rotinasSalvas] = await Promise.all([
      this.certificados.listarVencendoEm(DIAS_PARA_ALERTAR_CERTIFICADO, organizacaoId),
      this.prisma.client.agenteInstalacaoToken.findMany({
        where: {
          OR: [{ organizacaoId }, { empresa: { organizacaoId } }],
          status: "ATIVO",
          ocultoEm: null,
        },
        select: {
          id: true,
          nome: true,
          ultimoHeartbeatEm: true,
          empresa: { select: { razaoSocial: true } },
        },
      }),
      this.prisma.client.rotinaSistema.findMany(),
    ]);

    const limiteOffline = new Date(Date.now() - MINUTOS_PARA_CONSIDERAR_OFFLINE * 60_000);
    const offline = agentesOffline
      .filter((a) => !a.ultimoHeartbeatEm || a.ultimoHeartbeatEm < limiteOffline)
      .map((a) => ({
        id: a.id,
        nome: a.nome,
        empresa: a.empresa?.razaoSocial ?? null,
        ultimoHeartbeatEm: a.ultimoHeartbeatEm,
      }));

    const porNome = new Map(rotinasSalvas.map((r) => [r.nome, r]));
    const agora = Date.now();
    const rotinas = ROTINAS_ESPERADAS.map((esperada) => {
      const registro = porNome.get(esperada.nome);
      if (!registro) {
        return { nome: esperada.nome, rotulo: esperada.rotulo, status: "sem-registro" as const, executadoEm: null, detalhe: null };
      }
      const horasDesde = (agora - registro.executadoEm.getTime()) / 3_600_000;
      const atrasada = horasDesde > esperada.toleranciaHoras;
      return {
        nome: esperada.nome,
        rotulo: esperada.rotulo,
        status: atrasada ? ("atrasada" as const) : registro.sucesso ? ("ok" as const) : ("falhou" as const),
        executadoEm: registro.executadoEm,
        detalhe: registro.detalhe,
      };
    });

    return {
      certificadosVencendo: certificadosVencendo.map((c) => ({
        empresaId: c.empresaId,
        empresa: c.empresa.razaoSocial,
        validoAte: c.validoAte,
      })),
      agentesOffline: offline,
      rotinas,
    };
  }
}
