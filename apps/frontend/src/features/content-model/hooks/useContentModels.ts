import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CONTENT_MODELS } from "../../../graphql/queries/content-model";
import { DELETE_CONTENT_MODEL } from "../../../graphql/mutations/content-model";
import type { ContentModel } from "../content-model.type";

export const useContentModels = () => {
  const { data, loading, error, refetch } = useQuery<{ getContentModels: ContentModel[] }>(GET_CONTENT_MODELS);
  
  const [deleteModel] = useMutation(DELETE_CONTENT_MODEL, {
    onCompleted: () => refetch(),
  });

  return {
    models: data?.getContentModels || [],
    loading,
    error,
    deleteModel: (id: string) => deleteModel({ variables: { id } }),
    refresh: refetch,
  };
};
