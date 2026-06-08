import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useActiveWorkspaceId,
  useGetWorkspaceApi,
  useUpdateWorkspaceApi,
} from '@/entities/workspace';
import { useDeleteWorkspaceApi } from '@entities/workspace';
import type { Workspace } from '@/entities/workspace';
import type { DeleteWorkspaceInput } from '@/entities/workspace/model/dto';

export const useWorkspaceDetail = () => {
  const navigate = useNavigate();
  const activeId = useActiveWorkspaceId();
  const [newName, setNewName] = useState('');

  // Fetch workspace details using FSD compliant entity hook
  const { data, loading, refetch } = useGetWorkspaceApi(activeId);

  const activeSpace: Workspace | null = data?.getWorkspace || null;

  const [prevSpaceId, setPrevSpaceId] = useState<string | null>(null);

  // Update newName state safely without cascading effect
  if (activeSpace && activeSpace.id !== prevSpaceId) {
    setPrevSpaceId(activeSpace.id);
    setNewName(activeSpace.name);
  }

  const [updateWorkspace] = useUpdateWorkspaceApi({
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteWorkspace] = useDeleteWorkspaceApi({
    onCompleted: () => {
      localStorage.removeItem('active_workspace_id');
      navigate('/workspace');
    },
  });

  const handleCopyId = () => {
    if (activeSpace?.id) {
      navigator.clipboard.writeText(activeSpace.id);
      return true;
    }
    return false;
  };

  const handleRename = async () => {
    if (!newName.trim()) {
      throw new Error('Space name cannot be empty!');
    }
    if (!activeId) return;

    return await updateWorkspace({
      variables: {
        id: activeId,
        name: newName,
      },
    });
  };

  const handleDeleteConfirm = async () => {
    if (!activeId || !activeSpace) return;

    const input: DeleteWorkspaceInput = { workspaceId: activeId };

    return await deleteWorkspace({
      variables: { input },
    });
  };

  return {
    activeSpace,
    newName,
    setNewName,
    handleCopyId,
    handleRename,
    handleDeleteConfirm,
    loading,
  };
};
