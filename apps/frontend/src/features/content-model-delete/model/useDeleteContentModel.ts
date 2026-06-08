import { useState } from 'react';
import { deleteContentModelApi } from '@entities/content-model';

export const useDeleteContentModel = (modelId: string) => {
  const [loading, setLoading] = useState(false);

  const deleteModel = async () => {
    setLoading(true);
    try {
      await deleteContentModelApi(modelId);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteModel,
    loading,
  };
};
