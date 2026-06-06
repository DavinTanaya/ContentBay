import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useWorkspaceInvite } from '../model/useWorkspaceInvite';
import { WorkspaceInviteModal } from './WorkspaceInviteModal';

export interface WorkspaceInviteButtonProps {
  workspaceId?: string;
  asMenuItem?: boolean;
}

export function WorkspaceInviteButton({
  workspaceId,
  asMenuItem,
}: WorkspaceInviteButtonProps) {
  const { isModalOpen, openModal, closeModal, handleInvite } =
    useWorkspaceInvite(workspaceId);

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
          <UserAddOutlined className="mr-2" />
          Invite User
        </span>
      ) : (
        <Button
          type="primary"
          variant="solid"
          color="geekblue"
          size="large"
          icon={<UserAddOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
          className="shadow-sm font-semibold"
        >
          Invite users
        </Button>
      )}

      <WorkspaceInviteModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onInvite={handleInvite}
      />
    </>
  );
}
