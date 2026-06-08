import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { ApolloErrorUtils } from './error-utils';
import { API_URL } from '@/shared/lib/config';

const httpLink = new HttpLink({
  uri: API_URL,
});

// Otomatis attach token ke setiap request
const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem('token');
  const headers = prevContext.headers || {};

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// ErrorLink HANYA untuk Cross-Cutting Concerns (Logging, Telemetry, dll)
// UI Handling dilakukan di component melalui error-mapper.
const errorLink = new ErrorLink(({ error }) => {
  if (!error) return;

  if (ApolloErrorUtils.isGraphQL(error)) {
    error.errors.forEach((gqlError) => {
      // Logging / Sentry
      console.error(
        `[GraphQL error]: Code: ${gqlError.extensions?.code}, Message: ${gqlError.message}`,
      );

      if (gqlError.extensions?.code === 'UNAUTHENTICATED') {
        // Hapus semua data sesi dari storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('active_workspace_id');
        
        // Redirect paksa ke halaman login
        window.location.href = '/auth/login';
      }
    });
  }

  if (ApolloErrorUtils.isServer(error)) {
    console.error(`[HTTP Error] Status: ${error.statusCode}`);
  }

  if (ApolloErrorUtils.isParse(error)) {
    console.error(`[Parse Error] Invalid server response`);
  }

  if (ApolloErrorUtils.isProtocol(error)) {
    console.error(`[Protocol Error]`);
  }

  if (ApolloErrorUtils.isLocal(error)) {
    console.error(`[Local State Error]`);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
