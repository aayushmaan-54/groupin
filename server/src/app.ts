import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import compression from "compression";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import CONFIG from "./config/app.config";
import logger from "./config/logger.config";
import { apiLimiter } from "./middleware/rate-limiter.middleware";
import {
  errorHandler,
  routeNotFoundHandler,
} from "./middleware/error-handler.middleware";
import router from "./router";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", CONFIG.server.trustProxy); // Trust 1 proxy for correct req.ip
app.use(helmet()); // Security Headers

// CORS
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // non-browser clients
      if (CONFIG.isDev || CONFIG.cors.origin.includes(origin))
        return cb(null, true);
      else return cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// Req. Parsing
app.use(express.json({ limit: CONFIG.server.bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: CONFIG.server.bodyLimit }));
app.use(cookieParser());

app.use(hpp()); // Prevent HTTP parameter pollution
app.use(compression({ threshold: "10kb" }));

// Pino logging
app.use(
  pinoHttp({
    logger,
    genReqId: () => randomUUID(),
  }),
);

app.get("/ping", (_req, res) => {
  res.json({
    status: "🟢 PONG",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    // await client.query('SELECT version()')
    // result.rows[0].version
  });
});

app.use(CONFIG.server.apiPrefix, apiLimiter); // Global Rate Limiter
app.use(CONFIG.server.apiPrefix, router);

// Error Handler Middleware
app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;
