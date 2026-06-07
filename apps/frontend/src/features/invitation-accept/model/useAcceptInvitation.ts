import { useAcceptInvitationApi, useGetInvitationDetailsApi } from '@/entities/workspace/api/api';
import { useSession } from '@/entities/session';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const useAcceptInvitation = (token: string) => {
  const { user } = useSession();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGetInvitationDetailsApi(token);
  const [acceptInvitationMutation, { loading: isAccepting }] = useAcceptInvitationApi();

  const handleAccept = async () => {
    try {
      await acceptInvitationMutation({ variables: { token } });
      message.success('Successfully joined the workspace!');
      navigate('/contentbay/workspaces');
    } catch (err: any) {
      const errorMessage =
        err?.graphQLErrors?.[0]?.message || err?.message || 'Failed to accept invitation.';
      message.error(errorMessage);
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
