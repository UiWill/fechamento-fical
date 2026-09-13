import fs from "node:fs";
import { extrairDadosBasicos, validarDigitoVerificadorChave } from "@afe/shared";
import { carregarConfig, salvarConfig, type ConfigAgente } from "./config";
import { enviarLoteDocumentos, type ItemDocumentoUpload } from "./api-client";

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

  function enfileirar(caminhoArquivo: string): void {
    let conteudo: string;
    try {
      conteudo = fs.readFileSync(caminhoArquivo, "utf8");
    } catch (err) {
      console.error(`[upload] não consegui ler ${caminhoArquivo}: ${err}`);
      return;
    }

    const dados = extrairDadosBasicos(conteudo);
    if (!dados || !validarDigitoVerificadorChave(dados.chaveAcesso)) {
      // Não é um XML fiscal reconhecível (ou está corrompido/incompleto) —
      // não registra em chavesEnviadas, então se o arquivo mudar depois
      // (ex: terminou de ser escrito) o watcher tenta de novo naturalmente.
      console.warn(`[upload] ignorado (não reconhecido como NF-e/NFC-e/CT-e válido): ${caminhoArquivo}`);
      return;
    }

    if (jaProcessado(dados.chaveAcesso)) return;

    pendentes.push({
      nomeArquivoOriginal: caminhoArquivo,
      xmlBase64: Buffer.from(conteudo, "utf8").toString("base64"),
      chaveAcesso: dados.chaveAcesso,
    });
  }

  async function flush(): Promise<void> {
    if (pendentes.length === 0) return;

    const lote = pendentes.slice(0, TAMANHO_MAXIMO_LOTE);
    pendentes = pendentes.slice(TAMANHO_MAXIMO_LOTE);

    try {
      const resultados = await enviarLoteDocumentos(token, lote);
      for (const resultado of resultados) {
        if (resultado.chaveAcesso) {
          registrarResultado(resultado.chaveAcesso, resultado.status);
        }
        if (resultado.status === "ACEITO") {
          console.log(`[upload] aceito: ${resultado.nomeArquivoOriginal}`);
        } else if (resultado.status === "CNPJ_NAO_AUTORIZADO") {
          console.warn(`[upload] CNPJ fora do escopo: ${resultado.nomeArquivoOriginal} — ${resultado.motivo}`);
        } else if (resultado.status === "INVALIDO") {
          console.warn(`[upload] inválido: ${resultado.nomeArquivoOriginal} — ${resultado.motivo}`);
        }
      }
      salvarConfig(config);
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
