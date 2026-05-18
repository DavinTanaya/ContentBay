import { useGetContentModelsApi } from '@/entities/content-model/api/content-model.api';

export const useContentModelList = () => {
  const { data, loading, error } = useGetContentModelsApi();
  const models = data?.getContentModels || [];

  return {
    models,
    loading,
    error,
  };
};
