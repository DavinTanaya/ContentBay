import { useQuery, useMutation } from '@apollo/client/react';
import { GET_MY_PENDING_INVITATIONS } from './queries';
import { DECLINE_INVITATION } from './mutations';

export const useGetMyPendingInvitationsApi = () => {
  return useQuery<{ getMyPendingInvitations: any[] }>(GET_MY_PENDING_INVITATIONS, {
    fetchPolicy: 'cache-and-network',
  });
};

export const useDeclineInvitationApi = (options?: useMutation.Options<{ declineInvitation: boolean }, { id: string }>) => {
  return useMutation<{ declineInvitation: boolean }, { id: string }>(
    DECLINE_INVITATION,
    {
      refetchQueries: [{ query: GET_MY_PENDING_INVITATIONS }],
      ...options,
    }
  );
};
