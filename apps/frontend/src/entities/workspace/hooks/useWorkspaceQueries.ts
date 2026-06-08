import { useQuery } from '@apollo/client/react';
import {
  GET_WORKSPACES,
  GET_WORKSPACE,
  GET_INVITATION_DETAILS,
} from '../api/queries';
import type { Workspace } from '../model/types';

export const useGetWorkspacesApi = () => {
  return useQuery<{ getWorkspaces: Workspace[] }>(GET_WORKSPACES, {
    fetchPolicy: 'network-only',
  });
};

export const useGetWorkspaceApi = (id: string) => {
  return useQuery<{ getWorkspace: Workspace }, { id: string }>(GET_WORKSPACE, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });
};

export const useGetInvitationDetailsApi = (token: string) => {
  return useQuery<{ getInvitationDetails: any }, { token: string }>(
    GET_INVITATION_DETAILS,
    {
      variables: { token },
      skip: !token,
      fetchPolicy: 'network-only',
    },
  );
};
