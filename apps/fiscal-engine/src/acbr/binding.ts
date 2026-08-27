import fs from "node:fs";
import koffi from "koffi";
import { config } from "../config";

/**
 * Binding koffi para a ACBrLibNFe — em produção usa ACBrNFe64.dll (Windows
 * Server nativo, sem Docker/WSL2); em Linux (se algum dia necessário) usa
 * libacbrnfe64.so. Ver config.ts para a escolha do arquivo por plataforma.
 *
 * `distribuicaoDFePorUltNSU` tem assinatura confirmada e validada em produção
 * em outro projeto seu (Linux) que já usa exatamente esta chamada com sucesso
 * contra a SEFAZ real. A API C da ACBrLib é a mesma nas duas plataformas
 * (mesmos nomes de função, mesma convenção de chamada cdecl documentada pelo
 * projeto ACBr), mas a build Windows especificamente NÃO foi exercitada ainda
 * neste código — revalide contra o manual da ACBrLib (`ACBrLib - Manual de
 * programação.pdf`, distribuído junto ao SDK) e teste em homologação antes de
 * confiar em produção. Se o retorno vier sempre zerado/corrompido, o
 * suspeito nº 1 é a convenção de chamada (cdecl vs stdcall) — koffi assume
 * cdecl por padrão nas assinaturas abaixo.
 */
export interface AcbrFunctions {
  inicializar: (arqConfig: string, chaveCrypt: string) => number;
  finalizar: () => number;
  ultimoRetorno: () => string;
  configGravarValor: (secao: string, chave: string, valor: string) => number;
  distribuicaoDFePorUltNSU: (
    codigoUfAutor: number,
    cnpj: string,
    ultNsu: string
  ) => { retorno: number; resposta: string };
  // ⚠️ assinatura a confirmar antes do primeiro uso — ver comentário acima.
  statusServico: () => { retorno: number; resposta: string };
  // ⚠️ Primeira implementação de evento neste projeto — não existe
  // precedente validado (nem aqui, nem no outro projeto seu) para
  // NFE_EnviarEvento. A assinatura abaixo segue o padrão documentado pela
  // ACBrLib (idLote + caminho de um INI descrevendo o evento), mas
  // PRECISA ser confirmada contra o manual antes de confiar em produção.
  enviarEvento: (idLote: number, arquivoIniEvento: string) => {
    retorno: number;
    resposta: string;
  };
}

const RESPONSE_BUFFER_SIZE = 1024 * 1024; // 1 MB — suficiente para lotes de DFe

let cached: AcbrFunctions | null = null;

export function loadAcbr(): AcbrFunctions {
  if (cached) return cached;

  if (!fs.existsSync(config.libPath)) {
    throw new Error(
      `[fiscal-engine] Biblioteca ACBr não encontrada em ${config.libPath}. ` +
        `Veja apps/fiscal-engine/lib/README.md para instruções de instalação.`
    );
  }

  const lib = koffi.load(config.libPath);

  const fn = {
    NFE_Inicializar: lib.func(
      "int NFE_Inicializar(const char *eArqConfig, const char *eChaveCrypt)"
    ),
    NFE_Finalizar: lib.func("int NFE_Finalizar()"),
    NFE_UltimoRetorno: lib.func(
      "int NFE_UltimoRetorno(char *sMensagem, int32_t *esTamanho)"
    ),
    NFE_ConfigGravarValor: lib.func(
      "int NFE_ConfigGravarValor(const char *eSessao, const char *eChave, const char *sValor)"
    ),
    NFE_DistribuicaoDFePorUltNSU: lib.func(
      "int NFE_DistribuicaoDFePorUltNSU(int32_t AcUFAutor, const char *eCNPJCPF, " +
        "const char *eultNSU, char *sResposta, int32_t *esTamanho)"
    ),
    NFE_StatusServico: lib.func(
      "int NFE_StatusServico(char *sResposta, int32_t *esTamanho)"
    ),
    NFE_EnviarEvento: lib.func(
      "int NFE_EnviarEvento(int32_t aIdLote, const char *eArquivoOuXML, " +
        "char *sResposta, int32_t *esTamanho)"
    ),
  };

  function readLastReturn(): string {
    const buf = Buffer.alloc(2048);
    const len = [2048];
    fn.NFE_UltimoRetorno(buf, len);
    return buf.toString("utf8").replace(/\0/g, "").trim();
  }

  function callWithResponseBuffer(
    invoke: (buf: Buffer, len: number[]) => number
  ): { retorno: number; resposta: string } {
    const buf = Buffer.alloc(RESPONSE_BUFFER_SIZE);
    const len = [RESPONSE_BUFFER_SIZE];
    const retorno = invoke(buf, len);

    const writtenLen =
      len[0]! > 0 && len[0]! < RESPONSE_BUFFER_SIZE ? len[0]! : buf.indexOf(0);
    const resposta = buf
      .toString("utf8", 0, writtenLen < 0 ? RESPONSE_BUFFER_SIZE : writtenLen)
      .trim();

    return { retorno, resposta };
  }

  cached = {
    inicializar: (arqConfig, chaveCrypt) => fn.NFE_Inicializar(arqConfig, chaveCrypt),
    finalizar: () => fn.NFE_Finalizar(),
    ultimoRetorno: readLastReturn,
    configGravarValor: (secao, chave, valor) =>
      fn.NFE_ConfigGravarValor(secao, chave, valor),
    distribuicaoDFePorUltNSU: (codigoUfAutor, cnpj, ultNsu) =>
      callWithResponseBuffer((buf, len) =>
        fn.NFE_DistribuicaoDFePorUltNSU(codigoUfAutor, cnpj, ultNsu, buf, len)
      ),
    statusServico: () =>
      callWithResponseBuffer((buf, len) => fn.NFE_StatusServico(buf, len)),
    enviarEvento: (idLote, arquivoIniEvento) =>
      callWithResponseBuffer((buf, len) =>
        fn.NFE_EnviarEvento(idLote, arquivoIniEvento, buf, len)
      ),
  };

  return cached;
}
