import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import {
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
  INVITE_MEMBER,
  ACCEPT_INVITATION,
  DECLINE_INVITATION,
} from './mutations';
import type { Workspace } from '../model/workspace.types';
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  InviteMemberRequest,
  DeleteWorkspaceInput,
} from '../model/dto';

export async function createWorkspaceApi(input: CreateWorkspaceInput) {
  const { data } = await apolloClient.mutate<{ createWorkspace: Workspace }>({
    mutation: CREATE_WORKSPACE,
    variables: { input },
  });
  return data?.createWorkspace;
}

export async function deleteWorkspaceApi(input: DeleteWorkspaceInput) {
  const { data } = await apolloClient.mutate<{ deleteWorkspace: boolean }>({
    mutation: DELETE_WORKSPACE,
    variables: { id: input.workspaceId },
  });
  return data?.deleteWorkspace;
}

export async function updateWorkspaceApi(input: UpdateWorkspaceInput) {
  const { workspaceId, ...rest } = input;
  const { data } = await apolloClient.mutate<{ updateWorkspace: Workspace }>({
    mutation: UPDATE_WORKSPACE,
    variables: { id: workspaceId, input: rest },
  });
  return data?.updateWorkspace;
}

export async function inviteMemberApi(request: InviteMemberRequest) {
  const { data } = await apolloClient.mutate<{ inviteMember: boolean }>({
    mutation: INVITE_MEMBER,
    variables: request,
  });
  return data?.inviteMember;
}

export async function acceptInvitationApi(token: string) {
  const { data } = await apolloClient.mutate<{ acceptInvitation: boolean }>({
    mutation: ACCEPT_INVITATION,
    variables: { token },
  });
  return data?.acceptInvitation;
}

export async function declineInvitationApi(id: string) {
  const { data } = await apolloClient.mutate<{ declineInvitation: boolean }>({
    mutation: DECLINE_INVITATION,
    variables: { id },
  });
  return data?.declineInvitation;
}
