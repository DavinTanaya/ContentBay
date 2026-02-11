import { gql } from 'graphql-request';

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($idToken: String!) {
    googleLogin(idToken: $idToken) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;
