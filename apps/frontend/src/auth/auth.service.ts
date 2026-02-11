import { createClient } from "../graphql/client";
import { GOOGLE_LOGIN } from "../graphql/mutations/auth";

export async function loginWithGoogle(idToken: string) {
  const client = createClient();

  return client.request(GOOGLE_LOGIN, {
    idToken,
  });
}

export function logout() {
  localStorage.clear();
}
