import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import {
  GENERATE_API_TOKEN,
  REVOKE_API_TOKEN,
  REGENERATE_API_TOKEN,
} from './mutations';
import type { GenerateTokenResponse } from '../model/types';

export async function generateApiTokenApi(workspaceId: string, name: string) {
  const { data } = await apolloClient.mutate<
    { generateApiToken: GenerateTokenResponse }
  >({
    mutation: GENERATE_API_TOKEN,
    variables: { workspaceId, name },
    refetchQueries: ['GetApiTokens'],
    awaitRefetchQueries: true,
  });
  return data?.generateApiToken;
}

export async function revokeApiTokenApi(tokenId: string) {
  const { data } = await apolloClient.mutate<{ revokeApiToken: boolean }>({
    mutation: REVOKE_API_TOKEN,
    variables: { tokenId },
    refetchQueries: ['GetApiTokens'],
    awaitRefetchQueries: true,
  });
  return data?.revokeApiToken;
}

export async function regenerateApiTokenApi(tokenId: string) {
  const { data } = await apolloClient.mutate<
    { regenerateApiToken: GenerateTokenResponse }
  >({
    mutation: REGENERATE_API_TOKEN,
    variables: { tokenId },
    refetchQueries: ['GetApiTokens'],
    awaitRefetchQueries: true,
  });
  return data?.regenerateApiToken;
}
