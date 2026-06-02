import { useState, useMemo } from 'react';
import { useGetWorkspacesApi } from '@/entities/workspace';
import {
  useCreateWorkspaceApi,
  useDeleteWorkspaceApi,
} from '@/entities/workspace';
import { useSession } from '@/entities/session';
import { mapWorkspaceToViewModel } from '@/entities/workspace/model/workspace.model';
import type { CreateWorkspaceDto } from '@/entities/workspace/model/dto';

export const useWorkspace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: currentUser } = useSession();

  // Load workspaces using FSD compliant hook
  const { data, loading, refetch } = useGetWorkspacesApi();
  
  const workspaces = useMemo(() => {
    const rawWorkspaces = data?.getWorkspaces;
    if (!Array.isArray(rawWorkspaces)) return [];
    return rawWorkspaces.map(mapWorkspaceToViewModel);
  }, [data]);

  const [createWorkspaceMutation] = useCreateWorkspaceApi({
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteWorkspaceMutation] = useDeleteWorkspaceApi({
    onCompleted: () => {
      refetch();
    },
  });

  const handleAddWorkspace = async (values: CreateWorkspaceDto) => {
    return await createWorkspaceMutation({
      variables: {
        input: {
          name: values.name,
          description: values.description || '',
        },
      },
    });
  };

  const handleDeleteWorkspace = async (id: string) => {
    return await deleteWorkspaceMutation({
      variables: { id },
    });
  };

  const filteredWorkspaces = useMemo(() => {
    return workspaces.filter((w) =>
      (w.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()),
    );
  }, [workspaces, searchQuery]);

  return {
    workspaces,
    filteredWorkspaces,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    handleAddWorkspace,
    handleDeleteWorkspace,
    loading,
    currentUser,
  };
};
