import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import {
  CREATE_CONTENT_MODEL,
  DELETE_CONTENT_MODEL,
  UPDATE_CONTENT_MODEL,
} from './mutations';
import { GET_CONTENT_MODEL, GET_CONTENT_MODELS } from './queries';
import type { ContentModel } from '../model/types';
import type {
  CreateContentModelInput,
  UpdateContentModelInput,
} from '../model/dto';

export async function createContentModelApi(input: CreateContentModelInput) {
  const { data } = await apolloClient.mutate<{
    createContentModel: ContentModel;
  }>({
    mutation: CREATE_CONTENT_MODEL,
    variables: { input },
    refetchQueries: [{ query: GET_CONTENT_MODELS }],
    awaitRefetchQueries: true,
  });
  return data?.createContentModel;
}

export async function updateContentModelApi(
  id: string,
  input: UpdateContentModelInput,
) {
  const { data } = await apolloClient.mutate<{
    updateContentModel: ContentModel;
  }>({
    mutation: UPDATE_CONTENT_MODEL,
    variables: { id, input },
    refetchQueries: [
      { query: GET_CONTENT_MODEL, variables: { id } },
      { query: GET_CONTENT_MODELS },
    ],
    awaitRefetchQueries: true,
  });
  return data?.updateContentModel;
}

export async function deleteContentModelApi(id: string) {
  const { data } = await apolloClient.mutate<{ deleteContentModel: boolean }>({
    mutation: DELETE_CONTENT_MODEL,
    variables: { id },
    refetchQueries: [
      { query: GET_CONTENT_MODELS },
    ],
    awaitRefetchQueries: true,
  });
  return data?.deleteContentModel;
}
