import { gql } from '@apollo/client';

export const GET_CONTENTS = gql`
  query GetContents($workspaceId: String!, $contentModelId: String) {
    getContents(workspaceId: $workspaceId, contentModelId: $contentModelId) {
      id
      workspaceId
      contentModelId
      data
      status
      createdAt
      updatedAt
      contentModel {
        id
        name
        apiId
      }
    }
  }
`;

export const GET_CONTENT = gql`
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      workspaceId
      contentModelId
      data
      status
      createdAt
      updatedAt
      contentModel {
        id
        name
        apiId
      }
    }
  }
`;
