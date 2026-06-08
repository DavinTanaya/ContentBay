import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useActiveWorkspaceId,
  useGetWorkspaceApi,
  updateWorkspaceApi,
  deleteWorkspaceApi,
} from '@/entities/workspace';
import type { Workspace } from '@/entities/workspace';
import type { DeleteWorkspaceInput } from '@/entities/workspace/model/dto';

export const useWorkspaceDetail = () => {
  const navigate = useNavigate();
  const activeId = useActiveWorkspaceId();
  const [newName, setNewName] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Fetch workspace details using FSD compliant entity hook
  const { data, loading: fetchLoading, refetch } = useGetWorkspaceApi(activeId);

  const activeSpace: Workspace | null = data?.getWorkspace || null;

  const [prevSpaceId, setPrevSpaceId] = useState<string | null>(null);

  // Update newName state safely without cascading effect
  if (activeSpace && activeSpace.id !== prevSpaceId) {
    setPrevSpaceId(activeSpace.id);
    setNewName(activeSpace.name);
  }

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

    setIsActionLoading(true);
    try {
      const res = await updateWorkspaceApi(activeId, { name: newName });
      refetch();
      return res;
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!activeId || !activeSpace) return;

    const input: DeleteWorkspaceInput = { workspaceId: activeId };

    setIsActionLoading(true);
    try {
      await deleteWorkspaceApi(input);
      localStorage.removeItem('active_workspace_id');
      navigate('/workspace');
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    activeSpace,
    newName,
    setNewName,
    handleCopyId,
    handleRename,
    handleDeleteConfirm,
    loading: fetchLoading || isActionLoading,
  };
};
