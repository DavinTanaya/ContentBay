import { useState, useEffect } from 'react';
import { updateWorkspaceApi } from '@/entities/workspace';

export const useWorkspaceUpdate = (
  workspaceId: string,
  initialName: string,
  initialDescription?: string | null,
) => {
  const [newName, setNewName] = useState(initialName);
  const [newDescription, setNewDescription] = useState(
    initialDescription || '',
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setNewName(initialName);
    setNewDescription(initialDescription || '');
  }, [initialName, initialDescription]);

  const handleUpdate = async () => {
    if (!newName.trim()) {
      throw new Error('Workspace name cannot be empty!');
    }

    setIsUpdating(true);
    try {
      const res = await updateWorkspaceApi({
        workspaceId,
        name: newName,
        description: newDescription,
      });
      return res;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    newName,
    setNewName,
    newDescription,
    setNewDescription,
    isUpdating,
    handleUpdate,
  };
};
