import { prisma } from "../db/prisma";
import { GraphQLError } from "graphql";
import * as crypto from "crypto";

export class ApiTokenRepository {
  static async findByWorkspace(workspaceId: string, userId: number) {
    // Verifikasi bahwa user memiliki akses ke workspace ini
    const access = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId,
        role: { in: ["Owner", "Admin", "Developer"] }, // Editor mungkin tidak boleh melihat API token
      },
    });

    if (!access) {
      throw new GraphQLError("Unauthorized or Workspace not found");
    }

    return prisma.apiToken.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async generate(workspaceId: string, name: string, userId: number) {
    // Verifikasi akses
    const access = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId,
        role: { in: ["Owner", "Admin"] }, // Hanya Owner/Admin yang bisa generate token
      },
    });

    if (!access) {
      throw new GraphQLError("Only Workspace Owner or Admin can generate API tokens.");
    }

    // Generate token raw
    const randomBytes = crypto.randomBytes(32).toString("hex");
    const rawToken = `cms_sk_${randomBytes}`;
    
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const tokenPrefix = `cms_sk_${randomBytes.substring(0, 8)}...`;

    const token = await prisma.apiToken.create({
      data: {
        workspaceId,
        name,
        tokenHash,
        tokenPrefix,
      },
    });

    return { token, plainTextToken: rawToken };
  }

  static async revoke(tokenId: string, userId: number) {
    // Dapatkan token
    const token = await prisma.apiToken.findUnique({ where: { id: tokenId } });
    if (!token) throw new GraphQLError("Token not found");

    // Verifikasi akses
    const access = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId: token.workspaceId,
        userId,
        role: { in: ["Owner", "Admin"] },
      },
    });

    if (!access) throw new GraphQLError("Unauthorized");

    await prisma.apiToken.update({
      where: { id: tokenId },
      data: { revokedAt: new Date() },
    });

    return true;
  }

  static async regenerate(tokenId: string, userId: number) {
    const token = await prisma.apiToken.findUnique({ where: { id: tokenId } });
    if (!token) throw new GraphQLError("Token not found");

    // Revoke old token
    await this.revoke(tokenId, userId);

    // Generate new token with same name
    return this.generate(token.workspaceId, token.name, userId);
  }
}
