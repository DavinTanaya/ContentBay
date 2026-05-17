import { ApolloProvider } from './ApolloProvider';
import { SessionProvider } from '@/entities/session';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/shared/lib/config';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ApolloProvider>
      <SessionProvider>{children}</SessionProvider>
    </ApolloProvider>
  </GoogleOAuthProvider>
);
