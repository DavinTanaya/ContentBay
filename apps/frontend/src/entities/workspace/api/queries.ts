import { gql } from '@apollo/client';

export const GET_WORKSPACES = gql`
  query GetWorkspaces {
    getWorkspaces {
      id
      name
      description
      createdAt
      updatedAt
      isDeleted
      deletedAt
      members {
        id
        userId
        role
        user {
          id
          firstName
          lastName
          email
          picture
        }
      }
      _count {
        models
        contents
      }
    }
  }
`;

export const GET_WORKSPACE = gql`
  query GetWorkspace($id: ID!) {
    getWorkspace(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      isDeleted
      deletedAt
      members {
        id
        userId
        role
        user {
          id
          firstName
          lastName
          email
          picture
        }
      }
      _count {
        models
        contents
      }
    }
  }
`;

export const GET_INVITATION_DETAILS = gql`
  query GetInvitationDetails($token: String!) {
    getInvitationDetails(token: $token) {
      id
      workspaceId
      email
      role
      token
      status
      expiresAt
      workspace {
        name
      }
      inviter {
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_MY_PENDING_INVITATIONS = gql`
  query GetMyPendingInvitations {
    getMyPendingInvitations {
      id
      workspaceId
      email
      role
      token
      status
      expiresAt
      createdAt
      workspace {
        name
      }
      inviter {
        firstName
        lastName
        email
      }
    }
  }
`;
