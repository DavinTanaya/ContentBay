import { useDeleteWorkspaceApi } from '@/entities/workspace';
import type { DeleteWorkspaceInput } from '@/entities/workspace/model/dto';

export const useWorkspaceDeleteConfirmation = (onSuccess?: () => void) => {
  const [deleteWorkspaceMutation, { loading }] = useDeleteWorkspaceApi({
    onCompleted: () => {
      if (onSuccess) onSuccess();
    },
  });

  const handleDelete = async (input: DeleteWorkspaceInput) => {
    return await deleteWorkspaceMutation({
      variables: { input },
    });
  };

  return {
    handleDelete,
    loading,
  };
};
