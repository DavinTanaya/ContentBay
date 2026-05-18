import { useMutation } from '@apollo/client/react';
import { message } from 'antd';
import { UPDATE_CONTENT_MODEL } from '@/entities/content-model/api/content-model.mutations';
import type { ContentModelIcon } from '@/entities/content-model/model/content-model.types';

interface UpdateIdentityInput {
  name: string;
  description?: string;
  apiId: string;
  icon?: ContentModelIcon;
}

export const useUpdateContentModel = (modelId: string) => {
  const [updateMutation, { loading }] = useMutation(UPDATE_CONTENT_MODEL);

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
