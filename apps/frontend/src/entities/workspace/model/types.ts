import type { User } from '@/entities/user/@x/workspace';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  models: number;
  contents: number;
  members: WorkspaceMember[];
  createdBy?: User | null;
  createdAt?: string | null;
  updatedBy?: User | null;
  updatedAt?: string | null;
  updated: string;
  isDeleted: boolean;
  deletedAt?: string | null;
  deletedBy?: User | null;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: number;
  role: string;
  createdAt: string;
  createdBy: User | null;
  updatedAt: string | null;
  updatedBy: User | null;
  user: User | null;
}
