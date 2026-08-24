import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    let database: "ok" | "erro" = "ok";
    try {
      await this.prisma.client.$queryRaw`SELECT 1`;
    } catch {
      database = "erro";
    }

    return {
      status: database === "ok" ? "ok" : "degradado",
      service: "core-api",
      database,
      timestamp: new Date().toISOString(),
    };
  }
}
