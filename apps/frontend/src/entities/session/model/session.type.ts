export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

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
