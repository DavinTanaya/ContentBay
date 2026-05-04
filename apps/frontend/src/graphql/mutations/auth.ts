import { gql } from "graphql-request";

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($idToken: String!) {
    googleLogin(idToken: $idToken) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const GOOGLE_LOGIN_ACCESS_TOKEN = gql`
  mutation GoogleLoginAccessToken($accessToken: String!) {
    googleLoginWithAccessToken(accessToken: $accessToken) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
