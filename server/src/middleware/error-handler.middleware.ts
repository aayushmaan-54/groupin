import CONFIG from "@/config/app.config";
import {
  APIError,
  BadRequest,
  InternalServerError,
  NotFound,
} from "@/lib/api-error";
import type { Request, Response, NextFunction } from "express";

const normalizeError = (err: unknown) => {
  if (err instanceof APIError && err.isOperational) return err;

  if (
    typeof err === "object" &&
    err !== null &&
    "type" in err &&
    (err as { type?: string }).type === "entity.too.large"
  ) {
    return new BadRequest("Request body too large");
  }

  return new InternalServerError();
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const apiError = normalizeError(err);

  if (apiError.isOperational) {
    req.log.warn({ err }, apiError.message);
  } else {
    req.log.error({ err }, "Unexpected error occurred");
  }

  res.status(apiError.statusCode).json({
    success: false,
    message: apiError.message,
    ...(apiError.errors.length > 0 && { errors: apiError.errors }),
    ...(CONFIG.isDev && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });

  // Optional: If error is NOT operational, you might want to gracefully restart the process used when use process manager like k8
};

export const routeNotFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new NotFound("Route not found"));
};
