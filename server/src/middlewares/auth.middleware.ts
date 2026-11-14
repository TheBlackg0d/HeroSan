import authConfig from "@config/auth.config";
import Send from "@utils/response.utils";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface DecodedToken {
  userId: number;
}

class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;

    if (!token) {
      return Send.unauthorized(res, null);
    }
    try {
      const decodedToken = jwt.verify(token, authConfig.secret) as DecodedToken;
      (req as any).userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return Send.unauthorized(res, null);
    }
  }

  static refreshTokenValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return Send.unauthorized(res, { message: "no Refresh Token provided" });
    }

    try {
      const decodedToken = jwt.verify(
        refreshToken,
        authConfig.refresh_secret,
      ) as DecodedToken;
      (req as any).userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error("Refresh token validation error:", error);
      return Send.unauthorized(res, null);
    }
  }
}

export default AuthMiddleware;
