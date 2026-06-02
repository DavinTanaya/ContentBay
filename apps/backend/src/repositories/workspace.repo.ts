import { prisma } from "../db/prisma";

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

  static async update(id: string, name: string, userId: number) {
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
      throw new Error("Unauthorized or Workspace not found");
    }
    return prisma.workspace.update({
      where: { id },
      data: { name },
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
      throw new Error("Unauthorized or Workspace not found");
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
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User with this email not found in the system.");
    }

    // 2. Check if user is already a member
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      throw new Error("User is already a member of this workspace.");
    }

    // 3. Add member
    await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
        role,
      },
    });

    return true;
  }
}
