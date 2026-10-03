import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RegistrarContaInput } from "@afe/shared";
import { PrismaService } from "../common/prisma/prisma.service";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado");
  return secret;
}

interface UsuarioParaToken {
  id: string;
  nome: string;
  email: string;
  papel: string;
  organizacaoId: string | null;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private assinarToken(usuario: UsuarioParaToken, organizacaoNome: string | null) {
    const token = jwt.sign(
      { sub: usuario.id, organizacaoId: usuario.organizacaoId, papel: usuario.papel },
      getJwtSecret(),
      { expiresIn: (process.env.JWT_EXPIRES_IN ?? "8h") as jwt.SignOptions["expiresIn"] }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
        organizacaoId: usuario.organizacaoId,
        organizacaoNome,
      },
    };
  }

  async login(email: string, senha: string) {
    const usuario = await this.prisma.client.usuario.findUnique({
      where: { email },
      include: { organizacao: true },
    });
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return this.assinarToken(usuario, usuario.organizacao?.razaoSocial ?? null);
  }

  /**
   * Auto-atendimento: cria a organização (conta) e o primeiro usuário dela
   * junto, sem precisar de ninguém já logado. Ainda não tem
   * assinatura/cobrança — só a criação da conta em si; a organização
   * nasce sem restrição de uso.
   */
  async registrarConta(input: RegistrarContaInput) {
    const [organizacaoExistente, usuarioExistente] = await Promise.all([
      this.prisma.client.organizacao.findUnique({ where: { cnpj: input.cnpj } }),
      this.prisma.client.usuario.findUnique({ where: { email: input.email } }),
    ]);
    if (organizacaoExistente) {
      throw new ConflictException("Já existe uma conta cadastrada com esse CNPJ");
    }
    if (usuarioExistente) {
      throw new ConflictException("Já existe uma conta cadastrada com esse e-mail");
    }

    const senhaHash = await bcrypt.hash(input.senha, 12);

    const usuario = await this.prisma.client.$transaction(async (tx) => {
      const organizacao = await tx.organizacao.create({
        data: {
          razaoSocial: input.razaoSocial,
          cnpj: input.cnpj,
          emailContato: input.email,
        },
      });
      return tx.usuario.create({
        data: {
          nome: input.nomeResponsavel,
          email: input.email,
          senhaHash,
          organizacaoId: organizacao.id,
          papel: "ADMIN_ORGANIZACAO",
        },
      });
    });

    return this.assinarToken(usuario, input.razaoSocial);
  }

  /** Troca a própria senha — exige a senha atual, mesmo já estando logado (confirma que é mesmo a pessoa, não alguém com a sessão aberta). */
  async trocarSenha(usuarioId: string, senhaAtual: string, novaSenha: string) {
    if (novaSenha.length < 8) {
      throw new BadRequestException("A nova senha precisa ter pelo menos 8 caracteres");
    }

    const usuario = await this.prisma.client.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senhaHash);
    if (!senhaValida) {
      throw new UnauthorizedException("Senha atual incorreta");
    }

    const senhaHash = await bcrypt.hash(novaSenha, 12);
    await this.prisma.client.usuario.update({ where: { id: usuarioId }, data: { senhaHash } });

    return { ok: true };
  }
}
