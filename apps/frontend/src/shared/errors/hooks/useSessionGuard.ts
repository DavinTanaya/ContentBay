import { useEffect, useState } from 'react';

export const SESSION_EXPIRED_EVENT = 'app:session-expired';

export function triggerSessionExpired() {
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

export function useSessionGuard() {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsSessionExpired(true);
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, []);

  const resetSessionGuard = () => setIsSessionExpired(false);

  return {
    isSessionExpired,
    resetSessionGuard,
  };
}
