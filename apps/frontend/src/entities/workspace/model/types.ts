import type { User } from '@/entities/user/@x/workspace';

/** 
 * Raw workspace representation from API
 */
export interface ApiWorkspace {
  id: string;
  name: string;
  description: string;
  types: number;
  env: number;
  records: string;
  updated: string;
  members: ApiWorkspaceMember[];
  createdAt?: string;
  updatedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdBy?: User;
  updatedBy?: User;
  _count?: {
    models: number;
    contents: number;
  };
}

export interface ApiWorkspaceMember {
  id: string;
  workspaceId: string;
  userId: number;
  role: string;
  createdAt: string;
  user: User;
}

export interface WorkspaceMemberViewModel {
  id: string;       // member relation id
  userId: number;
  name: string;
  email: string;
  role: string;
  picture?: string;
}

/**
 * Workspace representation for UI consumption (View Model)
 */
export interface WorkspaceViewModel {
  id: string;
  name: string;
  description: string;
  
  // Domain/Calculated fields
  models: number;    // Number of content models
  content: number;   // Number of content records
  
  env: number;
  updated: string;
  createdAt?: string;
  members: WorkspaceMemberViewModel[];
}

/**
 * Compatibility alias (prefer WorkspaceViewModel for UI)
 */
export type Workspace = ApiWorkspace;
