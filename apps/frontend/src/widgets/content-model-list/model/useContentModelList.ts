import { useGetContentModelsApi } from '@entities/content-model';

export const useContentModelList = () => {
  const { data, loading, error } = useGetContentModelsApi();
  const models = data?.getContentModels || [];

  // Filter content models based on currently active workspace space ID
  const activeSpaceId = localStorage.getItem('active_workspace_id') || 'project-1';
  const storageKey = `contentbay_space_models_${activeSpaceId}`;
  
  let spaceModels = models;
  if (!loading && models.length > 0) {
    let spaceModelIds: string[] = [];
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        spaceModelIds = JSON.parse(stored);
      } catch {
        spaceModelIds = [];
      }
    } else {
      // Pre-seed default space with existing GraphQL content models
      if (activeSpaceId === 'project-1') {
        spaceModelIds = models.map((m: any) => m.id);
        localStorage.setItem(storageKey, JSON.stringify(spaceModelIds));
      } else {
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    }
    spaceModels = models.filter((m) => spaceModelIds.includes(m.id));
  } else if (loading) {
    spaceModels = [];
  } else {
    spaceModels = [];
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
