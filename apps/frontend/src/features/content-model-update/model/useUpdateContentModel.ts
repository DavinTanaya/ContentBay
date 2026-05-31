import { useMutation } from '@apollo/client/react';
import { message } from 'antd';
import { useUpdateContentModelApi } from '../api/update-content-model.api';
import type { ContentModelIcon } from '@entities/content-model';

interface UpdateIdentityInput {
  name: string;
  description?: string;
  apiId: string;
  icon?: ContentModelIcon;
}

export const useUpdateContentModel = (modelId: string) => {
  const [updateMutation, { loading }] = useUpdateContentModelApi(modelId);

  const updateIdentity = async (input: UpdateIdentityInput) => {
    try {
      await updateMutation({
        variables: {
          id: modelId,
          input: {
            name: input.name,
            description: input.description,
            apiId: input.apiId,
            icon: input.icon,
          },
        },
      });
      message.success('Content model identity updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      message.error('Failed to update content model identity');
    }
  };

  return {
    updateIdentity,
    isUpdating: loading,
  };
};
