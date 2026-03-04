import CONFIG from "@/config/app.config";
import { TooManyRequests } from "@/lib/api-error";
import rateLimit from "express-rate-limit";

const createLimiter = (windowMs: number, max: number, message: string) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: "draft-7", // RateLimit headers (RFC 9110)
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(new TooManyRequests(message));
    },
  });

export const apiLimiter = createLimiter(
  CONFIG.rateLimit.api.windowMs,
  CONFIG.rateLimit.api.maxReq,
  "Too many requests - please try again later",
);

export const authLimiter = createLimiter(
  CONFIG.rateLimit.auth.windowMs,
  CONFIG.rateLimit.auth.maxReq,
  "Too many auth attempts — please try again in 15 minutes",
);
