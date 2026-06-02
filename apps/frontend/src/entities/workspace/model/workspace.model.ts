import type { ApiWorkspace, WorkspaceViewModel, WorkspaceMemberViewModel } from './types';

/**
 * Logic to calculate the total number of Content Models in a workspace.
 */
export const calculateContentModelCount = (workspace: ApiWorkspace): number => {
  return workspace._count?.models || 0;
};

/**
 * Logic to calculate the total number of Contents in a workspace.
 */
export const calculateContentCount = (workspace: ApiWorkspace): number => {
  return workspace._count?.contents || 0;
};

/**
 * Maps raw API Workspace data to the UI View Model (WorkspaceViewModel).
 * This centralizes the logic for field renaming and domain calculations.
 */
export const mapWorkspaceToViewModel = (workspace: ApiWorkspace): WorkspaceViewModel => {
  return {
    id: workspace.id,
    name: workspace.name,
    description: workspace.description,
    models: calculateContentModelCount(workspace),
    content: calculateContentCount(workspace),
    env: workspace.env,
    updated: workspace.updated,
    createdAt: workspace.createdAt,
    members: (workspace.members || [])
      .map((m) => ({
        id: m.id,
        userId: m.userId,
        name: `${m.user.firstName || ''} ${m.user.lastName || ''}`.trim() || '',
        email: m.user.email,
        role: m.role,
        picture: m.user.picture || undefined,
      }))
      .sort((a, b) => {
        // Owner always comes first
        if (a.role === 'Owner' && b.role !== 'Owner') return -1;
        if (a.role !== 'Owner' && b.role === 'Owner') return 1;
        return a.name.localeCompare(b.name);
      }),
  };
};

/**
 * Stable color generation based on user identity
 */
export const getAvatarColor = (identifier: string | number): string => {
  const colors = [
    '#722ed1', // Purple
    '#1890ff', // Blue
    '#52c41a', // Green
    '#faad14', // Gold
    '#f5222d', // Red
    '#eb2f96', // Pink
    '#13c2c2', // Cyan
  ];
  
  const hash = String(identifier).split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Logic to get initials for space members.
 */
export const getSpaceMembersInitials = (
  members: WorkspaceMemberViewModel[] = [],
): { initial: string; color: string; email: string }[] => {
  if (!members || members.length === 0) {
    return [{ initial: 'U', color: '#8c8c8c', email: 'unknown' }];
  }

  return members.map((m) => ({
    initial: (m.name || m.email || 'U').charAt(0).toUpperCase(),
    color: getAvatarColor(m.email || m.userId || 'default'),
    email: m.email || '',
  }));
};

/**
 * Logic to calculate relative time text.
 */
export const getRelativeTimeText = (
  updatedStr: string,
  createdAtStr?: string,
): string => {
  if (!createdAtStr) return updatedStr || 'Updated just now';
  const createdAtTimestamp = Date.parse(createdAtStr);
  if (isNaN(createdAtTimestamp)) return updatedStr || 'Updated just now';
  const diffMs = Date.now() - createdAtTimestamp;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Updated just now';
  if (diffMins < 60)
    return `Updated ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24)
    return `Updated ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `Updated ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};
