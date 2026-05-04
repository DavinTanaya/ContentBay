export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
