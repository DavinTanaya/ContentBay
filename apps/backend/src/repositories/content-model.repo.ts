import { prisma } from "../db/prisma";

export class ContentModelRepository {
  static async findAll() {
    return prisma.contentModel.findMany({
      include: {
        fields: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  static async findById(id: string) {
    return prisma.contentModel.findUnique({
      where: { id },
      include: {
        fields: true,
      },
    });
  }

  static async create(data: {
    name: string;
    apiId: string;
    description?: string;
    fields?: any[];
  }) {
    const { name, apiId, description, fields } = data;
    return prisma.contentModel.create({
      data: {
        name,
        apiId,
        description,
        fields: {
          create: fields || [],
        },
      },
      include: {
        fields: true,
      },
    });
  }

  static async update(id: string, data: {
    name: string;
    apiId: string;
    description?: string;
    fields?: any[];
  }) {
    const { name, apiId, description, fields } = data;
    return prisma.contentModel.update({
      where: { id },
      data: {
        name,
        apiId,
        description,
        fields: {
          deleteMany: {},
          create: fields || [],
        },
      },
      include: {
        fields: true,
      },
    });
  }

  static async delete(id: string) {
    await prisma.contentModel.delete({
      where: { id },
    });
    return true;
  }
}
