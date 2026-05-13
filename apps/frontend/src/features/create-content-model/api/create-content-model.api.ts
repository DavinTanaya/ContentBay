import { gql } from '@apollo/client';

export const CREATE_CONTENT_MODEL = gql`
  mutation CreateContentModel($input: CreateContentModelInput!) {
    createContentModel(input: $input) {
      id
      name
      apiId
      description
    }
  }
`;
