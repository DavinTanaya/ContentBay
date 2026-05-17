import { gql } from '@apollo/client';

export const GET_CONTENT_MODELS = gql`
  query GetContentModels {
    getContentModels {
      id
      name
      apiId
      description
      status
      updatedAt
      fields {
        id
        name
        type
        apiId
      }
    }
  }
`;

export const GET_CONTENT_MODEL = gql`
  query GetContentModel($id: ID!) {
    getContentModel(id: $id) {
      id
      name
      apiId
      description
      status
      fields {
        id
        name
        type
        apiId
        localized
        required
        isTitle
        description
      }
    }
  }
`;
