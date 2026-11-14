import { prisma } from "../lib/prisma";

class UserService {
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async findUserById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }
}

export default UserService;
