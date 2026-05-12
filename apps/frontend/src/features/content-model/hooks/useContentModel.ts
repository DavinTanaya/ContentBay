import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CONTENT_MODEL } from "../../../graphql/queries/content-model";
import { UPDATE_CONTENT_MODEL } from "../../../graphql/mutations/content-model";
import type { ContentModel } from "../content-model.type";

export const useContentModel = (id?: string) => {
  const { data, loading, error, refetch } = useQuery<{ getContentModel: ContentModel }>(GET_CONTENT_MODEL, {
    variables: { id },
    skip: !id,
  });

  const [updateModel] = useMutation(UPDATE_CONTENT_MODEL, {
    onCompleted: () => refetch(),
  });

  return {
    model: data?.getContentModel,
    loading,
    error,
    updateModel: (input: any) => updateModel({ variables: { id, input } }),
    refresh: refetch,
  };
};
