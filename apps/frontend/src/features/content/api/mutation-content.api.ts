import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_CONTENTS } from '@/entities/content';
import type { Content } from '@/entities/content';

export const UPDATE_CONTENT = gql`
  mutation UpdateContent($input: UpdateContentInput!) {
    updateContent(input: $input) {
      id
      workspaceId
      contentModelId
      data
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation DeleteContent($id: ID!) {
    deleteContent(id: $id)
  }
`;

export const useUpdateContentApi = (workspaceId: string, contentModelId?: string, options?: any) => {
  return useMutation<{ updateContent: Content }>(UPDATE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    ...options
  });
};

export const useDeleteContentApi = (workspaceId: string, contentModelId?: string, options?: any) => {
  return useMutation<boolean>(DELETE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    ...options
  });
};
