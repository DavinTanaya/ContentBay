import { gql } from '@apollo/client';

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
