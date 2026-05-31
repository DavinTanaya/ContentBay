import type { User } from '@/entities/user/@x';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  types: number;
  env: number;
  records: string;
  updated: string;
  members: User[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: User;
  updatedBy?: User;
}
