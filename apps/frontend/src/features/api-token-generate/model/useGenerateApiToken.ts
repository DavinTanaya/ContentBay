import { useState } from 'react';
import { message } from 'antd';
import { useGenerateApiTokenApi } from '@/entities/api-token';

export const useGenerateApiToken = (workspaceId: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const [generateApiToken, { loading }] = useGenerateApiTokenApi();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeTokenDisplay = () => setGeneratedToken(null);

  const handleGenerate = async (values: { name: string }) => {
    try {
      const res = await generateApiToken({
        variables: { workspaceId, name: values.name },
      });
      if (res.data) {
        setGeneratedToken(res.data.generateApiToken.plainTextToken);
        message.success('API Token generated successfully!');
        closeModal();
      }
    } catch (err: any) {
      const errorMessage =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        'Failed to generate API token.';
      message.error(errorMessage);
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
