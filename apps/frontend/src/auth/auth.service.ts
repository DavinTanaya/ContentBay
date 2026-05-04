import { createClient } from "../graphql/client";
import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_ACCESS_TOKEN,
  LOGIN,
  REGISTER,
} from "../graphql/mutations/auth";


export async function loginManual(email: string, password: string) {
  const client = createClient();

  const data = await client.request<{
    login: {
      token: string;
      user: { id: number; email: string; firstName?: string; lastName?: string };
    };
  }>(LOGIN, { email, password });

  return data.login;
}


export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const client = createClient();

  const data = await client.request<{
    register: {
      token: string;
      user: { id: number; email: string; firstName?: string; lastName?: string };
    };
  }>(REGISTER, { firstName, lastName, email, password });

  return data.register;
}


export async function loginWithGoogle(idToken: string) {
  const client = createClient();

  return client.request(GOOGLE_LOGIN, { idToken });
}

export async function loginWithGoogleAccessToken(accessToken: string) {
  const client = createClient();

  const data = await client.request<{
    googleLoginWithAccessToken: {
      token: string;
      user: { id: number; email: string; firstName?: string; lastName?: string };
    };
  }>(GOOGLE_LOGIN_ACCESS_TOKEN, { accessToken });

  return data.googleLoginWithAccessToken;
}

export function logout() {
  localStorage.clear();
}
