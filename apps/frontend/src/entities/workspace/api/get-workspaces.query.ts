import { gql } from '@apollo/client';

export const GET_WORKSPACES = gql`
  query GetWorkspaces {
    getWorkspaces {
      id
      name
      description
      types
      env
      records
      createdAt
      updatedAt
    }
  }
`;

export const GET_WORKSPACE = gql`
  query GetWorkspace($id: ID!) {
    getWorkspace(id: $id) {
      id
      name
      description
      types
      env
      records
      createdAt
      updatedAt
    }
  }
`;
