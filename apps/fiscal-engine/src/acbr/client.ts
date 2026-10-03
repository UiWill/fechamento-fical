import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { loadAcbr } from "./binding";
import { parseIniResponse, readField, mergedRoot, SECAO_DOCUMENTO } from "./ini-parser";
import { siglaUf } from "./uf";
import { construirIniEvento } from "./eventos";
import { config } from "../config";
import type {
  DistribuicaoDFeInput,
  DistribuicaoDFeResultado,
  DocumentoDistribuido,
  StatusServicoInput,
  StatusServicoResultado,
  EnviarEventoInput,
  EnviarEventoResultado,
} from "./types";

/**
 * A chave de config "Ambiente" da própria ACBrLib usa convenção invertida
 * da tpAmb do XML da SEFAZ: aqui "0" = Produção e "1" = Homologação
 * (confirmado em FrmMain.java da Demo oficial:
 * `rdbHomologacao.setSelected("1".equals(ambiente))`). O resto do sistema
 * usa o padrão SEFAZ (1=Produção, 2=Homologação) — a inversão fica isolada
 * aqui, na fronteira com a lib.
 */
function ambienteAcbr(ambiente: 1 | 2): string {
  return ambiente === 1 ? "0" : "1";
}

async function writeTempIni(): Promise<string> {
  const iniPath = path.join(os.tmpdir(), `acbr-nfe-${crypto.randomUUID()}.ini`);
  const content = [
    "[NFe]",
    `PathSchemas=${config.schemasPath}`,
    "",
    "[DFe]",
    "SSLType=ssLSSLv23",
    // Sem isto, a lib cai no default cryNone — a classe-base abstrata
    // TDFeSSLCryptClass, que não implementa CarregarCertificadoDeDadosPFX
    // (erro "não implementado em: TDFeSSLCryptClass"). 1 = cryOpenSSL,
    // usando as DLLs libssl-1_1-x64/libcrypto-1_1-x64 já empacotadas.
    "SSLCryptLib=1",
    // Componente HTTP é config separada da de criptografia — sem isto fica
    // em httpNone (default) e a chamada nunca sai de fato (Erro Interno: 0,
    // Erro HTTP: 0, sem exceção). 2 = httpWinHttp, a API nativa do Windows
    // (WinHTTP/SChannel), já lida com TLS 1.2 e certificado cliente sem
    // depender de mais nenhuma DLL externa.
    "SSLHttpLib=2",
    // Assinatura de XML (usada ao enviar eventos de Manifestação) é uma
    // TERCEIRA config separada de crypto/HTTP — sem isto cai em xsNone, a
    // classe-base abstrata TDFeSSLXmlSignClass, que não implementa Assinar
    // ("Falha ao assinar o Envio de Evento... não implementado"). 4 =
    // xsLibXml2, usando libxml2/libxslt/libexslt já empacotados.
    "SSLXmlSignLib=4",
    "",
  ].join("\n");
  await fs.writeFile(iniPath, content, "utf8");
  return iniPath;
}

async function withCertificadoTemporario<T>(
  pfxBase64: string,
  run: (pfxPath: string) => Promise<T>
): Promise<T> {
  const pfxPath = path.join(os.tmpdir(), `acbr-cert-${crypto.randomUUID()}.pfx`);
  await fs.writeFile(pfxPath, Buffer.from(pfxBase64, "base64"));
  try {
    return await run(pfxPath);
  } finally {
    await fs.rm(pfxPath, { force: true });
  }
}

/**
 * Consulta NF-e/NFC-e endereçadas ao CNPJ via NFeDistribuicaoDFe.
 * Portado e generalizado de nfe_marketplace/src/nfe/acbrDistribuicao.js
 * (código validado em produção) — aqui o certificado e o NSU vêm por
 * parâmetro a cada chamada (multi-tenant, sem estado local em disco; o
 * core-api é quem persiste o último NSU por empresa).
 */
export async function distribuicaoDFePorUltNSU(
  input: DistribuicaoDFeInput
): Promise<DistribuicaoDFeResultado> {
  const acbr = loadAcbr();
  const iniPath = await writeTempIni();
  const uf = siglaUf(input.codigoUf);
  const nsuStr = input.ultimoNsu.padStart(15, "0");

  try {
    return await withCertificadoTemporario(input.certificado.pfxBase64, async (pfxPath) => {
      const retInit = acbr.inicializar(iniPath, "");
      if (retInit !== 0) {
        throw new Error(
          `NFE_Inicializar falhou (${retInit}): ${acbr.ultimoRetorno()}`
        );
      }

      try {
        acbr.configGravarValor("DFe", "ArquivoPFX", pfxPath);
        acbr.configGravarValor("DFe", "Senha", input.certificado.senha);
        acbr.configGravarValor("NFe", "Ambiente", ambienteAcbr(input.ambiente));
        acbr.configGravarValor("NFe", "UF", uf);

        const { retorno, resposta } = acbr.distribuicaoDFePorUltNSU(
          input.codigoUf,
          input.cnpj,
          nsuStr
        );

        if (retorno !== 0) {
          throw new Error(
            `NFE_DistribuicaoDFePorUltNSU falhou (${retorno}): ${acbr.ultimoRetorno()}`
          );
        }

        const parsed = parseIniResponse(resposta);
        const root = mergedRoot(parsed);

        const cStat = readField(root, "cStat", "CStat");
        const xMotivo = readField(root, "xMotivo", "XMotivo");
        const ultimoNsu = Number(
          readField(root, "UltNSU", "ultNSU", "MaxNSU") || input.ultimoNsu
        );

        // 137 = Nenhum documento localizado / 138 = Documento(s) localizado(s)
        // 656 = Rejeição por consumo indevido — a própria SEFAZ manda usar o
        // ultNSU devolvido nesta resposta nas próximas consultas, então isto
        // não é uma falha a descartar: precisa virar resultado (com cStat
        // preservado pra quem chamou saber que foi throttle) pra o NSU
        // corrigido ser persistido antes da próxima tentativa.
        if (cStat === "137" || cStat === "656") {
          return { novas: 0, ultimoNsu, cStat, xMotivo, documentos: [] };
        }

        if (cStat !== "138") {
          throw new Error(
            `SEFAZ retornou cStat=${cStat} (${xMotivo}) | seções encontradas: ${Object.keys(parsed).join(", ")}`
          );
        }

        const documentos: DocumentoDistribuido[] = Object.keys(parsed)
          .filter((key) => SECAO_DOCUMENTO.test(key))
          .sort()
          .map((key) => parsed[key]!)
          .filter((doc) => doc.NSU && (doc.XML || doc.Xml))
          .map((doc) => ({
            nsu: Number(doc.NSU),
            schema: doc.schema ?? doc.Schema ?? "",
            xml: doc.XML ?? doc.Xml ?? "",
          }));

        return { novas: documentos.length, ultimoNsu, cStat, xMotivo, documentos };
      } finally {
        acbr.finalizar();
      }
    });
  } finally {
    await fs.rm(iniPath, { force: true });
  }
}

/**
 * ⚠️ Ainda não exercitado contra a SEFAZ real neste projeto — a assinatura
 * `NFE_StatusServico` precisa ser revalidada contra o manual da ACBrLib
 * (ver comentário em binding.ts) antes de confiar neste retorno em produção.
 */
export async function statusServico(
  input: StatusServicoInput
): Promise<StatusServicoResultado> {
  const acbr = loadAcbr();
  const iniPath = await writeTempIni();
  const uf = siglaUf(input.codigoUf);

  try {
    const retInit = acbr.inicializar(iniPath, "");
    if (retInit !== 0) {
      throw new Error(`NFE_Inicializar falhou (${retInit}): ${acbr.ultimoRetorno()}`);
    }

    try {
      acbr.configGravarValor("NFe", "Ambiente", ambienteAcbr(input.ambiente));
      acbr.configGravarValor("NFe", "UF", uf);

      const { retorno, resposta } = acbr.statusServico();
      if (retorno !== 0) {
        throw new Error(`NFE_StatusServico falhou (${retorno}): ${acbr.ultimoRetorno()}`);
      }

      const parsed = parseIniResponse(resposta);
      const root = mergedRoot(parsed);

      return {
        cStat: readField(root, "cStat", "CStat"),
        xMotivo: readField(root, "xMotivo", "XMotivo"),
        tempoMedioResposta: Number(readField(root, "TMed", "tMed")) || undefined,
      };
    } finally {
      acbr.finalizar();
    }
  } finally {
    await fs.rm(iniPath, { force: true });
  }
}

/**
 * Envia um evento de Manifestação do Destinatário (Ciência, Confirmação,
 * Desconhecimento ou Operação não Realizada).
 *
 * Fluxo em duas etapas conforme a API oficial (conferido contra
 * `ACBrLibNFe/src/com/acbr/nfe/ACBrNFe.java` — ver aviso em binding.ts):
 * primeiro carrega o INI do evento na lista interna da lib
 * (`NFE_CarregarEventoINI`), só depois manda enviar o que foi carregado
 * (`NFE_EnviarEvento(idLote)`, sem conteúdo — ele não aceita o evento
 * como parâmetro direto).
 *
 * ⚠️ O layout exato das chaves dentro do INI (eventos.ts) segue os nomes
 * de campo do XML oficial da SEFAZ (chNFe, CNPJ, tpEvento, dhEvento,
 * descEvento, xJust — confirmados contra
 * nfe_marketplace/src/nfe/eventSender.js, que monta o XML cru de
 * cancelamento/CC-e), mas a forma exata como a ACBrLib espera essas
 * chaves dentro do INI (nomes de seção, prefixo tipo "detEvento.xxx")
 * ainda não foi validada contra a SEFAZ real — é o primeiro teste disso
 * neste projeto.
 */
export async function enviarEventoManifestacao(
  input: EnviarEventoInput
): Promise<EnviarEventoResultado> {
  const acbr = loadAcbr();
  const iniPathConfig = await writeTempIni();
  const uf = siglaUf(input.codigoUf);

  const iniEventoPath = path.join(
    os.tmpdir(),
    `acbr-evento-${crypto.randomUUID()}.ini`
  );
  await fs.writeFile(iniEventoPath, construirIniEvento(input), "utf8");

  try {
    return await withCertificadoTemporario(input.certificado.pfxBase64, async (pfxPath) => {
      const retInit = acbr.inicializar(iniPathConfig, "");
      if (retInit !== 0) {
        throw new Error(`NFE_Inicializar falhou (${retInit}): ${acbr.ultimoRetorno()}`);
      }

      try {
        acbr.configGravarValor("DFe", "ArquivoPFX", pfxPath);
        acbr.configGravarValor("DFe", "Senha", input.certificado.senha);
        acbr.configGravarValor("NFe", "Ambiente", ambienteAcbr(input.ambiente));
        acbr.configGravarValor("NFe", "UF", uf);

        acbr.limparListaEventos();

        const retCarregar = acbr.carregarEventoIni(iniEventoPath);
        if (retCarregar !== 0) {
          throw new Error(
            `NFE_CarregarEventoINI falhou (${retCarregar}): ${acbr.ultimoRetorno()}`
          );
        }

        const { retorno, resposta } = acbr.enviarEvento(1);
        if (retorno !== 0) {
          throw new Error(`NFE_EnviarEvento falhou (${retorno}): ${acbr.ultimoRetorno()}`);
        }

        const parsed = parseIniResponse(resposta);
        const root = mergedRoot(parsed);
        const cStatResp = readField(root, "cStat", "CStat");
        const xMotivoResp = readField(root, "xMotivo", "XMotivo");

        return {
          cStat: cStatResp,
          xMotivo:
            cStatResp === "135" || cStatResp === "136"
              ? xMotivoResp
              : `${xMotivoResp} | resposta bruta: ${resposta.slice(0, 2000)}`,
          protocolo: readField(root, "nProt", "protocolo") || undefined,
        };
      } finally {
        acbr.finalizar();
      }
    });
  } finally {
    await fs.rm(iniPathConfig, { force: true });
    await fs.rm(iniEventoPath, { force: true });
  }
}
