import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_WORKSPACE, UPDATE_WORKSPACE, DELETE_WORKSPACE, useActiveWorkspaceId } from '@/entities/workspace';
import type { Workspace } from '@/entities/workspace';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const useSpaceSettings = () => {
  const navigate = useNavigate();
  const activeId = useActiveWorkspaceId();
  const [newName, setNewName] = useState('');

  // Fetch workspace details from the database using GraphQL query
  const { data, loading, refetch } = useQuery(GET_WORKSPACE, {
    variables: { id: activeId },
    skip: !activeId,
    fetchPolicy: 'network-only',
  });

  const activeSpace: Workspace | null = data?.getWorkspace || null;

  // Set the input field to match the workspace's name once fetched
  useEffect(() => {
    if (activeSpace?.name) {
      setNewName(activeSpace.name);
    }
  }, [activeSpace]);

  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE, {
    onCompleted: (res) => {
      message.success(`Workspace renamed to "${res.updateWorkspace.name}" successfully!`);
      refetch();
    },
    onError: (err) => {
      message.error(err.message || 'Failed to rename workspace space.');
    },
  });

  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE, {
    onCompleted: () => {
      message.success(`Workspace has been deleted.`);
      localStorage.removeItem('active_workspace_id');
      navigate('/workspace');
    },
    onError: (err) => {
      message.error(err.message || 'Failed to delete workspace.');
    },
  });

  const handleCopyId = () => {
    if (activeSpace?.id) {
      navigator.clipboard.writeText(activeSpace.id);
      message.success('Space ID copied to clipboard!');
    }
  };

  const handleRename = async () => {
    if (!newName.trim()) {
      message.error('Space name cannot be empty!');
      return;
    }
    if (!activeId) return;

    try {
      await updateWorkspace({
        variables: {
          id: activeId,
          name: newName,
        },
      });
    } catch {}
  };

  const handleDelete = () => {
    if (!activeId || !activeSpace) return;

    Modal.confirm({
      icon: null, // Hide default ugly icon
      title: null, // Hide standard title
      content: (
        <div className="flex flex-col items-center text-center p-4">
          {/* Elegant Circular Blue Icon Container */}
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 mb-6 shadow-sm shadow-blue-500/10">
            <ExclamationCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
          </div>
          
          <h3 className="font-poppins text-lg font-bold text-gray-13 mb-3 leading-snug">
            Are you absolutely sure?
          </h3>
          
          <p className="font-poppins text-sm text-gray-8 leading-relaxed mb-0">
            This action is <span className="font-semibold text-red-5" style={{ color: '#ff4d4f' }}>irreversible</span> and will permanently delete the workspace <span className="font-semibold text-gray-10" style={{ color: '#262626' }}>"{activeSpace.name}"</span> along with all nested content schemas.
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
        }
      },
      cancelButtonProps: {
        size: 'large',
        className: 'rounded-xl h-11 px-6 font-medium font-poppins border-gray-4 text-gray-8 hover:text-gray-13 hover:border-gray-6',
        style: {
          borderRadius: '12px',
        }
      },
      onOk: async () => {
        try {
          await deleteWorkspace({
            variables: { id: activeId },
          });
        } catch {}
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
    loading,
  };
};
