import { useQuery } from '@apollo/client/react';
import { GET_CONTENTS, GET_CONTENT } from './get-contents.query';
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
