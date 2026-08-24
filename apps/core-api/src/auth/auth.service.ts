import { Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaService } from "../common/prisma/prisma.service";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado");
  return secret;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, senha: string) {
    const usuario = await this.prisma.client.usuario.findUnique({ where: { email } });
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

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
      },
    };
  }

  async criarUsuario(input: {
    nome: string;
    email: string;
    senha: string;
    organizacaoId?: string;
    papel?: "ADMIN_PLATAFORMA" | "ADMIN_ORGANIZACAO" | "OPERADOR";
  }) {
    const senhaHash = await bcrypt.hash(input.senha, 12);
    return this.prisma.client.usuario.create({
      data: {
        nome: input.nome,
        email: input.email,
        senhaHash,
        organizacaoId: input.organizacaoId,
        papel: input.papel ?? "OPERADOR",
      },
    });
  }
}
