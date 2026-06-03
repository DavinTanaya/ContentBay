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
    }
  }
`;
