import { useState, useEffect } from 'react';
import { useActiveWorkspaceId, useGetWorkspaceApi, useInviteMemberApi, GET_WORKSPACE } from '@/entities/workspace';
import type { WorkspaceMemberViewModel } from '@/entities/workspace/model/types';
import type { InviteMemberDto } from '@/entities/workspace/model/dto';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  twoFactorStatus: string;
  userId: number;
}

export const useUsersManagement = () => {
  const activeSpaceId = useActiveWorkspaceId();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Newest');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data, loading, refetch } = useGetWorkspaceApi(activeSpaceId);
  const [inviteMember] = useInviteMemberApi({
    onCompleted: () => {
      refetch();
    },
    // Refetch the specific workspace to update member list
    refetchQueries: [{ query: GET_WORKSPACE, variables: { id: activeSpaceId } }]
  });

  const members: WorkspaceMemberViewModel[] = (data?.getWorkspace?.members || []).map(m => ({
    id: m.id,
    userId: m.userId,
    name: `${m.user.firstName || ''} ${m.user.lastName || ''}`.trim() || '',
    email: m.user.email,
    role: m.role,
    picture: m.user.picture || undefined,
  })).sort((a, b) => {
    if (a.role === 'Owner' && b.role !== 'Owner') return -1;
    if (a.role !== 'Owner' && b.role === 'Owner') return 1;
    return a.name.localeCompare(b.name);
  });

  // Map to ManagedUser format for the table
  const users: ManagedUser[] = members.map(m => ({
    id: m.id,
    userId: m.userId,
    name: m.name,
    email: m.email,
    role: m.role,
    lastActive: '⎯⎯', // Not implemented in DB yet
    twoFactorStatus: '⎯⎯',
  }));

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus, pageSize]);

  const handleInviteUser = async (values: { email: string; role: string }) => {
    if (!activeSpaceId) return;
    
    const input: InviteMemberDto = {
      workspaceId: activeSpaceId,
      email: values.email,
      role: values.role
    };

    return await inviteMember({
      variables: input
    });
  };

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
    isInviteModalOpen,
    setIsInviteModalOpen,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    selectedUserIds,
    handleSelectAll,
    handleSelectUser,
    handleInviteUser,
    startIndex,
    endIndex,
    loading
  };
};
