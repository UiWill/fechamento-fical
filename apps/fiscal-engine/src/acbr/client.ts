import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { loadAcbr } from "./binding";
import { parseIniResponse, readField } from "./ini-parser";
import { siglaUf } from "./uf";
import { config } from "../config";
import type {
  DistribuicaoDFeInput,
  DistribuicaoDFeResultado,
  DocumentoDistribuido,
  StatusServicoInput,
  StatusServicoResultado,
} from "./types";

async function writeTempIni(): Promise<string> {
  const iniPath = path.join(os.tmpdir(), `acbr-nfe-${crypto.randomUUID()}.ini`);
  const content = [
    "[NFe]",
    `PathSchemas=${config.schemasPath}`,
    "",
    "[DFe]",
    "SSLType=ssLSSLv23",
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
      if (retInit !== 1) {
        throw new Error(
          `NFE_Inicializar falhou (${retInit}): ${acbr.ultimoRetorno()}`
        );
      }

      try {
        acbr.configGravarValor("DFe", "ArquivoPFX", pfxPath);
        acbr.configGravarValor("DFe", "Senha", input.certificado.senha);
        acbr.configGravarValor("NFe", "Ambiente", String(input.ambiente));
        acbr.configGravarValor("NFe", "UF", uf);

        const { retorno, resposta } = acbr.distribuicaoDFePorUltNSU(
          input.codigoUf,
          input.cnpj,
          nsuStr
        );

        if (retorno !== 1) {
          throw new Error(
            `NFE_DistribuicaoDFePorUltNSU falhou (${retorno}): ${acbr.ultimoRetorno()}`
          );
        }

        const parsed = parseIniResponse(resposta);
        const root = parsed.__root__;

        const cStat = readField(root, "cStat", "CStat");
        const xMotivo = readField(root, "xMotivo", "XMotivo");
        const ultimoNsu = Number(
          readField(root, "UltNSU", "ultNSU", "MaxNSU") || input.ultimoNsu
        );

        // 137 = Nenhum documento localizado / 138 = Documento(s) localizado(s)
        if (cStat === "137") {
          return { novas: 0, ultimoNsu, cStat, xMotivo, documentos: [] };
        }

        if (cStat !== "138") {
          throw new Error(`SEFAZ retornou cStat=${cStat} (${xMotivo})`);
        }

        const documentos: DocumentoDistribuido[] = Object.keys(parsed)
          .filter((key) => /^doc(zip)?\d+$/i.test(key))
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
    if (retInit !== 1) {
      throw new Error(`NFE_Inicializar falhou (${retInit}): ${acbr.ultimoRetorno()}`);
    }

    try {
      acbr.configGravarValor("NFe", "Ambiente", String(input.ambiente));
      acbr.configGravarValor("NFe", "UF", uf);

      const { retorno, resposta } = acbr.statusServico();
      if (retorno !== 1) {
        throw new Error(`NFE_StatusServico falhou (${retorno}): ${acbr.ultimoRetorno()}`);
      }

      const parsed = parseIniResponse(resposta);
      const root = parsed.__root__;

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
