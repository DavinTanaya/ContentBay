import { Context } from "../../context";
import { ApiTokenService } from "../../services/apiToken.service";

export const apiTokenResolvers = {
  ApiToken: {
    status: (parent: any) => {
      if (parent.revokedAt) return "REVOKED";
      if (parent.expiresAt && new Date(parent.expiresAt) < new Date()) return "EXPIRED";
      return "ACTIVE";
    },
  },
  Query: {
    getApiTokens: async (_: unknown, { workspaceId }: { workspaceId: string }, context: Context) => {
      if (!context.userId) throw new Error("Unauthorized");
      return ApiTokenService.findByWorkspace(workspaceId, context.userId);
    },
  },
  Mutation: {
    generateApiToken: async (_: unknown, { workspaceId, name }: { workspaceId: string; name: string }, context: Context) => {
      if (!context.userId) throw new Error("Unauthorized");
      return ApiTokenService.generate(workspaceId, name, context.userId);
    },
    revokeApiToken: async (_: unknown, { tokenId }: { tokenId: string }, context: Context) => {
      if (!context.userId) throw new Error("Unauthorized");
      return ApiTokenService.revoke(tokenId, context.userId);
    },
    regenerateApiToken: async (_: unknown, { tokenId }: { tokenId: string }, context: Context) => {
      if (!context.userId) throw new Error("Unauthorized");
      return ApiTokenService.regenerate(tokenId, context.userId);
    },
  },
};
