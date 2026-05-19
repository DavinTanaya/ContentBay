import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useSession } from '@/entities/session';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  twoFactorStatus: string;
}

export const DEFAULT_USERS: ManagedUser[] = [
  {
    id: 'user-1',
    name: 'User 1',
    email: 'user1@gmail.com',
    role: 'Owner',
    lastActive: 'An hour ago',
    twoFactorStatus: '⎯⎯',
  },
];

export const useUsersManagement = () => {
  const { user: currentUser } = useSession();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Newest');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [form] = Form.useForm();

  const activeSpaceId = localStorage.getItem('active_workspace_id') || 'project-1';
  const userStorageKey = `contentbay_users_${activeSpaceId}`;

  useEffect(() => {
    const ownerName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : 'User Owner';
    const ownerEmail = currentUser?.email || 'owner@gmail.com';

    const stored = localStorage.getItem(userStorageKey);
    if (stored) {
      try {
        const parsed: ManagedUser[] = JSON.parse(stored);
        // Selalu sinkronkan Owner dengan user yang login sekarang
        const updated = parsed.map((u) => {
          if (u.role === 'Owner') {
            return {
              ...u,
              name: ownerName,
              email: ownerEmail,
            };
          }
          return u;
        });
        setUsers(updated);
        localStorage.setItem(userStorageKey, JSON.stringify(updated));
      } catch {
        const fallback = [
          {
            id: 'owner-id',
            name: ownerName,
            email: ownerEmail,
            role: 'Owner',
            lastActive: 'Online now',
            twoFactorStatus: '⎯⎯',
          }
        ];
        setUsers(fallback);
        localStorage.setItem(userStorageKey, JSON.stringify(fallback));
      }
    } else {
      const initialUsersForSpace = [
        {
          id: 'owner-id',
          name: ownerName,
          email: ownerEmail,
          role: 'Owner',
          lastActive: 'Online now',
          twoFactorStatus: '⎯⎯',
        }
      ];
      setUsers(initialUsersForSpace);
      localStorage.setItem(userStorageKey, JSON.stringify(initialUsersForSpace));
    }
  }, [userStorageKey, activeSpaceId, currentUser]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus, pageSize]);

  const saveUsers = (updated: ManagedUser[]) => {
    setUsers(updated);
    localStorage.setItem(userStorageKey, JSON.stringify(updated));
  };

  const handleInviteUser = (values: { name: string; email: string; role: string }) => {
    const newUser: ManagedUser = {
      id: `user-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: values.role,
      lastActive: 'Just now',
      twoFactorStatus: '⎯⎯',
    };

    const updated = [...users, newUser];
    saveUsers(updated);
    setIsInviteModalOpen(false);
    form.resetFields();
    message.success(`Invited user "${values.name}" successfully!`);
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
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    form,
    startIndex,
    endIndex,
  };
};
