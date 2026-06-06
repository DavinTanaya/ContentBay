import { useState } from 'react';
import { useCreateWorkspaceApi } from '@/entities/workspace';
import type { CreateWorkspaceInput } from '@/entities/workspace/model/dto';

export const useCreateWorkspace = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createWorkspaceMutation, { loading }] = useCreateWorkspaceApi({
    onCompleted: () => {
      onSuccess?.();
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitCreate = async (values: CreateWorkspaceInput) => {
    return await createWorkspaceMutation({
      variables: {
        input: {
          name: values.name,
          description: values.description || '',
        },
      },
    });
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    submitCreate,
    loading,
  };
};
