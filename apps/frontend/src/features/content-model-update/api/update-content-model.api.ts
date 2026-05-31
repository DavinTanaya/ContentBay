import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { GET_CONTENT_MODELS, GET_CONTENT_MODEL, type ContentModel } from '@/entities/content-model';

export const UPDATE_CONTENT_MODEL = gql`
  mutation UpdateContentModel($id: ID!, $input: CreateContentModelInput!) {
    updateContentModel(id: $id, input: $input) {
      id
      name
      apiId
      description
      icon
      status
      createdAt
      updatedAt
      createdBy
      updatedBy
      fields {
        id
        name
        type
        apiId
        icon
        localized
        required
        isTitle
        description
        validations {
          required
          unique
          minCount
          maxCount
          matchPattern
          prohibitPattern
          allowedValues
        }
      }
    }
  }
`;

export const useUpdateContentModelApi = (id: string, options?: any) => {
  return useMutation<{ updateContentModel: ContentModel }>(UPDATE_CONTENT_MODEL, {
    refetchQueries: [
      { query: GET_CONTENT_MODEL, variables: { id } },
      { query: GET_CONTENT_MODELS },
    ],
    ...options,
  });
};
