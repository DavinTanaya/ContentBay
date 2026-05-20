import { prisma } from "../db/prisma";

export class ContentRepository {
  static async findAll(workspaceId: string, contentModelId?: string) {
    const where: any = { workspaceId };
    if (contentModelId) {
      where.contentModelId = contentModelId;
    }
    return prisma.content.findMany({
      where,
      include: {
        contentModel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findById(id: string) {
    return prisma.content.findUnique({
      where: { id },
      include: {
        contentModel: true,
      },
    });
  }

  static async create(data: {
    workspaceId: string;
    contentModelId: string;
    data: any;
    status?: string;
  }) {
    return prisma.content.create({
      data: {
        workspaceId: data.workspaceId,
        contentModelId: data.contentModelId,
        data: data.data,
        status: data.status || "draft",
      },
      include: {
        contentModel: true,
      },
    });
  }

  static async update(id: string, data: {
    data?: any;
    status?: string;
  }) {
    const updateData: any = {};
    if (data.data !== undefined) updateData.data = data.data;
    if (data.status !== undefined) updateData.status = data.status;

    return prisma.content.update({
      where: { id },
      data: updateData,
      include: {
        contentModel: true,
      },
    });
  }

  static async delete(id: string) {
    await prisma.content.delete({
      where: { id },
    });
    return true;
  }
}
