import { useQuery } from '@apollo/client/react';
import { GET_WORKSPACES, GET_WORKSPACE } from './get-workspaces.query';
import type { Workspace } from '../model/workspace.types';

export const useGetWorkspacesApi = () => {
  return useQuery<{ getWorkspaces: Workspace[] }>(GET_WORKSPACES, {
    fetchPolicy: 'network-only',
  });
};

export const useGetWorkspaceApi = (id: string) => {
  return useQuery<{ getWorkspace: Workspace }>(GET_WORKSPACE, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });
};
