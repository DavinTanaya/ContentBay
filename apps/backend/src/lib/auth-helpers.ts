import { prisma } from "../db/prisma";
import { GraphQLError } from "graphql";

/**
 * Asserts that the user is authenticated and returns the userId.
 */
export function assertUser(userId: number | null): number {
  if (!userId) {
    throw new GraphQLError("Unauthorized: Authentication required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return userId;
}

/**
 * Asserts that the user has access to the specified workspace.
 */
export async function assertWorkspaceAccess(userId: number, workspaceId: string): Promise<void> {
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId,
    },
  });

  if (!membership) {
    throw new GraphQLError("Forbidden: You do not have access to this workspace", {
      extensions: { code: "FORBIDDEN" },
    });
  }
}

/**
 * Asserts that the content model belongs to a workspace the user has access to,
 * and returns the content model if successful.
 */
export async function assertModelAccess(userId: number, modelId: string) {
  const model = await prisma.contentModel.findUnique({
    where: { id: modelId },
  });

  if (!model) {
    throw new GraphQLError("Not Found: Content model not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  if (model.workspaceId) {
    await assertWorkspaceAccess(userId, model.workspaceId);
  }

  return model;
}

/**
 * Asserts that the content entry belongs to a workspace the user has access to,
 * and returns the content entry if successful.
 */
export async function assertContentAccess(userId: number, contentId: string) {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new GraphQLError("Not Found: Content entry not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  await assertWorkspaceAccess(userId, content.workspaceId);

  return content;
}
