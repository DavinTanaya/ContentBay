import { useState } from 'react';
import { useActiveWorkspaceId, inviteMemberApi, GET_WORKSPACE } from '@/entities/workspace';
import type { InviteMemberRequest } from '@/entities/workspace/model/dto';
import type { InviteEmailPayload } from './types';
import { apolloClient } from '@/shared/lib/apollo/apollo-client';

export const useWorkspaceInvite = (providedWorkspaceId?: string) => {
  const activeSpaceId = useActiveWorkspaceId();
  const workspaceId = providedWorkspaceId || activeSpaceId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInvite = async (values: InviteEmailPayload) => {
    if (!workspaceId) throw new Error("Workspace ID is not defined.");

    setLoading(true);
    try {
      const input: InviteMemberRequest = {
        workspaceId,
        email: values.email,
        role: values.role,
      };

      await inviteMemberApi(input);
      // Manually refetch the workspace members query if needed, or invalidate cache
      apolloClient.refetchQueries({
        include: [GET_WORKSPACE],
      });
    } finally {
      setLoading(false);
    }
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
