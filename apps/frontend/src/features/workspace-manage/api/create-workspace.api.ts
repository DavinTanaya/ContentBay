import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_WORKSPACES } from '@/entities/workspace';

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

export const useCreateWorkspace = (options?: any) => {
  return useMutation(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};
