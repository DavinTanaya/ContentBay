import { useDeleteContentModelApi } from '@entities/content-model';

export const useDeleteContentModel = (modelId: string) => {
  const [deleteMutation, { loading }] = useDeleteContentModelApi(modelId);

  return {
    deleteModel: () => deleteMutation({ variables: { id: modelId } }),
    loading,
  };
};
