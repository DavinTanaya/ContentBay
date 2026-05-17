import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { loginManual, loginWithGoogleAccessToken } from '../api/auth.api';
import { message } from 'antd';
import { useSession } from '@/entities/session';
import type { LoginValues } from './auth.type';

export const useLogin = () => {
  const auth = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/content-model', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  const onFinish = async (values: LoginValues) => {
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
