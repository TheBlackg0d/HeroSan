import AppService from "../services/app.service";
import type { Request, Response } from "express";
import type { App } from "@prisma/browser";
import Send from "@utils/response.utils";

export default class AppController {
  private appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  async getAppList(req: Request, res: Response) {
    try {
      const apps = await this.appService.getAppList();
      res.json(apps);
    } catch (error) {
      Send.error(res, null, "Failed to fetch app list");
    }
  }

  async getAppById(req: Request, res: Response) {
    try {
      const app = await this.appService.getAppById(req.params.id as string);
      if (app) {
        res.json(app);
      } else {
        Send.notFound(res, null, "App not found");
      }
    } catch (error) {
      Send.error(res, null, "Failed to fetch app");
    }
  }

  async createApp(req: Request, res: Response) {
    try {
      const app = await this.appService.createApp(req.body as App);
      res.status(201).json(app);
    } catch (error) {
      Send.error(res, null, "Failed to create app");
    }
  }
  async updateApp(req: Request, res: Response) {
    try {
      const app = await this.appService.updateApp(
        req.params.id as string,
        req.body as App,
      );
      res.json(app);
    } catch (error) {
      Send.error(res, null, "Failed to update app");
    }
  }

  async deleteApp(req: Request, res: Response) {
    try {
      const app = await this.appService.deleteApp(req.params.id as string);
      res.json(app);
    } catch (error) {
      Send.error(res, null, "Failed to delete app");
    }
  }
}
