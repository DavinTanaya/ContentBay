import { useState } from 'react';
import { useActiveWorkspaceId, useGetWorkspaceApi } from '@/entities/workspace';
import type { WorkspaceMember } from '@/entities/workspace';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  twoFactorStatus: string;
  userId: number;
}

export const useWorkspaceUsers = () => {
  const activeSpaceId = useActiveWorkspaceId();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Newest');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data, loading } = useGetWorkspaceApi(activeSpaceId);

  const rawMembers: WorkspaceMember[] = data?.getWorkspace?.members || [];

  const users: ManagedUser[] = rawMembers
    .map((m: WorkspaceMember) => ({
      id: m.id,
      userId: m.userId,
      name: `${m.user?.firstName || ''} ${m.user?.lastName || ''}`.trim() || '',
      email: m.user?.email || '',
      role: m.role,
      lastActive: '⎯⎯', // Not implemented in DB yet
      twoFactorStatus: '⎯⎯',
    }))
    .sort((a, b) => {
      if (a.role === 'Owner' && b.role !== 'Owner') return -1;
      if (a.role !== 'Owner' && b.role === 'Owner') return 1;
      return a.name.localeCompare(b.name);
    });

  // Reset page to 1 when filters change
  const currentFilterKey = `${searchQuery}-${selectedRole}-${selectedStatus}-${pageSize}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);
  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setCurrentPage(1);
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(users.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUserIds([...selectedUserIds, id]);
    } else {
      setSelectedUserIds(selectedUserIds.filter((uid) => uid !== id));
    }
  };

  const filteredUsers = users.filter((u) => {
    const name = u.name || '';
    const email = u.email || '';
    const search = searchQuery?.toLowerCase() || '';

    const matchesSearch =
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search);

    const matchesRole = selectedRole === 'Any' || u.role === selectedRole;
    const matchesStatus =
      selectedStatus === 'Any' ||
      (selectedStatus === 'Active' && u.lastActive !== 'Inactive') ||
      (selectedStatus === 'Inactive' && u.lastActive === 'Inactive');

    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.id.localeCompare(a.id);
    } else if (sortBy === 'Oldest') {
      return a.id.localeCompare(b.id);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return {
    users,
    paginatedUsers,
    sortedUsers,
    filteredUsersCount: filteredUsers.length,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    selectedUserIds,
    handleSelectAll,
    handleSelectUser,
    startIndex,
    endIndex,
    loading,
  };
};
