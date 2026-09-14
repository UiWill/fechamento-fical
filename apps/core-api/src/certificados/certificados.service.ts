import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import {
  BUCKET_CERTIFICADOS,
  ObjectStorageService,
} from "../common/storage/object-storage.service";
import { encryptBuffer, encryptString, decryptBuffer, decryptString } from "../common/crypto/envelope-encryption";
import { lerCertificadoPfx } from "./ler-pfx";

export interface CadastrarCertificadoInput {
  empresaId: string;
  nomeArquivoOriginal: string;
  pfxBuffer: Buffer;
  senha: string;
}

@Injectable()
export class CertificadosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: ObjectStorageService
  ) {}

  /**
   * Grava o PFX cifrado (AES-256-GCM) no armazenamento de objetos e a senha cifrada no Postgres.
   * O conteúdo em claro nunca é persistido — só existe em memória durante
   * esta chamada.
   *
   * A validade e o CNPJ vêm de dentro do próprio certificado (nunca de um
   * campo digitado) — além de tirar o trabalho manual de digitar a data,
   * isso também valida a senha na hora (antes, uma senha errada só ia
   * falhar depois, na hora de assinar de verdade contra a SEFAZ) e evita
   * vincular por engano o certificado de uma empresa à conta de outra.
   */
  async cadastrar(input: CadastrarCertificadoInput) {
    const empresa = await this.prisma.client.empresa.findUnique({ where: { id: input.empresaId } });
    if (!empresa) throw new NotFoundException(`Empresa ${input.empresaId} não encontrada`);

    let dadosCertificado;
    try {
      dadosCertificado = lerCertificadoPfx(input.pfxBuffer, input.senha);
    } catch (err) {
      throw new BadRequestException(err instanceof Error ? err.message : "Certificado inválido");
    }

    if (dadosCertificado.cnpjCertificado && dadosCertificado.cnpjCertificado !== empresa.cnpj) {
      throw new BadRequestException(
        `Este certificado pertence ao CNPJ ${dadosCertificado.cnpjCertificado}, mas a empresa cadastrada é ${empresa.cnpj}. Confira se não é o certificado de outro cliente.`
      );
    }

    const objetoStorage = `${input.empresaId}.pfx.enc`;

    const pfxCifrado = encryptBuffer(input.pfxBuffer);
    await this.storage.putObject(
      BUCKET_CERTIFICADOS,
      objetoStorage,
      Buffer.from(pfxCifrado.conteudoCriptografado, "base64")
    );

    // IV próprio para a senha (nunca reaproveitar o mesmo IV+chave em dois
    // conteúdos diferentes com AES-GCM — quebraria a garantia de autenticação).
    // Como o schema só reserva uma coluna de IV (a do PFX, que é o campo
    // volumoso), o IV da senha viaja embutido no próprio texto cifrado.
    const senhaCifrada = encryptString(input.senha);
    const senhaCriptografada = `${senhaCifrada.iv}:${senhaCifrada.conteudoCriptografado}`;

    return this.prisma.client.certificado.upsert({
      where: { empresaId: input.empresaId },
      create: {
        empresaId: input.empresaId,
        nomeArquivoOriginal: input.nomeArquivoOriginal,
        objetoStorage,
        senhaCriptografada,
        ivCriptografia: pfxCifrado.iv,
        validoAte: dadosCertificado.validoAte,
      },
      update: {
        nomeArquivoOriginal: input.nomeArquivoOriginal,
        objetoStorage,
        senhaCriptografada,
        ivCriptografia: pfxCifrado.iv,
        validoAte: dadosCertificado.validoAte,
        alertaVencimentoEnviado: false,
      },
    });
  }

  /**
   * Decifra o certificado para uso pontual (ex: montar a chamada ao
   * fiscal-engine). O retorno deve ser usado imediatamente e nunca
   * persistido fora deste fluxo.
   */
  async obterParaUso(empresaId: string): Promise<{ pfxBase64: string; senha: string }> {
    const cert = await this.prisma.client.certificado.findUnique({
      where: { empresaId },
    });
    if (!cert) {
      throw new NotFoundException(`Certificado da empresa ${empresaId} não cadastrado`);
    }

    const pfxCriptografadoBase64 = (
      await this.storage.getObject(BUCKET_CERTIFICADOS, cert.objetoStorage)
    ).toString("base64");

    const pfxBuffer = decryptBuffer({
      conteudoCriptografado: pfxCriptografadoBase64,
      iv: cert.ivCriptografia,
    });

    const [ivSenha, ...resto] = cert.senhaCriptografada.split(":");
    const senha = decryptString({
      iv: ivSenha!,
      conteudoCriptografado: resto.join(":"),
    });

    return { pfxBase64: pfxBuffer.toString("base64"), senha };
  }

  /**
   * Só os metadados não-sensíveis — nunca o PFX cifrado nem a senha. Usado
   * pela tela de detalhe da empresa para mostrar "certificado cadastrado,
   * válido até X" sem expor nada que precise de descriptografia.
   */
  async buscarResumoPorEmpresa(empresaId: string) {
    const cert = await this.prisma.client.certificado.findUnique({
      where: { empresaId },
      select: { id: true, nomeArquivoOriginal: true, validoAte: true, criadoEm: true },
    });
    return cert;
  }

  listarVencendoEm(dias: number) {
    const limite = new Date();
    limite.setDate(limite.getDate() + dias);
    return this.prisma.client.certificado.findMany({
      where: { validoAte: { lte: limite }, alertaVencimentoEnviado: false },
      include: { empresa: true },
    });
  }
}
