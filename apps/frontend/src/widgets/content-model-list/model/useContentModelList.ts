import { useGetContentModelsApi } from '@/entities/content-model/hooks/useContentModelQueries';
import {
  type ContentModel,
} from '@entities/content-model';
export const useContentModelList = (workspaceId: string) => {
  const { data, loading, error } = useGetContentModelsApi();
  const models = data?.getContentModels || [];

  console.log('data from content models: ', data);

  let spaceModels: ContentModel[] = [];
  if (!loading && models.length > 0) {
    spaceModels = models.filter((m) => {
      const modelWorkspaceId = m.workspaceId || 'project-1';
      return modelWorkspaceId === workspaceId;
    });
  }

  const cleanedSpaceModels = spaceModels.map((m) => {
    const cleanApiId = m.apiId
      .replace(/-project-\d+$/i, '')
      .replace(/-project-\w+$/i, '');

    const author = m.creator;
    const authorName = author
      ? `${author.firstName || ''} ${author.lastName || ''}`.trim() ||
        author.email
      : 'System';

    const authorInitial = author?.firstName
      ? author.firstName.charAt(0).toUpperCase()
      : author?.email?.charAt(0).toUpperCase() || 'S';

    return {
      ...m,
      apiId: cleanApiId,
      authorName,
      authorInitial,
    };
  });

  return {
    models: cleanedSpaceModels,
    loading,
    error,
  };
};
