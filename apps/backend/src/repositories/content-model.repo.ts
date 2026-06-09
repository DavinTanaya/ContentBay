import { prisma } from "../db/prisma";

export class ContentModelRepository {
  static async findAll() {
    return prisma.contentModel.findMany({
      include: {
        fields: true,
        creator: true,
        updater: true,
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
        creator: true,
        updater: true,
      },
    });
  }

  static async create(data: {
    workspaceId?: string;
    name: string;
    apiId: string;
    description?: string;
    icon: string;
    createdBy?: number;
    fields?: any[];
  }) {
    const { workspaceId, name, apiId, description, icon, createdBy, fields } = data;
    return prisma.contentModel.create({
      data: {
        workspaceId,
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

    // Clean up obsolete fields in associated content entries if fields are being updated
    if (fields) {
      const oldModel = await prisma.contentModel.findUnique({
        where: { id },
        include: { fields: true },
      });
      if (oldModel) {
        const deletedFieldApiIds = oldModel.fields
          .filter((oldF) => !fields.some((newF) => newF.apiId === oldF.apiId))
          .map((f) => f.apiId);

        if (deletedFieldApiIds.length > 0) {
          const contents = await prisma.content.findMany({
            where: { contentModelId: id },
          });
          for (const content of contents) {
            const currentData = (content.data as Record<string, any>) || {};
            let changed = false;
            for (const key of deletedFieldApiIds) {
              if (key in currentData) {
                delete currentData[key];
                changed = true;
              }
            }
            if (changed) {
              await prisma.content.update({
                where: { id: content.id },
                data: { data: currentData },
              });
            }
          }
        }
      }
    }

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
