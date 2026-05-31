import { gql } from '@apollo/client';

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
