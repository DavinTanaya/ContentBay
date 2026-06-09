import { Context } from '../../context';
import { assertUser, assertWorkspaceAccess, assertModelAccess } from '../../lib/auth-helpers';
import { GraphQLError } from 'graphql';
import { ContentModelService } from '../../services/content-model.service';

export const contentModelResolvers = {
  Query: {
    getContentModels: async (_: unknown, __: unknown, context: Context) => {
      const userId = assertUser(context.userId);
      const userWorkspaces = await context.prisma.workspaceMember.findMany({
        where: { userId },
        select: { workspaceId: true }
      });
      const workspaceIds = userWorkspaces.map(w => w.workspaceId);
      
      return context.prisma.contentModel.findMany({
        where: { workspaceId: { in: workspaceIds } },
        include: {
          fields: true,
          creator: true,
          updater: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    },
    getContentModel: async (_: unknown, { id }: { id: string }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertModelAccess(userId, id);
      return ContentModelService.findById(id);
    },
    deliveryGetModels: async (_: unknown, __: unknown, context: Context) => {
      if (!context.workspaceId) {
        throw new GraphQLError("Unauthorized: Valid API Token required", {
          extensions: { code: "UNAUTHORIZED" }
        });
      }
      return context.prisma.contentModel.findMany({
        where: { workspaceId: context.workspaceId },
        include: {
          fields: true,
        },
        orderBy: {
          name: 'asc'
        }
      });
    }
  },
  Mutation: {
    createContentModel: async (_: unknown, { input }: { input: any }, context: Context) => {
      const userId = assertUser(context.userId);
      if (!input.workspaceId) {
        throw new GraphQLError("workspaceId is required to create a content model");
      }
      await assertWorkspaceAccess(userId, input.workspaceId);
      return ContentModelService.create({ ...input, createdBy: userId });
    },
    updateContentModel: async (_: unknown, { id, input }: { id: string, input: any }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertModelAccess(userId, id);
      return ContentModelService.update(id, { ...input, updatedBy: userId });
    },
    deleteContentModel: async (_: unknown, { id }: { id: string }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertModelAccess(userId, id);
      return ContentModelService.delete(id);
    },
  },
};
