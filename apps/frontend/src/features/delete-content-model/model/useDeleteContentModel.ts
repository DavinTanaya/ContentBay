import { useMutation } from '@apollo/client/react';
import { DELETE_CONTENT_MODEL } from '../api/delete-content-model.api';
import { GET_CONTENT_MODELS } from '@/graphql/queries/content-model';

export const useDeleteContentModel = () => {
  const [deleteModel, { loading }] = useMutation(DELETE_CONTENT_MODEL, {
    refetchQueries: [GET_CONTENT_MODELS],
  });

  return {
    deleteModel: (id: string) => deleteModel({ variables: { id } }),
    loading,
  };
};
