export interface CreateWorkspaceInput {
  name: string;
  description?: string | null;
}

export interface UpdateWorkspaceInput {
  name?: string | null;
  description?: string | null;
}

export interface InviteMemberRequest {
  workspaceId: string;
  email: string;
  role: string;
}

export interface DeleteWorkspaceInput {
  workspaceId: string;
}
