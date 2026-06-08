import React, { useState } from 'react';
import { Form, message } from 'antd';
import { createContentModelApi } from '@entities/content-model';
import type {
  CreateContentModelInput,
  ContentModelIcon,
} from '@entities/content-model';
import { useActiveWorkspaceId } from '@/entities/workspace';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export interface CreateContentModelFormValues {
  name: string;
  apiId: string;
  description?: string;
  icon?: ContentModelIcon;
}

export const useCreateContentModel = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false);
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

  const handleCreate = async (values: CreateContentModelFormValues) => {
    const input: CreateContentModelInput = {
      workspaceId: activeSpaceId,
      name: values.name,
      apiId: values.apiId,
      description: values.description || '',
      icon: values.icon || 'box',
    };

    setLoading(true);
    try {
      await createContentModelApi(input);
      message.success('Content Model created successfully!');
      onSuccess();
    } catch (error: unknown) {
      message.error(getErrorMessage(error, 'Failed to create Content Model'));
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleNameChange,
    onFinish: handleCreate,
    loading,
  };
};
