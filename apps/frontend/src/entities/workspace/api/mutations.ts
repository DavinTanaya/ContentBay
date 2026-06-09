import { gql } from '@apollo/client';

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspace($id: ID!) {
    deleteWorkspace(id: $id)
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($id: ID!, $input: UpdateWorkspaceInput!) {
    updateWorkspace(id: $id, input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const INVITE_MEMBER = gql`
  mutation InviteMember($workspaceId: ID!, $email: String!, $role: String!) {
    inviteMember(workspaceId: $workspaceId, email: $email, role: $role)
  }
`;

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($token: String!) {
    acceptInvitation(token: $token)
  }
`;

export const DECLINE_INVITATION = gql`
  mutation DeclineInvitation($id: ID!) {
    declineInvitation(id: $id)
  }
`;
