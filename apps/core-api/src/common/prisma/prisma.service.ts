import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { getPrismaClient, type PrismaClient } from "@afe/database";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient = getPrismaClient();

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
