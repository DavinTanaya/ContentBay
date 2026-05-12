import { ApolloProvider } from './ApolloProvider'
import { AuthProvider } from '@/features/auth/hooks/useAuth'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '@/shared/lib/config'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ApolloProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  </GoogleOAuthProvider>
)
