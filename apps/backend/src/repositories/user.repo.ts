import { prisma } from "../db/prisma";

export class UserRepository {
  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static create(data: {
    email: string;
    name?: string;
    picture?: string;
    provider: string;
  }) {
    return prisma.user.create({ data });
  }

  static findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
