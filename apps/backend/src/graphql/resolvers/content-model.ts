import { ContentModelService } from '../../services/content-model.service';
import { Context } from '../../context';

export const contentModelResolvers = {
  Query: {
    getContentModels: () => {
      return ContentModelService.findAll();
    },
    getContentModel: (_: unknown, { id }: { id: string }) => {
      return ContentModelService.findById(id);
    },
  },
  Mutation: {
    createContentModel: (_: unknown, { input }: { input: any }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return ContentModelService.create({ ...input, createdBy: context.userId });
    },
    updateContentModel: (_: unknown, { id, input }: { id: string, input: any }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return ContentModelService.update(id, { ...input, updatedBy: context.userId });
    },
    deleteContentModel: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return ContentModelService.delete(id);
    },
  },
};
