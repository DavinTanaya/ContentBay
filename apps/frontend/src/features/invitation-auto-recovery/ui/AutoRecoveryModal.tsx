import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Typography, Space, message } from 'antd';
import { MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useGetMyPendingInvitationsApi, acceptInvitationApi } from '@/entities/workspace';
import type { WorkspaceInvitation } from '@/entities/workspace';
import { getErrorMessage } from '@/shared/utils/errorHandler';

const { Text, Title } = Typography;

export const AutoRecoveryModal = () => {
  const { data, loading } = useGetMyPendingInvitationsApi();
  const [isAccepting, setIsAccepting] = useState(false);

  const [visible, setVisible] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const invitations: WorkspaceInvitation[] = data?.getMyPendingInvitations || [];

  useEffect(() => {
    // Only show if there are invitations and we haven't dismissed this modal in the current session
    if (!loading && invitations.length > 0 && !sessionStorage.getItem('hasSeenAutoRecovery')) {
      setVisible(true);
    }
  }, [invitations.length, loading]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem('hasSeenAutoRecovery', 'true');
  };

  const handleAccept = async (token: string, id: string) => {
    try {
      setAcceptingId(id);
      setIsAccepting(true);
      await acceptInvitationApi(token);
      message.success('Successfully joined the workspace!');
      
      // If that was the last invitation, close the modal automatically
      if (invitations.length <= 1) {
        handleClose();
      }
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to accept invitation'));
    } finally {
      setAcceptingId(null);
      setIsAccepting(false);
    }
  };

  if (!invitations.length) return null;

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={
        <Button onClick={handleClose}>
          Review Later
        </Button>
      }
      title={
        <Space>
          <MailOutlined className="text-blue-500 text-xl" />
          <span>You have pending workspace invitations!</span>
        </Space>
      }
      width={500}
    >
      <div className="py-4">
        <Text className="text-gray-500 block mb-4">
          We found {invitations.length} invitation(s) sent to your email address. You can accept them now to immediately access these workspaces.
        </Text>
        
        <List
          dataSource={invitations}
          renderItem={(item) => (
            <List.Item className="border rounded-lg p-4 mb-3 bg-blue-50/30">
              <div className="flex justify-between items-center w-full">
                <div>
                  <Title level={5} className="!m-0 text-gray-800">{item.workspace.name}</Title>
                  <Text type="secondary" className="text-sm">
                    Invited by {item.inviter.firstName} {item.inviter.lastName}
                  </Text>
                </div>
                <Button 
                  type="primary" 
                  icon={<CheckCircleOutlined />}
                  loading={acceptingId === item.id || isAccepting}
                  onClick={() => handleAccept(item.token, item.id)}
                >
                  Accept
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};
