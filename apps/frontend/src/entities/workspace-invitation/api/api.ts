import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import { DECLINE_INVITATION } from './mutations';

export async function declineInvitationApi(id: string) {
  const { data } = await apolloClient.mutate<{ declineInvitation: boolean }>({
    mutation: DECLINE_INVITATION,
    variables: { id },
  });
  return data?.declineInvitation;
}
