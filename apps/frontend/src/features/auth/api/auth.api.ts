import { apolloClient } from '@/shared/lib/apollo/apollo-client';
import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_ACCESS_TOKEN,
  LOGIN,
  REGISTER,
} from './auth.mutations';
import type {
  GoogleLoginResponseDto,
  LoginResponseDto,
  ManualLoginResponseDto,
  RegisterResponseDto,
} from './auth.dto';

export async function loginManual(email: string, password: string) {
  const { data } = await apolloClient.mutate<ManualLoginResponseDto>({
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
  const { data } = await apolloClient.mutate<RegisterResponseDto>({
    mutation: REGISTER,
    variables: { firstName, lastName, email, password },
  });

  return data!.register;
}

export async function loginWithGoogle(idToken: string) {
  const { data } = await apolloClient.mutate<GoogleLoginResponseDto>({
    mutation: GOOGLE_LOGIN,
    variables: { idToken },
  });

  return data!.googleLogin;
}

export async function loginWithGoogleAccessToken(accessToken: string) {
  const { data } = await apolloClient.mutate<LoginResponseDto>({
    mutation: GOOGLE_LOGIN_ACCESS_TOKEN,
    variables: { accessToken },
  });

  return data!.googleLoginWithAccessToken;
}

export function logout() {
  localStorage.clear();
}
