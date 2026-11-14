import { ok } from "assert";
import type { Response } from "express";

class Send {
  static success(res: Response, data: unknown, message = "Success") {
    return res.status(200).json({ ok: true, message, data });
  }

  static error(res: Response, data: unknown, message = "Error", status = 500) {
    return res.status(status).json({ ok: false, message, data });
  }

  static notFound(res: Response, data: unknown, message = "Not Found") {
    return res.status(404).json({ ok: false, message, data });
  }

  static unauthorized(res: Response, data: unknown, message = "Unauthorized") {
    return res.status(401).json({ ok: false, message, data });
  }

  static validationError(res: Response, errors: Record<string, string[]>) {
    return res.status(422).json({
      ok: false,
      message: "Validation Error",
      errors,
    });
  }

  static forbidden(res: Response, data: any, message = "Forbidden") {
    return res.status(403).json({ ok: false, message, data });
  }

  static badRequest(res: Response, data: any, message = "Bad Request") {
    return res.status(400).json({ ok: false, message, data });
  }
}

export default Send;
