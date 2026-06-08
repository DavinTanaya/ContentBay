import { acceptInvitationApi, useGetInvitationDetailsApi } from '@/entities/workspace';
import { useSession } from '@/entities/session';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getErrorMessage } from '@/shared/utils/errorHandler';
import { useState } from 'react';

export const useAcceptInvitation = (token: string) => {
  const { user } = useSession();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGetInvitationDetailsApi(token);
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await acceptInvitationApi(token);
      message.success('Successfully joined the workspace!');
      navigate('/contentbay/workspaces');
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to accept invitation.'));
    } finally {
      setIsAccepting(false);
    }
  };

  const invitation = data?.getInvitationDetails;

  const isWrongUser = !!user && !!invitation && user.email !== invitation.email;

  return {
    invitation,
    loading,
    error,
    isAccepting,
    handleAccept,
    isWrongUser,
    userEmail: user?.email,
    refetch,
  };
};
