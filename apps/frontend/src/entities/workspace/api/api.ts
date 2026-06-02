import { useQuery, useMutation } from '@apollo/client/react';
import { GET_WORKSPACES, GET_WORKSPACE } from './queries';
import { CREATE_WORKSPACE, DELETE_WORKSPACE, UPDATE_WORKSPACE, INVITE_MEMBER } from './mutations';
import type { Workspace } from '../model/types';

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

export const useCreateWorkspaceApi = (options?: any) => {
  return useMutation(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};

export const useDeleteWorkspaceApi = (options?: any) => {
  return useMutation(DELETE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};

export const useUpdateWorkspaceApi = (options?: any) => {
  return useMutation<{ updateWorkspace: Workspace }>(UPDATE_WORKSPACE, {
    refetchQueries: (result) => [
      { 
        query: GET_WORKSPACE, 
        variables: { id: result.data?.updateWorkspace.id } 
      }
    ],
    ...options,
  });
};

export const useInviteMemberApi = (options?: any) => {
  return useMutation(INVITE_MEMBER, options);
};
