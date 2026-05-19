import { prisma } from "../db/prisma";

export class WorkspaceRepository {
  static async findAll(userId: number) {
    return prisma.workspace.findMany({
      where: {
        createdBy: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findById(id: string, userId: number) {
    return prisma.workspace.findFirst({
      where: {
        id,
        createdBy: userId,
      },
    });
  }

  static async create(data: { name: string; description?: string }, userId: number) {
    const { name, description } = data;
    return prisma.workspace.create({
      data: {
        name,
        description: description || "",
        types: 0,
        env: 1,
        records: "0",
        createdBy: userId,
      },
    });
  }

  static async update(id: string, name: string, userId: number) {
    const match = await prisma.workspace.findFirst({
      where: { id, createdBy: userId },
    });
    if (!match) {
      throw new Error("Unauthorized or Workspace not found");
    }
    return prisma.workspace.update({
      where: { id },
      data: { name },
    });
  }

  static async delete(id: string, userId: number) {
    await prisma.workspace.deleteMany({
      where: {
        id,
        createdBy: userId,
      },
    });
    return true;
  }
}
