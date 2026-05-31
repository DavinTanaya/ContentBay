import { useState } from 'react';
import { Form, Modal, message } from 'antd';
import { useGetWorkspacesApi } from '@/entities/workspace';
import {
  useCreateWorkspaceApi,
  useDeleteWorkspaceApi,
} from '@entities/workspace';
import type { Workspace } from '@/entities/workspace';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useSession } from '@/entities/session';

export const useWorkspace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { user: currentUser } = useSession();

  // Load workspaces using FSD compliant hook
  const { data, loading, refetch } = useGetWorkspacesApi();
  const workspaces: Workspace[] = data?.getWorkspaces ?? [];

  const [createWorkspace] = useCreateWorkspaceApi({
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteWorkspace] = useDeleteWorkspaceApi({
    onCompleted: () => {
      refetch();
    },
  });

  const handleAddWorkspace = async (values: { name: string }) => {
    try {
      await createWorkspace({
        variables: {
          input: {
            name: values.name,
            description: '',
          },
        },
      });
      setIsModalOpen(false);
      form.resetFields();
      message.success(`Workspace "${values.name}" created successfully!`);
    } catch (err: any) {
      message.error(err.message || 'Failed to create workspace.');
    }
  };

  const handleDeleteWorkspace = (id: string, name: string) => {
    Modal.confirm({
      icon: null, // Hide default ugly icon
      title: null, // Hide standard title
      content: (
        <div className="flex flex-col items-center text-center p-4">
          {/* Elegant Circular Blue Icon Container */}
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 mb-6 shadow-sm shadow-blue-500/10">
            <ExclamationCircleOutlined
              style={{ fontSize: '32px', color: '#1890ff' }}
            />
          </div>

          <h3 className="font-poppins text-lg font-bold text-gray-13 mb-3 leading-snug">
            Are you absolutely sure?
          </h3>

          <p className="font-poppins text-sm text-gray-8 leading-relaxed mb-0">
            This action is{' '}
            <span
              className="font-semibold text-red-5"
              style={{ color: '#ff4d4f' }}
            >
              irreversible
            </span>{' '}
            and will permanently delete the workspace{' '}
            <span
              className="font-semibold text-gray-10"
              style={{ color: '#262626' }}
            >
              "{name}"
            </span>{' '}
            along with all nested content schemas and configuration histories.
          </p>
        </div>
      ),
      okText: 'Yes, Delete Space',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      width: 440,
      okButtonProps: {
        size: 'large',
        className: 'rounded-xl h-11 px-6 font-medium font-poppins shadow-sm',
        style: {
          backgroundColor: '#ff4d4f',
          borderColor: '#ff4d4f',
          color: '#ffffff',
        },
      },
      cancelButtonProps: {
        size: 'large',
        className:
          'rounded-xl h-11 px-6 font-medium font-poppins border-gray-4 text-gray-8 hover:text-gray-13 hover:border-gray-6',
        style: {
          borderRadius: '12px',
        },
      },
      onOk: async () => {
        try {
          await deleteWorkspace({
            variables: { id },
          });
          message.success(`Workspace "${name}" has been deleted.`);
        } catch (err: any) {
          message.error(err.message || 'Failed to delete workspace.');
        }
      },
    });
  };

  const getSpaceMembers = (
    spaceId: string,
    defaultInitials: string[],
  ): string[] => {
    const userStorageKey = `contentbay_users_${spaceId}`;
    const stored = localStorage.getItem(userStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((u: any) => {
            const name = u.name || 'User';
            return name.trim().charAt(0).toUpperCase();
          });
        }
      } catch {}
    }

    // Fallback: Use dynamic logged-in user initial instead of hardcoded 'U'
    if (currentUser) {
      const initial = currentUser.firstName
        ? currentUser.firstName.charAt(0).toUpperCase()
        : currentUser.email.charAt(0).toUpperCase();
      return [initial];
    }

    return defaultInitials || ['U'];
  };

  const getRelativeTime = (
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

  const filteredWorkspaces = workspaces.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    filteredWorkspaces,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddWorkspace,
    handleDeleteWorkspace,
    getSpaceMembers,
    getRelativeTime,
    loading,
  };
};
