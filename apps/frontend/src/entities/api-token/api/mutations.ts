import { gql } from '@apollo/client';

export const GENERATE_API_TOKEN = gql`
  mutation GenerateApiToken($workspaceId: ID!, $name: String!) {
    generateApiToken(workspaceId: $workspaceId, name: $name) {
      token {
        id
        name
        tokenPrefix
        createdAt
        status
      }
      plainTextToken
    }
  }
`;

export const REVOKE_API_TOKEN = gql`
  mutation RevokeApiToken($tokenId: ID!) {
    revokeApiToken(tokenId: $tokenId)
  }
`;

export const REGENERATE_API_TOKEN = gql`
  mutation RegenerateApiToken($tokenId: ID!) {
    regenerateApiToken(tokenId: $tokenId) {
      token {
        id
        name
        tokenPrefix
        createdAt
        status
      }
      plainTextToken
    }
  }
`;
