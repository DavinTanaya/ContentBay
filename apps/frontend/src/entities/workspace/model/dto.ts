import type { User } from '@/entities/user/@x/workspace';

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
}

export interface InviteMemberDto {
  workspaceId: string;
  email: string;
  role: string;
}

export interface WorkspaceResponseDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: User;
}
