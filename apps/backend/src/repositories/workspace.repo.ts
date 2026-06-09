import { prisma } from "../db/prisma";
import { GraphQLError } from "graphql";
import crypto from "crypto";

export class WorkspaceRepository {
  static async findAll(userId: number) {
    return prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
        isDeleted: false,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            models: true,
            contents: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findById(id: string, userId: number) {
    return prisma.workspace.findFirst({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
        isDeleted: false,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            models: true,
            contents: true,
          },
        },
      },
    });
  }

  static async create(data: { name: string; description?: string }, userId: number) {
    const { name, description } = data;
    return prisma.workspace.create({
      data: {
        name,
        description: description || "",
        types: 0,
        env: 1,
        records: "0",
        createdBy: userId,
        members: {
          create: {
            userId,
            role: "Owner",
          },
        },
      },
    });
  }

  static async update(id: string, input: { name?: string; description?: string }, userId: number) {
    const match = await prisma.workspace.findFirst({
      where: {
        id,
        isDeleted: false,
        OR: [
          { createdBy: userId },
          {
            members: {
              some: {
                userId,
                role: "Owner",
              },
            },
          },
        ],
      },
    });
    if (!match) {
      throw new GraphQLError("Unauthorized or Workspace not found");
    }
    return prisma.workspace.update({
      where: { id },
      data: input,
    });
  }

  static async delete(id: string, userId: number) {
    const match = await prisma.workspace.findFirst({
      where: {
        id,
        isDeleted: false,
        OR: [
          { createdBy: userId },
          {
            members: {
              some: {
                userId,
                role: "Owner",
              },
            },
          },
        ],
      },
    });
    if (!match) {
      throw new GraphQLError("Unauthorized or Workspace not found");
    }
    await prisma.workspace.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    return true;
  }

  static async inviteMember(workspaceId: string, email: string, role: string, inviterId: number) {
    // 0. Verify that the inviter has Owner or Admin access to this workspace
    const access = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: inviterId,
        role: { in: ["Owner", "Admin"] },
      },
    });

    if (!access) {
      throw new GraphQLError("Only Workspace Owner or Admin can invite members.");
    }

    // Validate that the assigned role is valid
    const allowedRoles = ["Owner", "Admin", "Developer", "Editor"];
    if (!allowedRoles.includes(role)) {
      throw new GraphQLError("Invalid role specified.");
    }

    // 1. If user is already registered, check if they are already a member
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const existingMember = await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: user.id,
          },
        },
      });

      if (existingMember) {
        throw new GraphQLError("User is already a member of this workspace.");
      }
    }

    // 2. Check for an existing PENDING invitation
    const existingInvitation = await prisma.workspaceInvitation.findFirst({
      where: {
        workspaceId,
        email,
        status: "PENDING",
      },
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    if (existingInvitation) {
      // Resend existing invitation
      await prisma.workspaceInvitation.update({
        where: { id: existingInvitation.id },
        data: {
          expiresAt,
          inviterId,
          role,
        },
      });
      return { token: existingInvitation.token, isResend: true };
    }

    // 3. Create a new invitation
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.workspaceInvitation.create({
      data: {
        workspaceId,
        email,
        role,
        token,
        status: "PENDING",
        expiresAt,
        inviterId,
      },
    });

    return { token, isResend: false };
  }

  static async getInvitationDetails(token: string) {
    const invitation = await prisma.workspaceInvitation.findUnique({
      where: { token },
      include: {
        workspace: true,
        inviter: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!invitation) {
      throw new GraphQLError("Invitation not found or invalid.");
    }

    return invitation;
  }

  static async acceptInvitation(token: string, userId: number) {
    const invitation = await prisma.workspaceInvitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      throw new GraphQLError("Invitation not found.");
    }

    if (invitation.status !== "PENDING") {
      throw new GraphQLError(`This invitation is already ${invitation.status.toLowerCase()}.`);
    }

    if (new Date() > invitation.expiresAt) {
      await prisma.workspaceInvitation.update({
        where: { id: invitation.id },
        data: { status: "EXPIRED" },
      });
      throw new GraphQLError("This invitation has expired.");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.email !== invitation.email) {
      throw new GraphQLError("This invitation was sent to a different email address.");
    }

    // Accept it
    await prisma.$transaction([
      prisma.workspaceMember.upsert({
        where: {
          workspaceId_userId: { workspaceId: invitation.workspaceId, userId },
        },
        create: {
          workspaceId: invitation.workspaceId,
          userId,
          role: invitation.role,
        },
        update: {
          role: invitation.role,
        },
      }),
      prisma.workspaceInvitation.update({
        where: { id: invitation.id },
        data: { status: "ACCEPTED" },
      }),
    ]);

    return true;
  }

  static async getMyPendingInvitations(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new GraphQLError("User not found.");

    return prisma.workspaceInvitation.findMany({
      where: {
        email: user.email,
        status: "PENDING",
        expiresAt: { gt: new Date() },
      },
      include: {
        workspace: true,
        inviter: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async declineInvitation(id: string, userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new GraphQLError("User not found.");

    const invitation = await prisma.workspaceInvitation.findUnique({
      where: { id },
    });

    if (!invitation) {
      throw new GraphQLError("Invitation not found.");
    }

    if (invitation.email !== user.email) {
      throw new GraphQLError("Unauthorized to decline this invitation.");
    }

    if (invitation.status !== "PENDING") {
      throw new GraphQLError(`Cannot decline a ${invitation.status.toLowerCase()} invitation.`);
    }

    await prisma.workspaceInvitation.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    return true;
  }
}
