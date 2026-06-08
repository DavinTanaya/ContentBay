import { useState, useMemo } from 'react';
import { useGetWorkspacesApi } from '@/entities/workspace';
import { useSession } from '@/entities/session';
import type { Workspace } from './workspace.types';
import type { WorkspaceMember } from './workspace-member.types';


export const getAvatarColor = (identifier: string | number): string => {
  const colors = [
    '#722ed1',
    '#1890ff',
    '#52c41a',
    '#faad14',
    '#f5222d',
    '#eb2f96',
    '#13c2c2',
  ];
  const hash = String(identifier)
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return colors[Math.abs(hash) % colors.length];
};

export const getSpaceMembersInitials = (
  members: WorkspaceMember[] = [],
): { initial: string; color: string; email: string }[] => {
  if (!members || members.length === 0) {
    return [{ initial: 'U', color: '#8c8c8c', email: 'unknown' }];
  }
  return members.map((m) => {
    const name = `${m.user?.firstName || ''} ${m.user?.lastName || ''}`.trim();
    const displayStr = name || m.user?.email || 'U';
    return {
      initial: displayStr.charAt(0).toUpperCase(),
      color: getAvatarColor(m.user?.email || m.userId || 'default'),
      email: m.user?.email || '',
    };
  });
};

export const getRelativeTimeText = (
  updatedStr: string,
  createdAtStr?: string | null,
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

// Hook for formatting a single Workspace
export const useWorkspaceFormatter = (workspace: Workspace) => {
  return useMemo(() => {
    return {
      initials: getSpaceMembersInitials(workspace.members),
      updatedAtText: getRelativeTimeText(workspace.updated || workspace.updatedAt || '', workspace.createdAt),
      modelsCount: workspace.models || 0,
      contentsCount: workspace.contents || 0,
    };
  }, [workspace]);
};

// Hook for managing Workspace list and operations
export const useWorkspace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user: currentUser } = useSession();

  const { data, loading, refetch } = useGetWorkspacesApi();

  const workspaces: Workspace[] = useMemo(() => {
    const rawWorkspaces = data?.getWorkspaces;
    if (!Array.isArray(rawWorkspaces)) return [];
    return rawWorkspaces;
  }, [data]);

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
    loading,
    currentUser,
    refetch,
  };
};
