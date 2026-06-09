import type { User } from '@/entities/user/@x/workspace';
import type { WorkspaceMember } from './workspace-member.types';

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
  _count?: {
    models: number;
    contents: number;
  };
}
