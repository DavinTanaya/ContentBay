import { gql } from '@apollo/client';

export const DECLINE_INVITATION = gql`
  mutation DeclineInvitation($id: ID!) {
    declineInvitation(id: $id)
  }
`;
