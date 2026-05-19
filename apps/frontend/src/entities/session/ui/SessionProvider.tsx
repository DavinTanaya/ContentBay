import { useState, type ReactNode } from 'react';
import type { User } from '@/entities/user/@x/session';
import type { SessionPayload } from '../model/session.type';
import { SessionContext } from '../model/session.context';
import { apolloClient } from '@/shared/api/apollo';

function getInitialUser(): User | null {
  const saved = localStorage.getItem('user');

  if (!saved) return null;

  try {
    return JSON.parse(saved) as User;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  function login(payload: SessionPayload) {
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));

    setUser(payload.user);
    // Clear Apollo cache on login to ensure clean state
    apolloClient.clearStore().catch((err) => console.error('Failed to clear Apollo store on login', err));
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    // Clear Apollo cache on logout to prevent cross-account cache leaks
    apolloClient.clearStore().catch((err) => console.error('Failed to clear Apollo store on logout', err));
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
