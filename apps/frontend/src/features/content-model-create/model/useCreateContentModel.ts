import React from 'react';
import { Form, message } from 'antd';
import { useCreateContentModelApi } from '@entities/content-model';
import type {
  CreateContentModelRequest,
  ContentModelIcon,
} from '@entities/content-model';
import { useActiveWorkspaceId } from '@/entities/workspace';

export const useCreateContentModel = (onSuccess: () => void) => {
  const [createModel, { loading }] = useCreateContentModelApi();
  const [form] = Form.useForm();
  const activeSpaceId = useActiveWorkspaceId();

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
    const input: CreateContentModelRequest = {
      workspaceId: activeSpaceId,
      name: values.name,
      apiId: values.apiId,
      description: values.description || '',
      icon: values.icon || 'box',
    };

    try {
      await createModel({
        variables: { input },
      });
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
