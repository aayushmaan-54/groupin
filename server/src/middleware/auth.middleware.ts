import { Unauthorized } from "@/lib/api-error";
import type { Request, Response, NextFunction } from "express";

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessTokenHeader = req.headers.authorization;

  if (!accessTokenHeader?.startsWith("Bearer ")) {
    throw new Unauthorized("No Access token provided");
  }

  // const accessToken = accessTokenHeader.split(" ")[1];
  // Verify JWT Token
  // Find user & attach its data to req
  next();
};

export default authenticate;
