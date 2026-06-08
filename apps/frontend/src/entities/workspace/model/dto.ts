export interface CreateWorkspaceInput {
  name: string;
  description?: string | null;
}

export interface UpdateWorkspaceInput {
  workspaceId: string;
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

export interface GetInvitationDetailsInput {
  token: string;
}

export interface GetInvitationDetailsResponse {
  getInvitationDetails: import('./workspace-invitation.types').WorkspaceInvitation;
}

export interface GetMyPendingInvitationsResponse {
  getMyPendingInvitations: import('./workspace-invitation.types').WorkspaceInvitation[];
}
