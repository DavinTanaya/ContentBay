import { useGetContentModelsApi } from '@entities/content-model';
import { useActiveWorkspaceId } from '@/entities/workspace';

export const useContentModelList = () => {
  const { data, loading, error } = useGetContentModelsApi();
  const models = data?.getContentModels || [];

  // Filter content models based on currently active workspace space ID
  const activeSpaceId = useActiveWorkspaceId();
  
  let spaceModels = [];
  if (!loading && models.length > 0) {
    spaceModels = models.filter((m) => {
      // Fallback unassigned model to default workspace 'project-1'
      const modelWorkspaceId = m.workspaceId || 'project-1';
      return modelWorkspaceId === activeSpaceId;
    });
  }

  const cleanedSpaceModels = spaceModels.map((m) => {
    const cleanApiId = m.apiId.replace(/-project-\d+$/i, '').replace(/-project-\w+$/i, '');
    return {
      ...m,
      apiId: cleanApiId,
    };
  });

  return {
    models: cleanedSpaceModels,
    loading,
    error,
  };
};
