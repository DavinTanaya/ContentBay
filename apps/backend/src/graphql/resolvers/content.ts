import { Context } from '../../context';
import { assertUser, assertWorkspaceAccess, assertContentAccess, assertModelAccess } from '../../lib/auth-helpers';
import { GraphQLError } from 'graphql';
import { ContentService } from '../../services/content.service';

export const contentResolvers = {
  Query: {
    getContents: async (_: unknown, { workspaceId, contentModelId }: { workspaceId: string; contentModelId?: string }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertWorkspaceAccess(userId, workspaceId);
      return ContentService.findAll(workspaceId, contentModelId);
    },
    getContent: async (_: unknown, { id }: { id: string }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertContentAccess(userId, id);
      return ContentService.findById(id);
    },
    deliveryGetContents: async (_: unknown, { modelApiId }: { modelApiId: string }, context: Context) => {
      if (!context.workspaceId) {
        throw new GraphQLError("Unauthorized: Valid API Token required", {
          extensions: { code: "UNAUTHORIZED" }
        });
      }
      
      const model = await context.prisma.contentModel.findFirst({
        where: {
          workspaceId: context.workspaceId,
          apiId: modelApiId,
        },
      });
      
      if (!model) {
        return [];
      }
      
      return context.prisma.content.findMany({
        where: {
          workspaceId: context.workspaceId,
          contentModelId: model.id,
          status: "published", // Only deliver published entries to public SDK
        },
        include: {
          contentModel: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    deliveryGetContent: async (_: unknown, { modelApiId, entryId }: { modelApiId: string; entryId: string }, context: Context) => {
      if (!context.workspaceId) {
        throw new GraphQLError("Unauthorized: Valid API Token required", {
          extensions: { code: "UNAUTHORIZED" }
        });
      }
      
      const model = await context.prisma.contentModel.findFirst({
        where: {
          workspaceId: context.workspaceId,
          apiId: modelApiId,
        },
      });
      
      if (!model) {
        throw new GraphQLError("Content model not found in this workspace");
      }
      
      return context.prisma.content.findFirst({
        where: {
          id: entryId,
          workspaceId: context.workspaceId,
          contentModelId: model.id,
          status: "published",
        },
        include: {
          contentModel: true,
        },
      });
    },
  },
  Mutation: {
    createContent: async (_: unknown, { input }: { input: any }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertWorkspaceAccess(userId, input.workspaceId);
      const model = await assertModelAccess(userId, input.contentModelId);
      if (model.workspaceId !== input.workspaceId) {
        throw new GraphQLError("Forbidden: Content model does not belong to the specified workspace", {
          extensions: { code: "FORBIDDEN" },
        });
      }
      return ContentService.create(input);
    },
    updateContent: async (_: unknown, { input }: { input: { id: string; data: any; status?: string } }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertContentAccess(userId, input.id);
      return ContentService.update(input.id, { data: input.data, status: input.status });
    },
    deleteContent: async (_: unknown, { id }: { id: string }, context: Context) => {
      const userId = assertUser(context.userId);
      await assertContentAccess(userId, id);
      return ContentService.delete(id);
    },
  },
};
