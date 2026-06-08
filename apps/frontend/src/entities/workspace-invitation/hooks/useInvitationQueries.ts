import { useQuery } from '@apollo/client/react';
import { GET_MY_PENDING_INVITATIONS } from '../api/queries';

export const useGetMyPendingInvitationsApi = () => {
  return useQuery<{ getMyPendingInvitations: any[] }>(
    GET_MY_PENDING_INVITATIONS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
};
