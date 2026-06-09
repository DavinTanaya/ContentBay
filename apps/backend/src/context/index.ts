import { prisma } from "../db/prisma";
import { verifyToken } from "../lib/jwt";
import crypto from "crypto";

export interface Context {
  prisma: typeof prisma;
  userId: number | null;
  workspaceId: string | null;
}

export async function createContext({
  request,
}: {
  request: Request;
}): Promise<Context> {
  const auth = request.headers.get("authorization");
  const apiTokenHeader = request.headers.get("x-contentbay-token");

  let userId: number | null = null;
  let workspaceId: string | null = null;

  // 1. Authenticate JWT Session User
  if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.slice(7);
      const decoded = verifyToken(token);
      userId = decoded.userId;
    } catch {
      console.warn("Invalid JWT token");
    }
  }

  // 2. Authenticate SDK / Client API Token
  if (apiTokenHeader && apiTokenHeader.startsWith("cms_sk_")) {
    try {
      const tokenHash = crypto.createHash("sha256").update(apiTokenHeader).digest("hex");
      const apiToken = await prisma.apiToken.findFirst({
        where: {
          tokenHash,
          revokedAt: null,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ]
        }
      });

      if (apiToken) {
        workspaceId = apiToken.workspaceId;
      }
    } catch (err) {
      console.error("Failed to verify API Token:", err);
    }
  }

  return { prisma, userId, workspaceId };
}
