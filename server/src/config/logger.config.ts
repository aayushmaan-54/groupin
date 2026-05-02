import pino from "pino";
import type { LoggerOptions, LevelWithSilent } from "pino";
import CONFIG from "./app.config";

const isDev = !CONFIG.isProd;

const baseOptions: LoggerOptions = {
  level: CONFIG.server.logLevel as LevelWithSilent,
  base: {
    service: `${CONFIG.appName} API Server`,
    env: CONFIG.env,
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers['set-cookie']",
      "*.password",
      "*.token",
      "*.secret",
    ],
    censor: "***",
  },
};

const devOptions: LoggerOptions = {
  ...baseOptions,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname,service,env,req,res,responseTime",
      singleLine: false,
      messageFormat: "{msg}",
    },
  },
};

const prodOptions: LoggerOptions = {
  ...baseOptions,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
};

const logger = pino(isDev ? devOptions : prodOptions);
export default logger;
