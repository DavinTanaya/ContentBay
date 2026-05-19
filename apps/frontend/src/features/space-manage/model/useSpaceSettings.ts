import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';

export interface WorkspaceSpace {
  id: string;
  name: string;
  description: string;
  types: number;
  env: number;
  records: string;
  updated: string;
  members: string[];
}

export const useSpaceSettings = () => {
  const navigate = useNavigate();
  const [activeSpace, setActiveSpace] = useState<WorkspaceSpace | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const activeId = localStorage.getItem('active_workspace_id');
    const stored = localStorage.getItem('contentbay_workspaces');
    if (activeId && stored) {
      try {
        const list: WorkspaceSpace[] = JSON.parse(stored);
        const match = list.find((w) => w.id === activeId);
        if (match) {
          setActiveSpace(match);
          setNewName(match.name);
        } else if (list.length > 0) {
          setActiveSpace(list[0]);
          setNewName(list[0].name);
          localStorage.setItem('active_workspace_id', list[0].id);
        }
      } catch {}
    }
  }, []);

  const handleCopyId = () => {
    if (activeSpace?.id) {
      navigator.clipboard.writeText(activeSpace.id);
      message.success('Space ID copied to clipboard!');
    }
  };

  const handleRename = () => {
    if (!newName.trim()) {
      message.error('Space name cannot be empty!');
      return;
    }
    const stored = localStorage.getItem('contentbay_workspaces');
    if (stored && activeSpace) {
      try {
        const list: WorkspaceSpace[] = JSON.parse(stored);
        const updated = list.map((w) => {
          if (w.id === activeSpace.id) {
            return { ...w, name: newName };
          }
          return w;
        });
        localStorage.setItem('contentbay_workspaces', JSON.stringify(updated));
        setActiveSpace({ ...activeSpace, name: newName });
        message.success(`Workspace renamed to "${newName}" successfully!`);
      } catch {
        message.error('Failed to rename workspace space.');
      }
    }
  };

  const handleDelete = () => {
    if (!activeSpace) return;

    Modal.confirm({
      title: 'Are you absolutely sure?',
      content: 'This action is irreversible and will permanently delete this workspace space along with all nested content schemas.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        const stored = localStorage.getItem('contentbay_workspaces');
        if (stored) {
          try {
            const list: WorkspaceSpace[] = JSON.parse(stored);
            const updated = list.filter((w) => w.id !== activeSpace.id);
            localStorage.setItem('contentbay_workspaces', JSON.stringify(updated));
            localStorage.removeItem('active_workspace_id');
            
            // Clean up content models & users maps for this space
            localStorage.removeItem(`contentbay_space_models_${activeSpace.id}`);
            localStorage.removeItem(`contentbay_users_${activeSpace.id}`);

            message.success(`Workspace "${activeSpace.name}" has been deleted.`);
            navigate('/workspace');
          } catch {
            message.error('Failed to delete workspace.');
          }
        }
      },
    });
  };

  return {
    activeSpace,
    newName,
    setNewName,
    handleCopyId,
    handleRename,
    handleDelete,
  };
};
