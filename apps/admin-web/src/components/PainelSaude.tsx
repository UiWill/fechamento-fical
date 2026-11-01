"use client";

import { useEffect, useState } from "react";
import { obterSaudeSistema, type SaudeSistema } from "@/lib/api";
import { formatarDataHora } from "@/lib/format";

const ROTULO_STATUS_ROTINA: Record<SaudeSistema["rotinas"][number]["status"], string> = {
  ok: "ok",
  falhou: "falhou na última execução",
  atrasada: "atrasada — não roda há mais tempo que o esperado",
  "sem-registro": "ainda sem registro (normal logo após publicar essa tela)",
};

/**
 * Painel compacto de saúde — certificados perto de vencer, agentes sem
 * sinal e rotinas agendadas atrasadas/falhando. Pedido do usuário em
 * 2026-11-01: hoje nada disso avisa proativamente, só aparece se alguém
 * abrir a tela certa. Fica em cima do Dashboard (primeira coisa que se vê
 * ao entrar no painel) e some sozinho quando está tudo certo — sem poluir
 * a tela no dia a dia, só aparece quando tem algo pra olhar.
 */
export function PainelSaude({ organizacaoId, token }: { organizacaoId: string; token: string }) {
  const [saude, setSaude] = useState<SaudeSistema | null>(null);

  useEffect(() => {
    obterSaudeSistema(organizacaoId, token)
      .then(setSaude)
      .catch(() => setSaude(null));
  }, [organizacaoId, token]);

  if (!saude) return null;

  const rotinasComProblema = saude.rotinas.filter((r) => r.status === "falhou" || r.status === "atrasada");
  const temAlgo = saude.certificadosVencendo.length > 0 || saude.agentesOffline.length > 0 || rotinasComProblema.length > 0;

  if (!temAlgo) {
    return (
      <p className="entra-suave text-xs" style={{ color: "var(--muted)" }}>
        Saúde do sistema: tudo certo — nenhum certificado vencendo, agente offline ou rotina atrasada.
      </p>
    );
  }

  return (
    <div className="entra-suave space-y-3 rounded-lg border p-4" style={{ borderColor: "var(--vermelho, #e08a8a)" }}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em]" style={{ color: "var(--vermelho, #e08a8a)" }}>
        Saúde do sistema — precisa de atenção
      </p>

      {saude.certificadosVencendo.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: "var(--paper)" }}>
            Certificado digital vencendo em até 30 dias
          </p>
          <ul className="space-y-0.5 text-xs" style={{ color: "var(--muted)" }}>
            {saude.certificadosVencendo.map((c) => (
              <li key={c.empresaId}>
                {c.empresa} — válido até {formatarDataHora(c.validoAte)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {saude.agentesOffline.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: "var(--paper)" }}>
            Agente(s) sem sinal há mais de 10 minutos
          </p>
          <ul className="space-y-0.5 text-xs" style={{ color: "var(--muted)" }}>
            {saude.agentesOffline.map((a) => (
              <li key={a.id}>
                {a.empresa ?? a.nome} — último sinal:{" "}
                {a.ultimoHeartbeatEm ? formatarDataHora(a.ultimoHeartbeatEm) : "nunca"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {rotinasComProblema.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: "var(--paper)" }}>
            Rotina(s) automática(s) com problema
          </p>
          <ul className="space-y-0.5 text-xs" style={{ color: "var(--muted)" }}>
            {rotinasComProblema.map((r) => (
              <li key={r.nome}>
                {r.rotulo} — {ROTULO_STATUS_ROTINA[r.status]}
                {r.executadoEm ? ` (última vez: ${formatarDataHora(r.executadoEm)})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
