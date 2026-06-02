import { gql } from '@apollo/client';

export const GET_CONTENT_MODELS = gql`
  query GetContentModels {
    getContentModels {
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
      fields {
        id
        name
        type
        apiId
        icon
      }
      creator {
        id
        firstName
        lastName
        email
      }
      updater {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_CONTENT_MODEL = gql`
  query GetContentModel($id: ID!) {
    getContentModel(id: $id) {
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
