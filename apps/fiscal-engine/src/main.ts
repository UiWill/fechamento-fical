import { buildServer } from "./server";
import { config } from "./config";

async function main() {
  const app = buildServer();

  try {
    await app.listen({ port: config.port, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

main();
