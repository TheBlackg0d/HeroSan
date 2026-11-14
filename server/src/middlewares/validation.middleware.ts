import { z, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";
import Send from "@utils/response.utils";
class ValidationMiddleware {
  static validateBody(schema: z.ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors: Record<string, string[]> = {};
          error.issues.forEach((err) => {
            const field = err.path.join(".");
            if (!formattedErrors[field]) {
              formattedErrors[field] = [];
            }
            formattedErrors[field].push(err.message);
          });
          return Send.error(res, formattedErrors);
        }
        return Send.error(res, null, "Invalid request data");
      }
    };
  }
}

export default ValidationMiddleware;
