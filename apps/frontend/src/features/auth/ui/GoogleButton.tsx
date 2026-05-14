import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../api/auth.api';
import { useSession } from '@/entities/session';

export function GoogleButton() {
  const auth = useSession();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        try {
          const idToken = res.credential;

          if (!idToken) return;

          const data = await loginWithGoogle(idToken);

          if (data?.googleLogin) {
            auth.login(data.googleLogin);
            console.log('Login success:', data.googleLogin.user);
          }
        } catch (err) {
          console.error('Login failed:', err);
        }
      }}
      onError={() => {
        console.log('Google Login Error');
      }}
    />
  );
}
