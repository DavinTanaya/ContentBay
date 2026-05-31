import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_CONTENT_MODELS, GET_CONTENT_MODEL } from '@/entities/content-model';

export const DELETE_CONTENT_MODEL = gql`
  mutation DeleteContentModel($id: ID!) {
    deleteContentModel(id: $id)
  }
`;

export const useDeleteContentModelApi = (id: string, options?: any) => {
  return useMutation(DELETE_CONTENT_MODEL, {
    refetchQueries: [
      { query: GET_CONTENT_MODEL, variables: { id } },
      { query: GET_CONTENT_MODELS },
    ],
    ...options,
  });
};
