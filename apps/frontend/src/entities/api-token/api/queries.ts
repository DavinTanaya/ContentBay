import { gql } from '@apollo/client';

export const GET_API_TOKENS = gql`
  query GetApiTokens($workspaceId: ID!) {
    getApiTokens(workspaceId: $workspaceId) {
      id
      name
      tokenPrefix
      createdAt
      status
    }
  }
`;
