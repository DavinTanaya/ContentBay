import { useQuery } from '@apollo/client/react';
import { GET_CONTENT_MODELS, GET_CONTENT_MODEL } from './get-content-models.query';
import type { ContentModel } from '../model/types';

export const useGetContentModelsApi = () => {
  return useQuery<{ getContentModels: ContentModel[] }>(GET_CONTENT_MODELS);
};

export const useGetContentModelApi = (id: string) => {
  return useQuery<{ getContentModel: ContentModel }>(GET_CONTENT_MODEL, {
    variables: { id },
    skip: !id,
  });
};
