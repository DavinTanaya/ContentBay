import { gql } from '@apollo/client';

export const UPDATE_CONTENT_MODEL = gql`
  mutation UpdateContentModel($id: ID!, $input: CreateContentModelInput!) {
    updateContentModel(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;
