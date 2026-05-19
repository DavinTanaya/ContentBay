import { gql } from '@apollo/client';

export const CREATE_CONTENT_MODEL = gql`
  mutation CreateContentModel($input: CreateContentModelInput!) {
    createContentModel(input: $input) {
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
    }
  }
`;

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

export const DELETE_CONTENT_MODEL = gql`
  mutation DeleteContentModel($id: ID!) {
    deleteContentModel(id: $id)
  }
`;
