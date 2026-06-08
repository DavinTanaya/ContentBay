import type { User } from '@/entities/user/@x/workspace';

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
