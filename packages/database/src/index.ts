import { PrismaClient } from "../generated/client";

let prisma: PrismaClient | undefined;

/**
 * Client Prisma compartilhado (singleton por processo).
 * Evita esgotar o pool de conexões do Postgres quando módulos diferentes
 * importam @afe/database (comum em apps NestJS com muitos módulos).
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export * from "../generated/client";
