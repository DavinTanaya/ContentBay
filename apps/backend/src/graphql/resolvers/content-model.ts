import { ContentModelService } from '../../services/content-model.service';

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
    createContentModel: (_: unknown, { input }: { input: any }) => {
      return ContentModelService.create(input);
    },
    updateContentModel: (_: unknown, { id, input }: { id: string, input: any }) => {
      return ContentModelService.update(id, input);
    },
    deleteContentModel: (_: unknown, { id }: { id: string }) => {
      return ContentModelService.delete(id);
    },
  },
};
