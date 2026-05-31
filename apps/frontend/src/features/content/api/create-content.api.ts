import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_CONTENTS } from '@/entities/content';

export const CREATE_CONTENT = gql`
  mutation CreateContent($input: CreateContentInput!) {
    createContent(input: $input) {
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

export const useCreateContentApi = (workspaceId: string, contentModelId?: string, options?: any) => {
  return useMutation<{ createContent: any }>(CREATE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    ...options
  });
};
