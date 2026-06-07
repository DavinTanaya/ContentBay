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
    getInvitationDetails: (_: unknown, { token }: { token: string }) => {
      return WorkspaceService.getInvitationDetails(token);
    },
    getMyPendingInvitations: (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.getMyPendingInvitations(context.userId);
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
    inviteMember: (_: unknown, { workspaceId, email, role }: { workspaceId: string; email: string; role: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.inviteMember(workspaceId, email, role, context.userId);
    },
    acceptInvitation: (_: unknown, { token }: { token: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.acceptInvitation(token, context.userId);
    },
    declineInvitation: (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      return WorkspaceService.declineInvitation(id, context.userId);
    },
  },
};
