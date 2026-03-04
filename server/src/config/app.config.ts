import dotenv from "dotenv";
dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const CONFIG = {
  appName: "Groupin",
  env: process.env.NODE_ENV,
  isDev: isDev,
  isProd: isProd,

  cors: {
    origin: isDev ? "*" : process.env.ORIGIN?.split(",").map((o) => o.trim()),
  },

  server: {
    trustProxy: Number(process.env.TRUST_PROXY) || 1,
    bodyLimit: "10kb",
    apiPrefix: process.env.API_PREFIX || "/api",
    logLevel: isDev ? "debug" : (process.env.LOG_LEVEL ?? "info"),
    port: Number(process.env.PORT),
  },

  rateLimit: {
    auth: {
      windowMs: 15 * 60 * 1000, // 15 min
      maxReq: 7,
    },
    api: {
      windowMs: 15 * 60 * 1000, // 15 min
      maxReq: 100,
    },
  },
} as const;

export default CONFIG;
