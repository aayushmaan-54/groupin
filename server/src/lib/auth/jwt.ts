import CONFIG from "@/config/app.config";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { BadRequest } from "@/lib/api-error";

const secretBytes = new TextEncoder().encode(CONFIG.jwt.secret);

export const generateToken = async (payload: JWTPayload, ttl: string) => {
  if (!payload.sub) throw new BadRequest("Invalid Token: Subject missing!");
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setSubject(payload.sub)
    .setExpirationTime(ttl)
    .sign(secretBytes);
};

export const generateAccessToken = async (payload: JWTPayload) => {
  return await generateToken(payload, CONFIG.jwt.accessTokenTTL);
};

export const generateRefreshToken = async (payload: JWTPayload) => {
  return await generateToken(payload, CONFIG.jwt.refreshTokenTTL);
};

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secretBytes);
  return payload;
};

export const getUserIdFromToken = async (token: string) => {
  const payload = await verifyToken(token);
  if (!payload.sub) throw new BadRequest("Invalid Token: Subject missing!");
  return payload.sub;
};
