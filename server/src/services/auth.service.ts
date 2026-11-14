import authConfig from "@config/auth.config";
import type { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthService {
  static generateToken(user: User) {
    return jwt.sign({ userId: user.id }, authConfig.secret, {
      expiresIn: authConfig.secret_expires_in as any,
    });
  }

  static generateRefreshToken(user: User) {
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
}

export default AuthService;
