import authConfig from "@config/auth.config";
import type { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthService {
  static generateToken(user: User) {
    console.log(authConfig);
    return jwt.sign({ userId: user.id }, authConfig.secret, {
      expiresIn: authConfig.secret_expires_in as any,
    });
  }

  static generateRefreshToken(user: User) {
    console.log(authConfig);
    return jwt.sign({ userId: user.id }, authConfig.refresh_secret, {
      expiresIn: authConfig.refresh_expires_in as any,
    });
  }

  static async isPasswordValid(user: User, password: string) {
    return await bcrypt.compare(password, user.password);
  }

  static async saveRefreshToken(user: User, refreshToken: string) {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
  }

  static async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  static removeRefreshToken(userId: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  static async setJwtTokenCookie(res: any, jwtToken: string) {
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
  }

  static async setRefreshTokenCookie(res: any, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

export default AuthService;
