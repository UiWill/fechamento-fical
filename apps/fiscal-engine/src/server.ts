import Fastify from "fastify";
import { healthRoutes } from "./routes/health";
import { statusServicoRoutes } from "./routes/status-servico";
import { distribuicaoDfeRoutes } from "./routes/distribuicao-dfe";
import { manifestacaoRoutes } from "./routes/manifestacao";
import { cteDistribuicaoRoutes } from "./routes/cte-distribuicao";
import { consultarProtocoloRoutes } from "./routes/consultar-protocolo";

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
  app.register(cteDistribuicaoRoutes);
  app.register(consultarProtocoloRoutes);

  return app;
}
