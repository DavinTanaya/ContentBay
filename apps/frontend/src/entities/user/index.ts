// model
export type { User } from './model/types';
export { useGetUserByIdApi } from './model/hooks';

// api
export { getUserById } from './api/api';
export type { GetUserByIdRequest, GetUserByIdResponse } from './model/dto';
