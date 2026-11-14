import AuthController from "@controllers/auth.controller";
import AuthMiddleware from "@middlewares/auth.middleware";
import ValidationMiddleware from "@middlewares/validation.middleware";
import BaseRouter, { type RouteConfig } from "@routes/router";
import { authSchema } from "@schemas/auth.schema";

class AuthRouter extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        method: "post",
        path: "/login",
        middlewares: [ValidationMiddleware.validateBody(authSchema.login)],
        handler: AuthController.login,
      },
      {
        method: "post",
        path: "/register",
        middlewares: [ValidationMiddleware.validateBody(authSchema.register)],
        handler: AuthController.register,
      },
      {
        method: "post",
        path: "/logout",
        handler: AuthController.logout,
        middlewares: [AuthMiddleware.authenticate],
      },
      {
        method: "post",
        path: "/refresh-token",
        handler: AuthController.refreshToken,
        middlewares: [AuthMiddleware.refreshTokenValidation],
      },
    ];
  }
}

export default new AuthRouter().router;
