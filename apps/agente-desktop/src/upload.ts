import fs from "node:fs";
import AdmZip from "adm-zip";
import { extrairDadosBasicos, validarDigitoVerificadorChave } from "@afe/shared";
import { carregarConfig, salvarConfig, type ConfigAgente } from "./config";
import { enviarLoteDocumentos, type ItemDocumentoUpload } from "./api-client";
import { notificar } from "./notify";
import { contarLido, registrarEnvioConcluido, registrarErroDeRede, registrarEvento } from "./telemetria";

const TAMANHO_MAXIMO_LOTE = 50;
const INTERVALO_MIN_AVISO_MS = 2 * 60_000;

interface ItemPendente extends ItemDocumentoUpload {
  chaveAcesso: string;
  completo: boolean;
}

/**
 * Fila de envio: recebe caminhos de arquivo do watcher, classifica cada um
 * localmente (mesma lógica de @afe/shared que o servidor usa) e só then
 * enfileira pra envio em lote. Arquivos que já foram enviados com sucesso
 * (ou que já deram erro definitivo) numa execução anterior são descartados
 * sem gastar rede — é o que impede reenviar o histórico inteiro a cada
 * reinício do PC.
 */
export function criarFilaDeEnvio(token: string) {
  const config = carregarConfig();
  let pendentes: ItemPendente[] = [];
  let aceitosNaoAvisados = 0;
  let ultimoAvisoEm = 0;
  let configSujo = false;

  function jaProcessado(chaveAcesso: string, completoAgora: boolean): boolean {
    const estado = config.chavesEnviadas[chaveAcesso];
    if (!estado || (estado.status !== "ACEITO" && estado.status !== "DUPLICADO")) return false;
    // Já foi enviado completo (ou é registro antigo, tratado como
    // completo) — não precisa reenviar. Só reenvia se da vez passada
    // faltou CFOP/valor E dessa vez o XML já tem essa informação (pode
    // ter aparecido uma versão mais completa na pasta monitorada).
    if (estado.completo !== false) return true;
    return !completoAgora;
  }

  function registrarResultado(
    chaveAcesso: string,
    status: ConfigAgente["chavesEnviadas"][string]["status"],
    completo: boolean
  ) {
    config.chavesEnviadas[chaveAcesso] = { status, enviadoEm: new Date().toISOString(), completo };
  }

  /** Corte (ISO) da empresa dona do CNPJ, se o escopo mais recente souber dele. */
  function obterCorte(cnpjEmitente: string): string | null {
    return config.escopoEmpresas.find((e) => e.cnpj === cnpjEmitente)?.dataInicioMonitoramento ?? null;
  }

  /** Menor corte entre todas as empresas autorizadas — usado só pra saber se um cache de "antigo" ainda vale (corte não voltou pra trás). */
  function corteMinimoAtual(): string | null {
    const cortes = config.escopoEmpresas.map((e) => e.dataInicioMonitoramento).filter((d): d is string => Boolean(d));
    return cortes.length > 0 ? (cortes.sort()[0] ?? null) : null;
  }

  /** Devolve o corte (ISO) usado quando o XML é antigo demais, ou undefined quando foi enfileirado/descartado por outro motivo. */
  function processarConteudoXml(nomeArquivoOriginal: string, conteudo: string): string | undefined {
    const dados = extrairDadosBasicos(conteudo);
    if (!dados || !validarDigitoVerificadorChave(dados.chaveAcesso)) {
      // Não é um XML fiscal reconhecível (ou está corrompido/incompleto) —
      // não registra em chavesEnviadas, então se o arquivo mudar depois
      // (ex: terminou de ser escrito) o watcher tenta de novo naturalmente.
      console.warn(`[upload] ignorado (não reconhecido como NF-e/NFC-e/CT-e válido): ${nomeArquivoOriginal}`);
      registrarEvento({
        arquivo: nomeArquivoOriginal,
        status: "IGNORADO",
        detalhe: "não é uma NF-e/NFC-e/CT-e válida (XML de outro tipo, incompleto ou com chave inválida)",
      });
      return undefined;
    }

    const completoAgora = Boolean(dados.cfop && dados.valorTotal != null);
    if (jaProcessado(dados.chaveAcesso, completoAgora)) return undefined;

    const corte = obterCorte(dados.cnpjEmitente);
    if (corte && dados.dataEmissao && dados.dataEmissao < new Date(corte)) {
      registrarEvento({
        arquivo: nomeArquivoOriginal,
        status: "FORA_DO_PERIODO",
        detalhe: `emitida antes de ${corte.slice(0, 10)} (início de captura dessa empresa)`,
      });
      return corte;
    }

    contarLido();
    pendentes.push({
      nomeArquivoOriginal,
      xmlBase64: Buffer.from(conteudo, "utf8").toString("base64"),
      chaveAcesso: dados.chaveAcesso,
      completo: completoAgora,
    });
    return undefined;
  }

  /** Extrai o .zip em memória e classifica cada .xml de dentro como se fosse um arquivo solto. */
  function enfileirarZip(caminhoZip: string): void {
    let entradas: ReturnType<AdmZip["getEntries"]>;
    try {
      entradas = new AdmZip(caminhoZip).getEntries();
    } catch (err) {
      console.error(`[upload] não consegui abrir o zip ${caminhoZip}: ${err}`);
      return;
    }

    for (const entrada of entradas) {
      if (entrada.isDirectory || !entrada.entryName.toLowerCase().endsWith(".xml")) continue;
      let conteudo: string;
      try {
        conteudo = entrada.getData().toString("utf8");
      } catch (err) {
        console.error(`[upload] não consegui ler ${entrada.entryName} dentro de ${caminhoZip}: ${err}`);
        continue;
      }
      processarConteudoXml(`${caminhoZip} > ${entrada.entryName}`, conteudo);
    }
  }

  function enfileirar(caminhoArquivo: string): void {
    if (caminhoArquivo.toLowerCase().endsWith(".zip")) {
      enfileirarZip(caminhoArquivo);
      return;
    }

    let mtimeMs: number;
    try {
      mtimeMs = fs.statSync(caminhoArquivo).mtimeMs;
    } catch {
      return; // arquivo sumiu entre o evento do watcher e agora
    }

    // Já avaliado como "antigo demais" numa varredura anterior, com o
    // arquivo exatamente igual (mesmo mtime) e sem o corte ter "voltado"
    // pra uma data mais cedo — pula sem gastar leitura de disco nenhuma.
    // É isso que mantém reinícios rápidos mesmo com anos de XML na pasta.
    const cache = config.arquivosAntigosIgnorados[caminhoArquivo];
    const corteMin = corteMinimoAtual();
    if (cache && cache.mtimeMs === mtimeMs && (!corteMin || cache.cortadoEm <= corteMin)) {
      return;
    }

    let conteudo: string;
    try {
      conteudo = fs.readFileSync(caminhoArquivo, "utf8");
    } catch (err) {
      console.error(`[upload] não consegui ler ${caminhoArquivo}: ${err}`);
      return;
    }

    const corteUsado = processarConteudoXml(caminhoArquivo, conteudo);
    if (corteUsado) {
      config.arquivosAntigosIgnorados[caminhoArquivo] = { mtimeMs, cortadoEm: corteUsado };
      configSujo = true;
    } else if (config.arquivosAntigosIgnorados[caminhoArquivo]) {
      delete config.arquivosAntigosIgnorados[caminhoArquivo];
      configSujo = true;
    }
  }

  async function flush(): Promise<void> {
    if (pendentes.length === 0) {
      // Nada pra enviar, mas pode ter arquivo novo marcado como "antigo
      // demais" (arquivosAntigosIgnorados) — precisa persistir mesmo sem
      // upload, senão o cache que evita reler o histórico se perde a cada
      // reinício e a varredura volta a ficar lenta.
      if (configSujo) {
        salvarConfig(config);
        configSujo = false;
      }
      return;
    }

    const lote = pendentes.slice(0, TAMANHO_MAXIMO_LOTE);
    pendentes = pendentes.slice(TAMANHO_MAXIMO_LOTE);

    try {
      const completoPorChave = new Map(lote.map((item) => [item.chaveAcesso, item.completo]));
      const resultados = await enviarLoteDocumentos(token, lote);
      let aceitos = 0;
      for (const resultado of resultados) {
        if (resultado.chaveAcesso) {
          registrarResultado(resultado.chaveAcesso, resultado.status, completoPorChave.get(resultado.chaveAcesso) ?? true);
        }
        registrarEvento({
          arquivo: resultado.nomeArquivoOriginal,
          status: resultado.status,
          detalhe: resultado.motivo,
        });
        if (resultado.status === "ACEITO") {
          aceitos += 1;
          console.log(`[upload] aceito: ${resultado.nomeArquivoOriginal}`);
        } else if (resultado.status === "CNPJ_NAO_AUTORIZADO") {
          console.warn(`[upload] CNPJ fora do escopo: ${resultado.nomeArquivoOriginal} — ${resultado.motivo}`);
        } else if (resultado.status === "INVALIDO") {
          console.warn(`[upload] inválido: ${resultado.nomeArquivoOriginal} — ${resultado.motivo}`);
        }
      }
      salvarConfig(config);
      configSujo = false;
      registrarEnvioConcluido();
      // Agrupa os avisos: numa varredura grande seriam dezenas de balões seguidos.
      aceitosNaoAvisados += aceitos;
      if (aceitosNaoAvisados > 0 && Date.now() - ultimoAvisoEm > INTERVALO_MIN_AVISO_MS) {
        notificar("Agente Fiscal", `${aceitosNaoAvisados} nota(s) de saída enviada(s).`);
        aceitosNaoAvisados = 0;
        ultimoAvisoEm = Date.now();
      }
    } catch (err) {
      // Falha de rede/servidor — devolve os itens pra fila, tenta de novo
      // no próximo ciclo. Nada foi marcado em chavesEnviadas, então é
      // seguro reprocessar.
      pendentes = [...lote, ...pendentes];
      registrarErroDeRede(err instanceof Error ? err.message : String(err));
      console.error(`[upload] falha ao enviar lote (${lote.length} item(ns)), tentando de novo depois: ${err}`);
    }
  }

  function tamanhoFila(): number {
    return pendentes.length;
  }

  return { enfileirar, flush, tamanhoFila };
}
