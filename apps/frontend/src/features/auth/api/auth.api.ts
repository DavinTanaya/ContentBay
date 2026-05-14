import { apolloClient } from '@/shared/api/apollo';
import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_ACCESS_TOKEN,
  LOGIN,
  REGISTER,
} from './auth.mutations';
import type { User } from '@/entities/session';

export async function loginManual(email: string, password: string) {
  const { data } = await apolloClient.mutate<{
    login: {
      token: string;
      user: User;
    };
  }>({
    mutation: LOGIN,
    variables: { email, password },
  });

  return data!.login;
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const { data } = await apolloClient.mutate<{
    register: {
      token: string;
      user: User;
    };
  }>({
    mutation: REGISTER,
    variables: { firstName, lastName, email, password },
  });

  return data!.register;
}

export async function loginWithGoogle(idToken: string) {
  const { data } = await apolloClient.mutate<{
    googleLogin: {
      token: string;
      user: User;
    };
  }>({
    mutation: GOOGLE_LOGIN,
    variables: { idToken },
  });

  return data;
}

export async function loginWithGoogleAccessToken(accessToken: string) {
  const { data } = await apolloClient.mutate<{
    googleLoginWithAccessToken: {
      token: string;
      user: User;
    };
  }>({
    mutation: GOOGLE_LOGIN_ACCESS_TOKEN,
    variables: { accessToken },
  });

  return data!.googleLoginWithAccessToken;
}

export function logout() {
  localStorage.clear();
}
