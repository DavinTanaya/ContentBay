import React from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useWorkspaceDeleteConfirmation } from '../model/useWorkspaceDeleteConfirmation';

export interface WorkspaceDeleteConfirmationProps {
  isOpen: boolean;
  onCancel: () => void;
  workspaceId: string;
  workspaceName: string;
}

export function WorkspaceDeleteConfirmation({
  isOpen,
  onCancel,
  workspaceId,
  workspaceName,
}: WorkspaceDeleteConfirmationProps) {
  const { handleDelete, loading } = useWorkspaceDeleteConfirmation();

  const onConfirm = async () => {
    try {
      await handleDelete({ workspaceId });
      message.success(`Workspace "${workspaceName}" has been deleted.`);
      onCancel();
    } catch (err: unknown) {
      const error = err as Error;
      message.error(error.message || 'Failed to delete workspace.');
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      onOk={onConfirm}
      confirmLoading={loading}
      okText="Yes, Delete Space"
      okType="danger"
      cancelText="Cancel"
      centered
      width={440}
      okButtonProps={{
        size: 'large',
        className: 'rounded-xl h-11 px-6 font-medium font-poppins shadow-sm',
        style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#ffffff' },
      }}
      cancelButtonProps={{
        size: 'large',
        className: 'rounded-xl h-11 px-6 font-medium font-poppins border-gray-4 text-gray-8 hover:text-gray-13 hover:border-gray-6',
        style: { borderRadius: '12px' },
      }}
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 mb-6 shadow-sm shadow-blue-500/10">
          <ExclamationCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        </div>
        <h3 className="font-poppins text-lg font-bold text-gray-13 mb-3 leading-snug">
          Are you absolutely sure?
        </h3>
        <p className="font-poppins text-sm text-gray-8 leading-relaxed mb-0">
          This action is <span className="font-semibold text-red-5" style={{ color: '#ff4d4f' }}>irreversible</span> and will permanently delete the workspace <span className="font-semibold text-gray-10" style={{ color: '#262626' }}>"{workspaceName}"</span> along with all nested content schemas and configuration histories.
        </p>
      </div>
    </Modal>
  );
}
