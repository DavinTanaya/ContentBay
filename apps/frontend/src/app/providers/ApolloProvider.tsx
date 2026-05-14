import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/shared/api/apollo';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
);
