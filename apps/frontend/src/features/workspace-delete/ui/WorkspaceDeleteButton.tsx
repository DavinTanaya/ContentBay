import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useWorkspaceDeleteButton } from '../model/useWorkspaceDeleteButton';
import { WorkspaceDeleteConfirmation } from './WorkspaceDeleteConfirmation';

export interface WorkspaceDeleteButtonProps {
  workspaceId: string;
  workspaceName: string;
  asMenuItem?: boolean;
}

export function WorkspaceDeleteButton({
  workspaceId,
  workspaceName,
  asMenuItem,
}: WorkspaceDeleteButtonProps) {
  const { isModalOpen, openModal, closeModal } = useWorkspaceDeleteButton();

  return (
    <>
      {asMenuItem ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
          className="flex items-center w-full"
        >
          <DeleteOutlined className="mr-2" />
          Delete Space
        </span>
      ) : (
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
        >
          Delete Space
        </Button>
      )}

      <WorkspaceDeleteConfirmation
        isOpen={isModalOpen}
        onCancel={closeModal}
        workspaceId={workspaceId}
        workspaceName={workspaceName}
      />
    </>
  );
}
