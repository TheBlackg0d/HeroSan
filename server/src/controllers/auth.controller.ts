import type { Request, Response } from "express";
import { z } from "zod";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import authSchema from "../validations/auth.schema";
import { prisma } from "../lib/prisma";
import Send from "@utils/response.utils";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body as z.infer<typeof authSchema.login>;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return Send.error(res, null, "Invalid credidentials");
      }

      if (!(await AuthService.isPasswordValid(user, password))) {
        return Send.error(res, null, "Invalid credidentials");
      }

      const token = AuthService.generateToken(user);
      const refreshToken = AuthService.generateRefreshToken(user);

      await AuthService.saveRefreshToken(user, refreshToken);

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 7 days
      });

      return Send.success(res, { id: user.id, email: user.email });
    } catch (error) {
      console.error(error);
      return Send.error(res, null, "Login Failed ");
    }
  };

  static register = async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body as z.infer<
      typeof authSchema.register
    >;

    try {
      const existingUser = await UserService.findUserByEmail(email);

      if (existingUser) {
        return Send.error(res, null, "Email already in use");
      }

      const newUser = await AuthService.registerUser(email, password);

      return Send.success(
        res,
        { id: newUser.id, email: newUser.email },
        "Registration Successful",
      );
    } catch (error) {
      console.error(error);
      return Send.error(res, null, "Registration Failed");
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.userId; // Assuming userId is set in the request object by authentication middleware

      if (userId) {
        await AuthService.removeRefreshToken(userId);
      }

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return Send.success(res, null, "Logout Successful");
    } catch (error) {
      console.error(error);
      return Send.error(res, null, "Logout Failed");
    }
  };

  static refreshToken = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const user = await UserService.findUserById(userId);

      const refreshToken = req.cookies?.refreshToken;

      if (!user || !user.refreshToken) {
        return Send.unauthorized(res, null, "Unauthorized");
      }

      if (user.refreshToken != refreshToken) {
        return Send.unauthorized(res, null, "Unauthorized");
      }

      const newAccessToken = AuthService.generateToken(user);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return Send.success(
        res,
        { id: user.id, email: user.email },
        "Token Refreshed",
      );
    } catch (error) {
      console.error(error);
      return Send.error(res, null, "Token Refresh Failed");
    }
  };
}

export default AuthController;
