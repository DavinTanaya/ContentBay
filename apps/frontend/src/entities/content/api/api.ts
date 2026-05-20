import { useMutation, useQuery } from '@apollo/client/react';
import { GET_CONTENTS, GET_CONTENT } from './queries';
import { CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from './mutations';
import type { Content } from '../model/types';

export const useGetContentsApi = (workspaceId: string, contentModelId?: string) => {
  return useQuery<{ getContents: Content[] }>(GET_CONTENTS, {
    variables: { workspaceId, contentModelId },
    skip: !workspaceId,
  });
};

export const useGetContentApi = (id: string) => {
  return useQuery<{ getContent: Content }>(GET_CONTENT, {
    variables: { id },
    skip: !id,
  });
};

export const useCreateContentApi = (workspaceId: string, contentModelId?: string) => {
  return useMutation<{ createContent: Content }>(CREATE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
};

export const useUpdateContentApi = (workspaceId: string, contentModelId?: string) => {
  return useMutation<{ updateContent: Content }>(UPDATE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
};

export const useDeleteContentApi = (workspaceId: string, contentModelId?: string) => {
  return useMutation<boolean>(DELETE_CONTENT, {
    refetchQueries: [
      {
        query: GET_CONTENTS,
        variables: { workspaceId, contentModelId },
      },
    ],
    awaitRefetchQueries: true,
  });
};
