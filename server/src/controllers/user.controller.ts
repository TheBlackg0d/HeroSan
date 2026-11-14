import type { Request, Response } from "express";
import UserService from "../services/user.service";
import Send from "@utils/response.utils";

class UserController {
  static getUser = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const user = await UserService.findUserById(userId);

      if (!user) {
        return Send.notFound(res, null, "User not found");
      }

      return Send.success(res, { id: user.id, email: user.email });
    } catch (error) {
      console.error(error);
      return Send.error(res, null, "Failed to get user");
    }
  };
}

export default UserController;
