import { gql } from '@apollo/client';

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
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

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspace($id: ID!) {
    deleteWorkspace(id: $id)
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($id: ID!, $name: String!) {
    updateWorkspace(id: $id, name: $name) {
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
