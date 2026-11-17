import type { App } from "@prisma/browser";
import { prisma } from "../lib/prisma";

export default class AppService {
  async getAppList() {
    return prisma.app.findMany();
  }

  async getAppById(id: string) {
    return prisma.app.findUnique({
      where: { id },
    });
  }

  async createApp(data: App) {
    return prisma.app.create({
      data,
    });
  }

  async updateApp(id: string, data: App) {
    return prisma.app.update({
      where: { id },
      data,
    });
  }

  async deleteApp(id: string) {
    return prisma.app.delete({
      where: { id },
    });
  }
}
