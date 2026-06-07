export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: string;
  token: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  workspace: {
    name: string;
  };
  inviter: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
