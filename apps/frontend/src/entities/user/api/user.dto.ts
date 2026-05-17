import type { User } from '../model/user.type';

export interface GetUserByIdRequest {
  id: number;
}

export interface GetUserByIdResponse {
  getUserById: User;
}
