import { useState, useMemo } from 'react';
import { useGetContentModelsApi } from '@/entities/content-model';
import { useGetContentsApi } from '@/entities/content';

export function useContentList(workspaceId: string) {
  const [selectedModelId, setSelectedModelId] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // 1. Fetch Content Models
  const {
    data: modelsData,
    loading: modelsLoading,
    error: modelsError,
  } = useGetContentModelsApi();
  const allModels = modelsData?.getContentModels || [];

  const workspaceModels = useMemo(() => {
    return allModels.filter(
      (m) => (m.workspaceId || 'project-1') === workspaceId,
    );
  }, [allModels, workspaceId]);

  // 2. Fetch Content Entries
  const activeModelFilter =
    selectedModelId === 'All' ? undefined : selectedModelId;
    
  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    refetch,
  } = useGetContentsApi(workspaceId, activeModelFilter);
  
  const contents = contentsData?.getContents || [];

  // 3. Client-side status filter
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      if (statusFilter === 'All') return true;
      return (
        (item.status || 'draft').toLowerCase() === statusFilter.toLowerCase()
      );
    });
  }, [contents, statusFilter]);

  return {
    // Data
    workspaceModels,
    contents: filteredContents,
    
    // States
    selectedModelId,
    setSelectedModelId,
    statusFilter,
    setStatusFilter,
    
    // Status
    loading: modelsLoading || contentsLoading,
    error: modelsError || contentsError,
    
    // Actions
    refetch,
  };
}
