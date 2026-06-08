import { useState } from 'react';
import { deleteWorkspaceApi } from '@/entities/workspace';
import type { DeleteWorkspaceInput } from '@/entities/workspace/model/dto';

export const useWorkspaceDeleteConfirmation = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (input: DeleteWorkspaceInput) => {
    setLoading(true);
    try {
      const res = await deleteWorkspaceApi(input);
      if (onSuccess) onSuccess();
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
  };
};
