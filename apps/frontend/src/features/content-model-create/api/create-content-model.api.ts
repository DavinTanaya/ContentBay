import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_CONTENT_MODELS } from '@/entities/content-model';

export const CREATE_CONTENT_MODEL = gql`
  mutation CreateContentModel($input: CreateContentModelInput!) {
    createContentModel(input: $input) {
      id
      workspaceId
      name
      apiId
      description
      icon
      status
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const useCreateContentModelApi = (options?: any) => {
  return useMutation(CREATE_CONTENT_MODEL, {
    refetchQueries: [{ query: GET_CONTENT_MODELS }],
    ...options,
  });
};
