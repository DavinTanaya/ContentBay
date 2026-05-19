import React from 'react';
import { Form, message } from 'antd';
import { useCreateContentModelApi } from '@entities/content-model';
import type { CreateContentModelRequest, ContentModelIcon } from '@entities/content-model';

export const useCreateContentModel = (onSuccess: () => void) => {
  const [createModel, { loading }] = useCreateContentModelApi();
  const [form] = Form.useForm();

  const formatToApiId = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    form.setFieldsValue({
      apiId: formatToApiId(newName),
    });
  };

  interface CreateContentModelFormValues {
    name: string;
    apiId: string;
    description?: string;
    icon?: ContentModelIcon;
  }

  const handleCreate = async (values: CreateContentModelFormValues) => {
    const activeSpaceId = localStorage.getItem('active_workspace_id') || 'project-1';
    const suffixedApiId = `${values.apiId}-${activeSpaceId}`;

    const input: CreateContentModelRequest = {
      name: values.name,
      apiId: suffixedApiId,
      description: values.description || '',
      icon: values.icon || 'box',
    };

    try {
      const res = await createModel({
        variables: { input },
      });
      const newModelId = (res.data as any)?.createContentModel?.id;
      if (newModelId) {
        const activeSpaceId = localStorage.getItem('active_workspace_id') || 'project-1';
        const storageKey = `contentbay_space_models_${activeSpaceId}`;
        const spaceModelIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (!spaceModelIds.includes(newModelId)) {
          spaceModelIds.push(newModelId);
          localStorage.setItem(storageKey, JSON.stringify(spaceModelIds));
        }
      }
      message.success('Content Model created successfully!');
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to create Content Model';
      message.error(errorMessage);
    }
  };

  return {
    form,
    handleNameChange,
    onFinish: handleCreate,
    loading,
  };
};
