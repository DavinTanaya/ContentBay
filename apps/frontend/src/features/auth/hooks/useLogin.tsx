// features/auth/hooks/useLogin.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './useAuth';
import { loginManual, loginWithGoogleAccessToken } from '../api/auth.api';
import { message } from 'antd';

export const useLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  // Dipanggil oleh onFinish dari Ant Design Form
  const onFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    try {
      const data = await loginManual(values.email, values.password);
      auth.login(data);
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await loginWithGoogleAccessToken(
          tokenResponse.access_token,
        );
        auth.login(data);
      } catch (err) {
        message.error(
          err instanceof Error ? err.message : 'Google login failed',
        );
      }
    },
    onError: () => message.error('Google login failed'),
  });

  return { onFinish, googleLogin };
};
