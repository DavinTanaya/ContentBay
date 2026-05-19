import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_CONTENT_MODEL } from './mutations';
import { GET_CONTENT_MODELS } from './queries';
import type { ContentModel } from '../model/types';

export const useCreateContentModelApi = () => {
  return useMutation(CREATE_CONTENT_MODEL, {
    refetchQueries: [{ query: GET_CONTENT_MODELS }],
    awaitRefetchQueries: true,
  });
};

export const useGetContentModelsApi = () => {
  return useQuery<{ getContentModels: ContentModel[] }>(GET_CONTENT_MODELS);
};
