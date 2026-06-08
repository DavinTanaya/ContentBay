import { useQuery } from '@apollo/client/react';
import { GET_MY_PENDING_INVITATIONS } from '../api/queries';

import type { GetMyPendingInvitationsResponse } from '../model/dto';

export const useGetMyPendingInvitationsApi = () => {
  return useQuery<GetMyPendingInvitationsResponse>(
    GET_MY_PENDING_INVITATIONS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
};
