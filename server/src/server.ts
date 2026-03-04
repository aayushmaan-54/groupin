import http from "node:http";
import app from "./app";
import CONFIG from "./config/app.config";
import logger from "./config/logger.config";

let server: http.Server | undefined;

const start = async () => {
  // Connect to DB

  server = app.listen(CONFIG.server.port, () => {
    logger.info(
      `🚀  Server running in ${CONFIG.env} mode on port ${CONFIG.server.port}`,
    );

    logger.info(
      `📡  API available at http://localhost:${CONFIG.server.port}${CONFIG.server.apiPrefix}`,
    );
  });

  server.on("error", (err) => {
    logger.error({ err }, "Server failed to start");
    process.exit(1);
  });
};

const shutdown = async (signal: string): Promise<void> => {
  logger.info(`Shutting down (${signal})`);

  if (!server) {
    process.exit(0);
  }

  server.close(async () => {
    // Disconnect DB
    logger.info("Server closed, exiting");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Shutdown timed out, forcing exit");
    process.exit(1);
  }, 10_000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled rejection");
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  logger.error({ err }, "Uncaught exception");
  shutdown("uncaughtException");
});

start();
