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
    icon: string;
    createdBy?: number;
    fields?: any[];
  }) {
    const { name, apiId, description, icon, createdBy, fields } = data;
    return prisma.contentModel.create({
      data: {
        name,
        apiId,
        description,
        icon,
        createdBy: createdBy || 1, // Fallback to a default user if not passed (e.g. from context)
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
    name?: string;
    apiId?: string;
    description?: string;
    icon?: string;
    status?: any;
    updatedBy?: number;
    fields?: any[];
  }) {
    const { name, apiId, description, icon, status, updatedBy, fields } = data;
    return prisma.contentModel.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(apiId && { apiId }),
        ...(description && { description }),
        ...(icon && { icon }),
        ...(status && { status }),
        ...(updatedBy && { updatedBy }),
        ...(fields && {
          fields: {
            deleteMany: {},
            create: fields,
          },
        }),
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
