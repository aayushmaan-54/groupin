import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { UnprocessableEntity } from "@/lib/api-error";

type RequestSource = "body" | "query" | "params";

const validate =
  (schema: ZodType, source: RequestSource = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new UnprocessableEntity("Validation failed", errors));
    }

    req[source] = result.data;
    next();
  };

export default validate;
