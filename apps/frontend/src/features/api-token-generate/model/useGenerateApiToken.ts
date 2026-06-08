import { useState } from 'react';
import { message } from 'antd';
import { generateApiTokenApi } from '@/entities/api-token/api/api';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export const useGenerateApiToken = (workspaceId: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeTokenDisplay = () => setGeneratedToken(null);

  const handleGenerate = async (values: { name: string }) => {
    setLoading(true);
    try {
      const res = await generateApiTokenApi(workspaceId, values.name);
      if (res) {
        setGeneratedToken(res.plainTextToken);
        message.success('API Token generated successfully!');
        closeModal();
      }
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to generate API token.'));
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleGenerate,
    loading,
    generatedToken,
    closeTokenDisplay,
  };
};
