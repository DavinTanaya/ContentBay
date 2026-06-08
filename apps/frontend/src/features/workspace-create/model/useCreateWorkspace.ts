import { useState } from 'react';
import { createWorkspaceApi } from '@/entities/workspace';
import type { CreateWorkspaceInput } from '@/entities/workspace/model/dto';

export const useCreateWorkspace = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitCreate = async (values: CreateWorkspaceInput) => {
    setLoading(true);
    try {
      const res = await createWorkspaceApi({
        name: values.name,
        description: values.description || '',
      });
      onSuccess?.();
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    submitCreate,
    loading,
  };
};
