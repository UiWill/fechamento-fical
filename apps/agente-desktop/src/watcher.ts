import chokidar from "chokidar";

/**
 * Observa as pastas configuradas recursivamente, avisando só sobre
 * arquivos .xml. `awaitWriteFinish` é essencial: sem isso o agente pode
 * ler um XML pela metade enquanto o PDV/ERP do cliente ainda está
 * gravando o arquivo. `ignoreInitial: false` (padrão do chokidar) faz a
 * primeira execução varrer todo o histórico já existente na pasta — em
 * reinícios seguintes o mesmo evento dispara de novo pra cada arquivo, mas
 * a fila de envio (upload.ts) descarta na hora o que já foi processado.
 */
export function observarPastas(pastas: string[], aoEncontrarArquivo: (caminho: string) => void): void {
  const watcher = chokidar.watch(pastas, {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 200,
    },
  });

  watcher.on("add", (caminho) => {
    if (caminho.toLowerCase().endsWith(".xml")) {
      aoEncontrarArquivo(caminho);
    }
  });

  watcher.on("error", (erro) => {
    console.error(`[watcher] erro: ${erro}`);
  });
}
