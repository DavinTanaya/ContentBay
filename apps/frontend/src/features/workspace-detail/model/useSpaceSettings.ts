import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkspaceId, useGetWorkspaceApi, useUpdateWorkspaceApi } from '@/entities/workspace';
import { useDeleteWorkspaceApi } from '@entities/workspace';
import type { Workspace } from '@/entities/workspace';

export const useSpaceSettings = () => {
  const navigate = useNavigate();
  const activeId = useActiveWorkspaceId();
  const [newName, setNewName] = useState('');

  // Fetch workspace details using FSD compliant entity hook
  const { data, loading, refetch } = useGetWorkspaceApi(activeId);

  const activeSpace: Workspace | null = data?.getWorkspace || null;

  // Set the input field to match the workspace's name once fetched
  useEffect(() => {
    if (activeSpace?.name) {
      setNewName(activeSpace.name);
    }
  }, [activeSpace]);

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
    return await deleteWorkspace({
      variables: { id: activeId },
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
