/**
 * Página de status do agente, servida só neste PC (127.0.0.1) — nada de
 * Electron/janela própria: o navegador que o cliente já tem abre a página,
 * e enquanto ninguém abre, o único custo é um servidor HTTP parado.
 *
 * Segurança: só escuta em 127.0.0.1 (não é acessível pela rede) e recusa
 * requisições cujo Host não seja local (defesa contra DNS rebinding, onde
 * um site qualquer faria o navegador do cliente falar com esta porta).
 * Não expõe o token nem nenhum dado além do que já está na tela.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { PASTA_CONFIG } from "./config";
import { estadoCompleto } from "./telemetria";

const PORTA_INICIAL = 47821;
const TENTATIVAS_DE_PORTA = 10;
const ARQUIVO_PORTA = path.join(PASTA_CONFIG, "painel.porta");

const PAGINA_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agente Fiscal</title>
<style>
  :root { color-scheme: dark; --bg:#0b0d10; --card:#14181d; --borda:#232a32; --texto:#e9edf1; --mudo:#8b96a3; --ok:#4ade80; --aviso:#fbbf24; --erro:#f87171; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--texto); font:15px/1.5 system-ui,Segoe UI,Roboto,sans-serif; }
  main { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
  h1 { font-size: 1.25rem; margin: 0 0 .25rem; }
  .sub { color: var(--mudo); font-size: .85rem; }
  .status { display:flex; align-items:center; gap:.6rem; margin: 1.25rem 0; padding: 1rem 1.25rem; background:var(--card); border:1px solid var(--borda); border-radius:.75rem; }
  .ponto { width:.85rem; height:.85rem; border-radius:50%; background:var(--mudo); flex:none; }
  .ponto.ok { background:var(--ok); box-shadow:0 0 0 0 rgba(74,222,128,.6); animation:pulso 2s infinite; }
  .ponto.aviso { background:var(--aviso); } .ponto.erro { background:var(--erro); }
  @keyframes pulso { 70% { box-shadow:0 0 0 .55rem rgba(74,222,128,0); } 100% { box-shadow:0 0 0 0 rgba(74,222,128,0); } }
  .status strong { font-size:1.05rem; }
  .grade { display:grid; grid-template-columns:repeat(auto-fit,minmax(9rem,1fr)); gap:.75rem; margin-bottom:1.25rem; }
  .cartao { background:var(--card); border:1px solid var(--borda); border-radius:.75rem; padding:.9rem 1rem; }
  .cartao .n { font-size:1.6rem; font-weight:600; } .cartao .r { color:var(--mudo); font-size:.8rem; text-transform:uppercase; letter-spacing:.06em; }
  h2 { font-size:.8rem; text-transform:uppercase; letter-spacing:.1em; color:var(--mudo); margin:1.5rem 0 .5rem; font-weight:500; }
  table { width:100%; border-collapse:collapse; background:var(--card); border:1px solid var(--borda); border-radius:.75rem; overflow:hidden; font-size:.85rem; }
  th,td { text-align:left; padding:.5rem .75rem; border-top:1px solid var(--borda); word-break:break-all; }
  th { color:var(--mudo); font-weight:500; border-top:0; }
  .tag { display:inline-block; padding:.05rem .5rem; border-radius:999px; font-size:.75rem; border:1px solid var(--borda); }
  .tag.ACEITO { color:var(--ok); border-color:var(--ok); } .tag.DUPLICADO { color:var(--mudo); }
  .tag.INVALIDO,.tag.CNPJ_NAO_AUTORIZADO,.tag.ERRO_REDE { color:var(--erro); border-color:var(--erro); } .tag.IGNORADO { color:var(--aviso); border-color:var(--aviso); }
  .vazio { color:var(--mudo); padding:1rem; text-align:center; }
  .rodape { color:var(--mudo); font-size:.8rem; margin-top:1.5rem; word-break:break-all; }
</style>
</head>
<body>
<main>
  <h1>Agente Fiscal</h1>
  <div class="sub" id="versao">carregando…</div>

  <div class="status"><span class="ponto" id="ponto"></span><div><strong id="titulo">Conectando…</strong><div class="sub" id="detalhe"></div></div></div>

  <div class="grade">
    <div class="cartao"><div class="n" id="c-aceitos">–</div><div class="r">Enviadas com sucesso</div></div>
    <div class="cartao"><div class="n" id="c-duplicados">–</div><div class="r">Já existiam</div></div>
    <div class="cartao"><div class="n" id="c-recusados">–</div><div class="r">Recusadas</div></div>
    <div class="cartao"><div class="n" id="c-fila">–</div><div class="r">Na fila</div></div>
  </div>

  <div class="sub" id="varredura"></div>
  <div class="sub" id="pastas"></div>

  <h2>Recusadas / ignoradas (precisam de atenção)</h2>
  <table id="t-recusas"></table>

  <h2>Últimas notas processadas</h2>
  <table id="t-eventos"></table>

  <div class="rodape" id="log"></div>
</main>
<script>
const rotulos = { ACEITO:'Enviada', DUPLICADO:'Já existia', CNPJ_NAO_AUTORIZADO:'CNPJ não autorizado', INVALIDO:'Inválida', IGNORADO:'Não é nota fiscal', ERRO_REDE:'Erro de conexão' };
const $ = (id) => document.getElementById(id);
function ha(iso) {
  if (!iso) return 'nunca';
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 10) return 'agora mesmo';
  if (s < 60) return 'há ' + s + ' s';
  if (s < 3600) return 'há ' + Math.round(s/60) + ' min';
  if (s < 86400) return 'há ' + Math.round(s/3600) + ' h';
  return new Date(iso).toLocaleString('pt-BR');
}
function preencher(tabela, linhas, vazio) {
  tabela.replaceChildren();
  if (!linhas.length) { const tr = tabela.insertRow(); const td = tr.insertCell(); td.className='vazio'; td.textContent = vazio; return; }
  const cab = tabela.insertRow(); ['Quando','Situação','Arquivo'].forEach(t => { const th = document.createElement('th'); th.textContent = t; cab.appendChild(th); });
  for (const e of linhas) {
    const tr = tabela.insertRow();
    tr.insertCell().textContent = ha(e.em);
    const st = tr.insertCell(); const tag = document.createElement('span'); tag.className = 'tag ' + e.status; tag.textContent = rotulos[e.status] || e.status; st.appendChild(tag);
    tr.insertCell().textContent = (e.arquivo || '') + (e.detalhe ? ' — ' + e.detalhe : '');
  }
}
async function atualizar() {
  try {
    const r = await fetch('/estado.json', { cache: 'no-store' });
    const e = await r.json();
    $('versao').textContent = 'Versão ' + e.versao + ' · rodando desde ' + new Date(e.iniciadoEm).toLocaleString('pt-BR');
    let cor = 'ok', titulo = 'Funcionando', detalhe = 'Última nota enviada: ' + ha(e.ultimaNotaAceitaEm) + ' · Conexão com o servidor: ok';
    if (e.ultimoErro) { cor = 'erro'; titulo = 'Sem conexão com o servidor'; detalhe = e.ultimoErro.mensagem + ' (' + ha(e.ultimoErro.em) + ') — as notas ficam guardadas e serão enviadas quando voltar.'; }
    else if (!e.varreduraConcluida) { cor = 'aviso'; titulo = 'Lendo a pasta pela primeira vez…'; detalhe = e.arquivosNaVarredura + ' arquivo(s) vistos até agora. Pode levar alguns minutos se a pasta for grande.'; }
    else if (e.contadores.recusados > 0) { cor = 'aviso'; titulo = 'Funcionando — algumas notas foram recusadas'; }
    $('ponto').className = 'ponto ' + cor; $('titulo').textContent = titulo; $('detalhe').textContent = detalhe;
    $('c-aceitos').textContent = e.contadores.aceitos; $('c-duplicados').textContent = e.contadores.duplicados;
    $('c-recusados').textContent = e.contadores.recusados + e.contadores.ignorados; $('c-fila').textContent = e.filaPendente;
    $('varredura').textContent = 'Varredura inicial: ' + (e.varreduraConcluida ? 'concluída (' + e.arquivosNaVarredura + ' arquivos)' : 'em andamento');
    $('pastas').textContent = 'Pasta(s) monitorada(s): ' + e.pastas.join(' | ');
    preencher($('t-recusas'), e.recusas, 'Nenhuma nota recusada. Tudo certo por aqui.');
    preencher($('t-eventos'), e.eventos.slice(0, 40), 'Nenhuma nota processada desde que o agente iniciou.');
    $('log').textContent = 'Registro completo (para suporte): ' + e.arquivoLog;
  } catch (err) {
    $('ponto').className = 'ponto erro'; $('titulo').textContent = 'O agente não está respondendo'; $('detalhe').textContent = 'Feche esta página e abra o atalho de novo. Se continuar, chame o suporte.';
  }
}
atualizar(); setInterval(atualizar, 3000);
</script>
</body>
</html>`;

function hostEhLocal(host: string | undefined): boolean {
  if (!host) return false;
  const nome = host.split(":")[0]!.toLowerCase();
  return nome === "127.0.0.1" || nome === "localhost";
}

function criarServidor(): http.Server {
  return http.createServer((req, res) => {
    if (!hostEhLocal(req.headers.host)) {
      res.writeHead(403).end("Acesso negado");
      return;
    }
    if (req.url === "/estado.json") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
      res.end(JSON.stringify(estadoCompleto()));
      return;
    }
    if (req.url === "/" || req.url === "/index.html") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      res.end(PAGINA_HTML);
      return;
    }
    res.writeHead(404).end("Não encontrado");
  });
}

/** Sobe o servidor local (tenta portas seguidas se a inicial estiver ocupada) e devolve a porta usada. */
export function iniciarPainelLocal(): Promise<number | null> {
  return new Promise((resolve) => {
    let porta = PORTA_INICIAL;

    const tentar = () => {
      const servidor = criarServidor();
      servidor.once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE" && porta < PORTA_INICIAL + TENTATIVAS_DE_PORTA - 1) {
          porta += 1;
          tentar();
          return;
        }
        console.error(`[painel] não consegui subir a página local: ${err.message}`);
        resolve(null);
      });
      servidor.listen(porta, "127.0.0.1", () => {
        servidor.unref();
        try {
          fs.mkdirSync(PASTA_CONFIG, { recursive: true });
          fs.writeFileSync(ARQUIVO_PORTA, String(porta), "utf8");
        } catch {
          // sem o arquivo só perde a abertura automática do painel
        }
        console.log(`[painel] página de status em http://127.0.0.1:${porta}/`);
        resolve(porta);
      });
    };

    tentar();
  });
}

export function lerPortaDoPainel(): number | null {
  try {
    const porta = Number(fs.readFileSync(ARQUIVO_PORTA, "utf8").trim());
    return porta > 0 ? porta : null;
  } catch {
    return null;
  }
}

export function abrirPainelNoNavegador(porta: number): void {
  if (process.platform !== "win32") return;
  // "start" é comando interno do cmd; o "" é o título (obrigatório quando o alvo é uma URL entre aspas).
  execFile("cmd.exe", ["/c", "start", "", `http://127.0.0.1:${porta}/`], { windowsHide: true }, () => undefined);
}

/** Cria um atalho "Painel do Agente Fiscal" na área de trabalho (só Windows; não faz nada se não achar a pasta). */
export function criarAtalhoNaAreaDeTrabalho(porta: number): void {
  if (process.platform !== "win32") return;
  const perfil = process.env.USERPROFILE;
  if (!perfil) return;
  const candidatas = [path.join(perfil, "Desktop"), path.join(perfil, "OneDrive", "Desktop"), path.join(perfil, "Área de Trabalho")];
  const desktop = candidatas.find((p) => fs.existsSync(p));
  if (!desktop) return;
  try {
    fs.writeFileSync(
      path.join(desktop, "Painel do Agente Fiscal.url"),
      `[InternetShortcut]\r\nURL=http://127.0.0.1:${porta}/\r\n`,
      "utf8"
    );
  } catch (err) {
    console.error(`[painel] não consegui criar o atalho: ${err}`);
  }
}
