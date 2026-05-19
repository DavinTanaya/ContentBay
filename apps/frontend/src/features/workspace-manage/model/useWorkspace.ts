import { useState, useEffect } from 'react';
import { Form, Modal, message } from 'antd';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  types: number;
  env: number;
  records: string;
  updated: string;
  members: string[];
  createdAt?: number;
}

const DEFAULT_WORKSPACES: Workspace[] = [];

export const useWorkspace = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Load workspaces from localStorage or initialize with empty list
  useEffect(() => {
    const stored = localStorage.getItem('contentbay_workspaces');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // If it's legacy dummy workspaces, clear them to start clean
        if (Array.isArray(parsed) && parsed.some((w: any) => w.id === 'project-1' || w.id === 'project-2')) {
          setWorkspaces([]);
          localStorage.setItem('contentbay_workspaces', JSON.stringify([]));
        } else {
          setWorkspaces(parsed);
        }
      } catch {
        setWorkspaces([]);
      }
    } else {
      setWorkspaces([]);
      localStorage.setItem('contentbay_workspaces', JSON.stringify([]));
    }
  }, []);

  const saveWorkspaces = (updated: Workspace[]) => {
    setWorkspaces(updated);
    localStorage.setItem('contentbay_workspaces', JSON.stringify(updated));
  };

  const handleAddWorkspace = (values: { name: string }) => {
    const newSpace: Workspace = {
      id: `project-${Date.now()}`,
      name: values.name,
      description: '',
      types: 0,
      env: 1,
      records: '0',
      updated: 'Updated just now',
      createdAt: Date.now(),
      members: ['U'], // Current User
    };

    const updated = [newSpace, ...workspaces];
    saveWorkspaces(updated);
    setIsModalOpen(false);
    form.resetFields();
    message.success(`Workspace "${values.name}" created successfully!`);
  };

  const handleDeleteWorkspace = (id: string, name: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this space?',
      content: `This will permanently delete the workspace "${name}" and all of its configurations.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        const updated = workspaces.filter((w) => w.id !== id);
        saveWorkspaces(updated);
        message.success(`Workspace "${name}" has been deleted.`);
      },
    });
  };

  const getSpaceMembers = (spaceId: string, defaultInitials: string[]): string[] => {
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
    return defaultInitials;
  };

  const getRelativeTime = (updatedStr: string, createdAtTimestamp?: number): string => {
    if (!createdAtTimestamp) return updatedStr;
    const diffMs = Date.now() - createdAtTimestamp;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Updated just now';
    if (diffMins < 60) return `Updated ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Updated ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `Updated ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const filteredWorkspaces = workspaces.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
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
  };
};
