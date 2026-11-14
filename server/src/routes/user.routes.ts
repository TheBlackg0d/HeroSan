import BaseRouter, { type RouteConfig } from "@routes/router";
import AuthMiddleware from "@middlewares/auth.middleware";
import UserController from "@controllers/user.controller";
class UserRoutes extends BaseRouter {
  protected routes(): RouteConfig[] {
    return [
      {
        method: "get",
        path: "/me",
        middlewares: [AuthMiddleware.authenticate],
        handler: UserController.getUser,
      },
    ];
  }
}

export default new UserRoutes().router;
