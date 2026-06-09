import { useQuery } from '@apollo/client/react';
import { GET_CONTENT_MODEL, GET_CONTENT_MODELS } from '../api/queries';
import type { ContentModel } from '../model/types';

export const useGetContentModelApi = (id: string) => {
  return useQuery<{ getContentModel: ContentModel }, { id: string }>(
    GET_CONTENT_MODEL,
    {
      variables: { id },
      skip: !id,
      fetchPolicy: 'cache-and-network',
    },
  );
};

export const useGetContentModelsApi = () => {
  return useQuery<{ getContentModels: ContentModel[] }>(GET_CONTENT_MODELS, {
    fetchPolicy: 'cache-and-network',
  });
};
