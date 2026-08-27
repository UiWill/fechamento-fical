import Fastify from "fastify";
import { healthRoutes } from "./routes/health";
import { statusServicoRoutes } from "./routes/status-servico";
import { distribuicaoDfeRoutes } from "./routes/distribuicao-dfe";
import { manifestacaoRoutes } from "./routes/manifestacao";

export function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
    },
  });

  app.register(healthRoutes);
  app.register(statusServicoRoutes);
  app.register(distribuicaoDfeRoutes);
  app.register(manifestacaoRoutes);

  return app;
}
