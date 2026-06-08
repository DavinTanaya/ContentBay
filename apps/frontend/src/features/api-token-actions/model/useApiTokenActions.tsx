import { useState } from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { revokeApiTokenApi, regenerateApiTokenApi } from '@/entities/api-token';
import { getErrorMessage } from '@/shared/utils/errorHandler';

const { confirm } = Modal;

export const useApiTokenActions = () => {
  const [revoking, setRevoking] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
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
        setRevoking(true);
        try {
          await revokeApiTokenApi(tokenId);
          message.success(`Token "${name}" has been revoked successfully.`);
        } catch (err: unknown) {
          message.error(getErrorMessage(err, 'Failed to revoke token.'));
        } finally {
          setRevoking(false);
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
        setRegenerating(true);
        try {
          const res = await regenerateApiTokenApi(tokenId);
          if (res) {
            setRegeneratedToken(res.plainTextToken);
            message.success(`Token "${name}" has been regenerated successfully.`);
          }
        } catch (err: unknown) {
          message.error(getErrorMessage(err, 'Failed to regenerate token.'));
        } finally {
          setRegenerating(false);
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
