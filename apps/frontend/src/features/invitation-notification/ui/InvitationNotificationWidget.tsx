import React from 'react';
import { Badge, Popover, Button, List, Typography, Space, message, Spin } from 'antd';
import { BellOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useGetMyPendingInvitationsApi, useDeclineInvitationApi } from '@/entities/workspace-invitation';
import { useAcceptInvitationApi } from '@/entities/workspace/api/api';
import type { WorkspaceInvitation } from '@/entities/workspace-invitation';

const { Text } = Typography;

export const InvitationNotificationWidget = () => {
  const { data, loading, refetch } = useGetMyPendingInvitationsApi();
  const [declineInvitation] = useDeclineInvitationApi();
  const [acceptInvitation] = useAcceptInvitationApi({
    refetchQueries: ['GetMyPendingInvitations', 'GetWorkspaces'], // Update both counts and workspace list
  });

  const invitations: WorkspaceInvitation[] = data?.getMyPendingInvitations || [];
  const pendingCount = invitations.length;

  const handleAccept = async (token: string) => {
    try {
      await acceptInvitation({ variables: { token } });
      message.success('Invitation accepted!');
    } catch (err: any) {
      message.error(err?.message || 'Failed to accept invitation');
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineInvitation({ variables: { id } });
      message.success('Invitation declined.');
    } catch (err: any) {
      message.error(err?.message || 'Failed to decline invitation');
    }
  };

  const content = (
    <div className="w-80 max-h-96 overflow-y-auto">
      <List
        loading={loading}
        dataSource={invitations}
        locale={{ emptyText: 'No pending invitations' }}
        renderItem={(item) => (
          <List.Item className="flex flex-col items-start gap-2 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
            <div className="w-full">
              <Text strong className="block text-gray-800">{item.workspace.name}</Text>
              <Text type="secondary" className="text-xs">
                Invited by {item.inviter.firstName} {item.inviter.lastName}
              </Text>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Space className="w-full justify-end mt-2">
              <Button 
                size="small" 
                danger 
                icon={<CloseOutlined />} 
                onClick={() => handleDecline(item.id)}
              >
                Decline
              </Button>
              <Button 
                size="small" 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={() => handleAccept(item.token)}
              >
                Accept
              </Button>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Popover 
      content={content} 
      title={<div className="font-semibold px-1 py-1">Workspace Invitations</div>} 
      trigger="click" 
      placement="bottomRight"
    >
      <Button shape="circle" type="text" className="relative h-10 w-10 flex items-center justify-center">
        <Badge count={pendingCount} size="small" offset={[2, -2]}>
          <BellOutlined className="text-xl text-gray-600 hover:text-blue-500 transition-colors" />
        </Badge>
      </Button>
    </Popover>
  );
};
