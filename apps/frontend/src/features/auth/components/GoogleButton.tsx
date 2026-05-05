import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import { loginWithGoogle } from '../api/auth.api';

export default function GoogleButton() {
  const auth = useAuth();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        try {
          const idToken = res.credential;

          if (!idToken) return;

          const data = await loginWithGoogle(idToken);

          auth.login(data.googleLogin);

          console.log('Login success:', data.googleLogin.user);
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
