import { useState } from 'react';
import { message } from 'antd';
import { updateContentModelApi } from '@entities/content-model';
import type { ContentModelIcon } from '@entities/content-model';
import { getErrorMessage } from '@/shared/utils/errorHandler';

interface UpdateIdentityInput {
  name: string;
  description?: string;
  apiId: string;
  icon?: ContentModelIcon;
}

export const useUpdateContentModel = (modelId: string) => {
  const [loading, setLoading] = useState(false);

  const updateIdentity = async (input: UpdateIdentityInput) => {
    setLoading(true);
    try {
      await updateContentModelApi(modelId, {
        name: input.name,
        description: input.description,
        apiId: input.apiId,
        icon: input.icon,
      });
      message.success('Content model identity updated successfully');
    } catch (error: unknown) {
      message.error(getErrorMessage(error, 'Failed to update content model identity'));
    } finally {
      setLoading(false);
    }
  };

  return {
    updateIdentity,
    isUpdating: loading,
  };
};
