import { useQuery, useMutation } from '@apollo/client/react';
import type { MutationHookOptions } from '@apollo/client';
import { GET_WORKSPACES, GET_WORKSPACE } from './queries';
import {
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
  INVITE_MEMBER,
} from './mutations';
import type { Workspace } from '../model/types';
import type {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  InviteMemberDto,
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

export const useCreateWorkspaceApi = (
  options?: MutationHookOptions<
    { createWorkspace: Workspace },
    { input: CreateWorkspaceDto }
  >,
) => {
  return useMutation<
    { createWorkspace: Workspace },
    { input: CreateWorkspaceDto }
  >(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }],
    ...options,
  });
};

export const useDeleteWorkspaceApi = (
  options?: MutationHookOptions<{ deleteWorkspace: boolean }, { id: string }>,
) => {
  return useMutation<{ deleteWorkspace: boolean }, { id: string }>(
    DELETE_WORKSPACE,
    {
      refetchQueries: [{ query: GET_WORKSPACES }],
      ...options,
    },
  );
};

export const useUpdateWorkspaceApi = (
  options?: MutationHookOptions<
    { updateWorkspace: Workspace },
    { id: string; name?: string; description?: string }
  >,
) => {
  return useMutation<
    { updateWorkspace: Workspace },
    { id: string; name?: string; description?: string }
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

export const useInviteMemberApi = (
  options?: MutationHookOptions<{ inviteMember: boolean }, InviteMemberDto>,
) => {
  return useMutation<{ inviteMember: boolean }, InviteMemberDto>(
    INVITE_MEMBER,
    options,
  );
};
