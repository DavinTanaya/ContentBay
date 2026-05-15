import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../api/auth.api';
import { useSession } from '@/entities/user';

export function GoogleButton() {
  const auth = useSession();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        try {
          const idToken = res.credential;

          if (!idToken) return;

          const data = await loginWithGoogle(idToken);

          if (data) {
            auth.login(data);
            console.log('Login success:', data.user);
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
