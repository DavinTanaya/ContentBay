import {
  useGetContentModelsApi,
  type ContentModel,
} from '@entities/content-model';
import { useUsersManagement } from '@/features/user-manage';
import { useSession } from '@/entities/session';

export const useContentModelList = (workspaceId: string) => {
  const { data, loading, error } = useGetContentModelsApi();
  const { users } = useUsersManagement();
  const { user: currentUser } = useSession();
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

    const targetUserId = m.updatedBy || m.createdBy;

    const matchedUser = users.find((u) => {
      return (
        u.id === String(targetUserId) ||
        (u.role === 'Owner' && currentUser && currentUser.id === targetUserId)
      );
    });

    const displayName = matchedUser
      ? matchedUser.name
      : `User #${targetUserId}`;

    const initial = matchedUser
      ? matchedUser.name.charAt(0).toUpperCase()
      : 'U';

    return {
      ...m,
      apiId: cleanApiId,
      authorName: displayName,
      authorInitial: initial,
    };
  });

  return {
    models: cleanedSpaceModels,
    loading,
    error,
  };
};
