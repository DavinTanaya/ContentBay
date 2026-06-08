import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/shared/lib/apollo/apollo-client';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
);
