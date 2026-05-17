import type { User } from '@/entities/user/@x/session';

export interface SessionPayload {
  token: string;
  user: User;
}

export interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: SessionPayload) => void;
  logout: () => void;
}
