import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_WORKSPACE, type Workspace } from '@/entities/workspace';

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

export const useUpdateWorkspace = (options?: any) => {
  return useMutation<{ updateWorkspace: Workspace }>(UPDATE_WORKSPACE, {
    refetchQueries: (result) => [
      { 
        query: GET_WORKSPACE, 
        variables: { id: result.data?.updateWorkspace.id } 
      }
    ],
    ...options,
  });
};
