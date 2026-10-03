/// <reference path="./global.d.ts" />

const INTERVALO_ATUALIZACAO_MS = 3000;
const OFFLINE_APOS_MS = 3 * 60_000; // sem heartbeat ok por mais que isso, considera offline

function formatarDataHora(iso: string | null): string {
  if (!iso) return "—";
  const data = new Date(iso);
  return data.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function texto(id: string, valor: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = valor;
}

const ROTULO_STATUS: Record<string, string> = {
  CNPJ_NAO_AUTORIZADO: "CNPJ fora do escopo autorizado",
  INVALIDO: "Arquivo não reconhecido como NF-e/NFC-e/CT-e",
  IGNORADO: "Ignorado",
  ERRO_REDE: "Falha ao enviar",
};

function montarListaRecusas(recusas: EventoAgenteStatus[]): void {
  const lista = document.getElementById("lista-recusas") as HTMLUListElement;
  const vazio = document.getElementById("vazio-recusas") as HTMLDivElement;
  lista.innerHTML = "";
  if (recusas.length === 0) {
    vazio.style.display = "block";
    return;
  }
  vazio.style.display = "none";
  for (const evento of recusas.slice(0, 12)) {
    const item = document.createElement("li");
    const nomeArquivo = evento.arquivo ?? "—";
    item.innerHTML = `<span class="arq">${nomeArquivo}</span><span class="detalhe">${
      ROTULO_STATUS[evento.status] ?? evento.status
    }${evento.detalhe ? " — " + evento.detalhe : ""} · ${formatarDataHora(evento.em)}</span>`;
    lista.appendChild(item);
  }
}

async function atualizar(): Promise<void> {
  const estado = await window.agenteApi.obterStatus();

  const online = Boolean(
    estado.ultimoHeartbeatOkEm && Date.now() - new Date(estado.ultimoHeartbeatOkEm).getTime() < OFFLINE_APOS_MS
  );
  const selo = document.getElementById("selo-status") as HTMLDivElement;
  selo.className = `selo ${online ? "online" : "offline"}`;
  texto("selo-texto", online ? "Online" : "Offline");

  texto("v-aceitos", String(estado.contadores.aceitos));
  texto("v-fila", String(estado.filaPendente));

  texto("i-versao", estado.versao || "—");
  texto("i-pasta", estado.pastas[0] ?? "—");
  texto("i-iniciado", formatarDataHora(estado.iniciadoEm));
  texto("i-ultima-nota", formatarDataHora(estado.ultimaNotaAceitaEm));
  texto("i-heartbeat", formatarDataHora(estado.ultimoHeartbeatOkEm));

  montarListaRecusas(estado.recusas);

  texto("rodape-erro", estado.ultimoErro ? `Último erro: ${estado.ultimoErro.mensagem}` : "");
}

void atualizar();
setInterval(() => void atualizar(), INTERVALO_ATUALIZACAO_MS);
