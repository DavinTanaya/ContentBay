import { useQuery, useMutation } from '@apollo/client/react';
import { GET_WORKSPACES, GET_WORKSPACE } from './queries';
import {
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
  INVITE_MEMBER,
} from './mutations';
import type { Workspace } from '../model/types';
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  InviteMemberRequest,
} from '../model/dto';

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

export const useCreateWorkspaceApi = (options?: useMutation.Options<{ createWorkspace: Workspace }, { input: CreateWorkspaceInput }>) => {
  return useMutation<
    { createWorkspace: Workspace },
    { input: CreateWorkspaceInput }
  >(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};

export const useDeleteWorkspaceApi = (options?: useMutation.Options<{ deleteWorkspace: boolean }, { id: string }>) => {
  return useMutation<{ deleteWorkspace: boolean }, { id: string }>(
    DELETE_WORKSPACE,
    {
      refetchQueries: [{ query: GET_WORKSPACES }],
      ...options,
    },
  );
};

export const useUpdateWorkspaceApi = (options?: useMutation.Options<{ updateWorkspace: Workspace }, { id: string } & UpdateWorkspaceInput>) => {
  return useMutation<
    { updateWorkspace: Workspace },
    { id: string } & UpdateWorkspaceInput
  >(UPDATE_WORKSPACE, {
    refetchQueries: (result) => [
      {
        query: GET_WORKSPACE,
        variables: { id: result.data?.updateWorkspace.id },
      },
    ],
    ...options,
  });
};

export const useInviteMemberApi = (options?: useMutation.Options<{ inviteMember: boolean }, InviteMemberRequest>) => {
  return useMutation<{ inviteMember: boolean }, InviteMemberRequest>(
    INVITE_MEMBER,
    options,
  );
};
