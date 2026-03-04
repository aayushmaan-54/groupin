import pino from "pino";
import type { LoggerOptions, LevelWithSilent } from "pino";
import CONFIG from "./app.config";

const isDev = !CONFIG.isProd;

const options: LoggerOptions = {
  level: CONFIG.server.logLevel as LevelWithSilent,

  base: {
    service: `${CONFIG.appName} API Server`,
    env: CONFIG.env,
  },

  serializers: {
    err: pino.stdSerializers.err,
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.headers['set-cookie']",
      "*.password",
      "*.token",
      "*.accessToken",
      "*.refreshToken",
    ],
    censor: "***",
  },

  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
};

const logger = pino(options);
export default logger;
