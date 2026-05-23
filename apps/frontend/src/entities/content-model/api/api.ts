import { useMutation, useQuery } from '@apollo/client/react';
import {
  CREATE_CONTENT_MODEL,
  DELETE_CONTENT_MODEL,
  UPDATE_CONTENT_MODEL,
} from './mutations';
import { GET_CONTENT_MODEL, GET_CONTENT_MODELS } from './queries';
import type { ContentModel } from '../model/types';

export const useCreateContentModelApi = () => {
  return useMutation(CREATE_CONTENT_MODEL, {
    refetchQueries: [{ query: GET_CONTENT_MODELS }],
    awaitRefetchQueries: true,
  });
};

export const useGetContentModelApi = (id: string) => {
  return useQuery<{ getContentModel: ContentModel }>(GET_CONTENT_MODEL, {
    variables: { id },
    skip: !id,
  });
};

export const useGetContentModelsApi = () => {
  return useQuery<{ getContentModels: ContentModel[] }>(GET_CONTENT_MODELS);
};

export const useUpdateContentModelApi = (id: string) => {
  return useMutation(UPDATE_CONTENT_MODEL, {
    refetchQueries: [
      { query: GET_CONTENT_MODEL, variables: { id } },
      { query: GET_CONTENT_MODELS },
    ],
    awaitRefetchQueries: true,
  });
};

export const useDeleteContentModelApi = (id: string) => {
  return useMutation(DELETE_CONTENT_MODEL, {
    refetchQueries: [
      { query: GET_CONTENT_MODEL, variables: { id } },
      { query: GET_CONTENT_MODELS },
    ],
    awaitRefetchQueries: true,
  });
};
