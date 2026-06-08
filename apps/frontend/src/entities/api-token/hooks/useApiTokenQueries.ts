import { useQuery } from '@apollo/client/react';
import { GET_API_TOKENS } from '../api/queries';
import type { ApiToken } from '../model/types';

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
