export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
