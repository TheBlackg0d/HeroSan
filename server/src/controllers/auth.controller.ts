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

      await AuthService.setJwtTokenCookie(res, token);

      await AuthService.setRefreshTokenCookie(res, refreshToken);

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

      await AuthService.setJwtTokenCookie(
        res,
        AuthService.generateToken(newUser),
      );
      await AuthService.setRefreshTokenCookie(
        res,
        AuthService.generateRefreshToken(newUser),
      );

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

      res.clearCookie("jwtToken");
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

      await AuthService.setJwtTokenCookie(res, newAccessToken);
      await AuthService.setRefreshTokenCookie(
        res,
        AuthService.generateRefreshToken(user),
      );

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
