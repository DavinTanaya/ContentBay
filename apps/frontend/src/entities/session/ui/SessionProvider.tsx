import { useState, type ReactNode } from 'react';
import type { SessionPayload, User } from '../model/session.type';
import { SessionContext } from '../model/session.context';

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
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
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
