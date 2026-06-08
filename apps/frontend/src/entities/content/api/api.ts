import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import { CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from './mutations';
import { GET_CONTENTS } from './queries';
import type { Content } from '../model/types';

export async function createContentApi(
  input: any,
  workspaceId: string,
  contentModelId?: string,
) {
  const { data } = await apolloClient.mutate<{ createContent: Content }>({
    mutation: CREATE_CONTENT,
    variables: input, // Asumsi variabel diteruskan secara flat, sesuaikan dengan input
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
  return data?.createContent;
}

export async function updateContentApi(
  id: string,
  input: any,
  workspaceId: string,
  contentModelId?: string,
) {
  const { data } = await apolloClient.mutate<{ updateContent: Content }>({
    mutation: UPDATE_CONTENT,
    variables: { id, ...input }, // Asumsi variabel
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
  return data?.updateContent;
}

export async function deleteContentApi(
  id: string,
  workspaceId: string,
  contentModelId?: string,
) {
  const { data } = await apolloClient.mutate<{ deleteContent: boolean }>({
    mutation: DELETE_CONTENT,
    variables: { id },
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
  return data?.deleteContent;
}
