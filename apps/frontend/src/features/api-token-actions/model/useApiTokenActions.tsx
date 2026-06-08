import { useState } from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { useRevokeApiTokenApi, useRegenerateApiTokenApi } from '@/entities/api-token';

const { confirm } = Modal;

export const useApiTokenActions = () => {
  const [revokeApiToken, { loading: revoking }] = useRevokeApiTokenApi();
  const [regenerateApiToken, { loading: regenerating }] = useRegenerateApiTokenApi();
  const [regeneratedToken, setRegeneratedToken] = useState<string | null>(null);

  const closeRegenerateDisplay = () => setRegeneratedToken(null);

  const handleRevoke = (tokenId: string, name: string) => {
    confirm({
      title: 'Are you sure you want to revoke this API Token?',
      icon: <ExclamationCircleOutlined />,
      content: `The token "${name}" will stop working immediately. Any application using it will lose access to the CMS.`,
      okText: 'Yes, Revoke Token',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await revokeApiToken({ variables: { tokenId } });
          message.success(`Token "${name}" has been revoked successfully.`);
        } catch (err: any) {
          message.error(err?.message || 'Failed to revoke token.');
        }
      },
    });
  };

  const handleRegenerate = (tokenId: string, name: string) => {
    confirm({
      title: 'Regenerate API Token?',
      icon: <ExclamationCircleFilled />,
      content: `This will immediately revoke the current token "${name}" and generate a new one. Applications using the old token will lose access until updated.`,
      okText: 'Yes, Regenerate',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const res = await regenerateApiToken({ variables: { tokenId } });
          if (res.data) {
            setRegeneratedToken(res.data.regenerateApiToken.plainTextToken);
            message.success(`Token "${name}" has been regenerated successfully.`);
          }
        } catch (err: any) {
          message.error(err?.message || 'Failed to regenerate token.');
        }
      },
    });
  };

  return {
    handleRevoke,
    handleRegenerate,
    revoking,
    regenerating,
    regeneratedToken,
    closeRegenerateDisplay,
  };
};
