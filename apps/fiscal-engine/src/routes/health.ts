import type { FastifyInstance } from "fastify";
import fs from "node:fs";
import { config } from "../config";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    service: "fiscal-engine",
    acbrLibPresente: fs.existsSync(config.libPath),
    timestamp: new Date().toISOString(),
  }));
}
