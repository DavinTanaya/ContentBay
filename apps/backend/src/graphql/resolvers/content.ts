import { ContentService } from '../../services/content.service';

export const contentResolvers = {
  Query: {
    getContents: (_: unknown, { workspaceId, contentModelId }: { workspaceId: string; contentModelId?: string }) => {
      return ContentService.findAll(workspaceId, contentModelId);
    },
    getContent: (_: unknown, { id }: { id: string }) => {
      return ContentService.findById(id);
    },
  },
  Mutation: {
    createContent: (_: unknown, { input }: { input: any }) => {
      return ContentService.create(input);
    },
    updateContent: (_: unknown, { input }: { input: { id: string; data: any; status?: string } }) => {
      return ContentService.update(input.id, { data: input.data, status: input.status });
    },
    deleteContent: (_: unknown, { id }: { id: string }) => {
      return ContentService.delete(id);
    },
  },
};
