import { useMutation } from '@apollo/client/react';
import { message } from 'antd';
import { CREATE_CONTENT_MODEL } from '@/entities/content-model/api/content-model.mutations';
import { GET_CONTENT_MODELS } from '@/entities/content-model/api/content-model.queries';

interface CreateModelInput {
  name: string;
  apiId: string;
  description: string;
}

export const useCreateContentModel = (onSuccess: () => void) => {
  const [createModel, { loading }] = useMutation(CREATE_CONTENT_MODEL, {
    refetchQueries: [GET_CONTENT_MODELS],
    onCompleted: () => {
      message.success('Content Model created successfully!');
      onSuccess();
    },
    onError: (error) => {
      message.error(error.message || 'Failed to create Content Model');
    },
  });

  const handleCreate = (input: CreateModelInput) => {
    return createModel({
      variables: { input },
    });
  };

  return {
    create: handleCreate,
    loading,
  };
};
