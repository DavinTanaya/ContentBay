import { useCallback } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { mapApiError, type AppError } from '../utils/mapApiError';
import { triggerSessionExpired } from './useSessionGuard';

export function useApiError() {
  const navigate = useNavigate();

  const handleApiError = useCallback(
    (error: unknown, fallbackMessage?: string) => {
      const appError: AppError = mapApiError(error);

      switch (appError.type) {
        case 'Unauthorized':
          triggerSessionExpired();
          break;
        case 'Forbidden':
          navigate('/403');
          break;
        case 'NotFound':
          navigate('/404');
          break;
        case 'ServiceUnavailable':
          navigate('/503');
          break;
        case 'ServerError':
        case 'NetworkError':
        case 'UnknownError':
        default:
          message.error(fallbackMessage || appError.message);
          break;
      }

      return appError;
    },
    [navigate],
  );

  return { handleApiError };
}
