import fs from "node:fs";
import AdmZip from "adm-zip";
import { extrairDadosBasicos, validarDigitoVerificadorChave } from "@afe/shared";
import { carregarConfig, salvarConfig, type ConfigAgente } from "./config";
import { enviarLoteDocumentos, type ItemDocumentoUpload } from "./api-client";
import { notificar } from "./notify";

const TAMANHO_MAXIMO_LOTE = 50;

interface ItemPendente extends ItemDocumentoUpload {
  chaveAcesso: string;
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

  function jaProcessado(chaveAcesso: string): boolean {
    const estado = config.chavesEnviadas[chaveAcesso];
    return estado?.status === "ACEITO" || estado?.status === "DUPLICADO";
  }

  function registrarResultado(chaveAcesso: string, status: ConfigAgente["chavesEnviadas"][string]["status"]) {
    config.chavesEnviadas[chaveAcesso] = { status, enviadoEm: new Date().toISOString() };
  }

  function processarConteudoXml(nomeArquivoOriginal: string, conteudo: string): void {
    const dados = extrairDadosBasicos(conteudo);
    if (!dados || !validarDigitoVerificadorChave(dados.chaveAcesso)) {
      // Não é um XML fiscal reconhecível (ou está corrompido/incompleto) —
      // não registra em chavesEnviadas, então se o arquivo mudar depois
      // (ex: terminou de ser escrito) o watcher tenta de novo naturalmente.
      console.warn(`[upload] ignorado (não reconhecido como NF-e/NFC-e/CT-e válido): ${nomeArquivoOriginal}`);
      return;
    }

    if (jaProcessado(dados.chaveAcesso)) return;

    pendentes.push({
      nomeArquivoOriginal,
      xmlBase64: Buffer.from(conteudo, "utf8").toString("base64"),
      chaveAcesso: dados.chaveAcesso,
    });
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

    let conteudo: string;
    try {
      conteudo = fs.readFileSync(caminhoArquivo, "utf8");
    } catch (err) {
      console.error(`[upload] não consegui ler ${caminhoArquivo}: ${err}`);
      return;
    }

    processarConteudoXml(caminhoArquivo, conteudo);
  }

  async function flush(): Promise<void> {
    if (pendentes.length === 0) return;

    const lote = pendentes.slice(0, TAMANHO_MAXIMO_LOTE);
    pendentes = pendentes.slice(TAMANHO_MAXIMO_LOTE);

    try {
      const resultados = await enviarLoteDocumentos(token, lote);
      let aceitos = 0;
      for (const resultado of resultados) {
        if (resultado.chaveAcesso) {
          registrarResultado(resultado.chaveAcesso, resultado.status);
        }
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
      if (aceitos > 0) {
        notificar("Agente Fiscal", `${aceitos} nota(s) de saída enviada(s).`);
      }
    } catch (err) {
      // Falha de rede/servidor — devolve os itens pra fila, tenta de novo
      // no próximo ciclo. Nada foi marcado em chavesEnviadas, então é
      // seguro reprocessar.
      pendentes = [...lote, ...pendentes];
      console.error(`[upload] falha ao enviar lote (${lote.length} item(ns)), tentando de novo depois: ${err}`);
    }
  }

  function tamanhoFila(): number {
    return pendentes.length;
  }

  return { enfileirar, flush, tamanhoFila };
}
