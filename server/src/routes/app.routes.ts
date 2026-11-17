import BaseRouter, { type RouteConfig } from "./router";
import AppController from "../controllers/app.controller";
import AppService from "../services/app.service";
import AuthMiddleware from "@middlewares/auth.middleware";

class AppRoutes extends BaseRouter {
  protected routes(): RouteConfig[] {
    const appController = new AppController(new AppService());
    return [
      {
        method: "get",
        path: "/",
        middlewares: [AuthMiddleware.authenticate],
        handler: appController.getAppList,
      },
      {
        method: "get",
        path: "/:id",
        middlewares: [AuthMiddleware.authenticate],
        handler: appController.getAppById,
      },
      {
        method: "post",
        path: "/",
        middlewares: [AuthMiddleware.authenticate],
        handler: appController.createApp,
      },
      {
        method: "put",
        path: "/:id",
        middlewares: [AuthMiddleware.authenticate],
        handler: appController.updateApp,
      },
      {
        method: "delete",
        path: "/:id",
        middlewares: [AuthMiddleware.authenticate],
        handler: appController.deleteApp,
      },
    ];
  }
}

export default new AppRoutes().router;
