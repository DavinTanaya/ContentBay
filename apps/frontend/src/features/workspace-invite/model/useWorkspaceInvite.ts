import { useState } from 'react';
import { useActiveWorkspaceId, useInviteMemberApi, GET_WORKSPACE } from '@/entities/workspace';
import type { InviteMemberRequest } from '@/entities/workspace/model/dto';
import type { InviteEmailPayload } from './types';

export const useWorkspaceInvite = (providedWorkspaceId?: string) => {
  const activeSpaceId = useActiveWorkspaceId();
  const workspaceId = providedWorkspaceId || activeSpaceId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [inviteMember, { loading }] = useInviteMemberApi({
    refetchQueries: workspaceId ? [{ query: GET_WORKSPACE, variables: { id: workspaceId } }] : [],
  });

  const handleInvite = async (values: InviteEmailPayload) => {
    if (!workspaceId) throw new Error("Workspace ID is not defined.");

    const input: InviteMemberRequest = {
      workspaceId,
      email: values.email,
      role: values.role,
    };

    await inviteMember({
      variables: input,
    });
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleInvite,
    loading,
    workspaceId,
  };
};
