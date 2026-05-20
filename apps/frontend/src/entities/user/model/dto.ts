import type { User } from './types';

export interface GetUserByIdRequest {
  id: number;
}

export interface GetUserByIdResponse {
  getUserById: User;
}
