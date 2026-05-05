// features/auth/hooks/useRegister.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './useAuth';
import {
  loginWithGoogleAccessToken,
  register as registerUser,
} from '../api/auth.api';
import { message } from 'antd';

export const useRegister = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreedTerms: boolean;
  }) => {
    if (!values.agreedTerms) {
      message.error('You must agree to the Terms of Use and Privacy Policy');
      return;
    }

    try {
      const data = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
      );
      auth.login(data);
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Registration failed');
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
          err instanceof Error ? err.message : 'Google signup failed',
        );
      }
    },
    onError: () => message.error('Google signup failed'),
  });

  return { onFinish, googleLogin };
};
