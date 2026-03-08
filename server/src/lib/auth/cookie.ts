import CONFIG from "@/config/app.config";
import ms, { type StringValue } from "ms";
import type { Request, Response } from "express";

const cookieOptions = {
  httpOnly: true, // XSS protection
  secure: CONFIG.isProd, // Only sent over HTTPS
  sameSite: "lax" as const, // CSRF protection
  path: "/",
  priority: "high" as const,
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie(CONFIG.auth.refreshTokenCookieName, token, {
    ...cookieOptions,
    maxAge: ms(CONFIG.jwt.refreshTokenTTL as StringValue),
  });
};

export const getRefreshTokenCookie = (req: Request) => {
  return req.cookies[CONFIG.auth.refreshTokenCookieName];
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie(CONFIG.auth.refreshTokenCookieName, cookieOptions);
};
