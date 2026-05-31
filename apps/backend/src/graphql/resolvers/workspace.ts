import { WorkspaceService } from "../../services/workspace.service";
import { Context } from "../../context";

export const workspaceResolvers = {
  Query: {
    getWorkspaces: (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.findAll(context.userId);
    },
    getWorkspace: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.findById(id, context.userId);
    },
  },
  Mutation: {
    createWorkspace: async (_: unknown, { input }: { input: { name: string; description?: string } }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      try {
        return await WorkspaceService.create(input, context.userId);
      } catch (err) {
        console.error('Error creating workspace:', err);
        throw err;
      }
    },
    updateWorkspace: (_: unknown, { id, name }: { id: string; name: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.update(id, name, context.userId);
    },
    deleteWorkspace: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.delete(id, context.userId);
    },
  },
};
