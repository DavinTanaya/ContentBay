import { useQuery, useMutation } from '@apollo/client/react';
import { GET_API_TOKENS } from './queries';
import {
  GENERATE_API_TOKEN,
  REVOKE_API_TOKEN,
  REGENERATE_API_TOKEN,
} from './mutations';
import type { ApiToken, GenerateTokenResponse } from '../model/types';

export const useGetApiTokensApi = (workspaceId: string) => {
  return useQuery<{ getApiTokens: ApiToken[] }, { workspaceId: string }>(
    GET_API_TOKENS,
    {
      variables: { workspaceId },
      skip: !workspaceId,
      fetchPolicy: 'network-only',
    }
  );
};

export const useGenerateApiTokenApi = (options?: any) => {
  return useMutation<
    { generateApiToken: GenerateTokenResponse },
    { workspaceId: string; name: string }
  >(GENERATE_API_TOKEN, {
    refetchQueries: ['GetApiTokens'],
    ...options,
  });
};

export const useRevokeApiTokenApi = (options?: any) => {
  return useMutation<{ revokeApiToken: boolean }, { tokenId: string }>(
    REVOKE_API_TOKEN,
    {
      refetchQueries: ['GetApiTokens'],
      ...options,
    }
  );
};

export const useRegenerateApiTokenApi = (options?: any) => {
  return useMutation<
    { regenerateApiToken: GenerateTokenResponse },
    { tokenId: string }
  >(REGENERATE_API_TOKEN, {
    refetchQueries: ['GetApiTokens'],
    ...options,
  });
};
