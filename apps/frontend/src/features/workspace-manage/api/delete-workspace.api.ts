import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_WORKSPACES } from '@/entities/workspace';

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspace($id: ID!) {
    deleteWorkspace(id: $id)
  }
`;

export const useDeleteWorkspace = (options?: any) => {
  return useMutation(DELETE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};
