import { Navigate } from 'react-router-dom';
import { useSession } from '@/entities/user';
import type { JSX } from 'react';

export function Protect({ children }: { children: JSX.Element }) {
  const auth = useSession();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
