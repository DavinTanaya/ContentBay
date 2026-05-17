import { apolloClient } from '@/shared/api/apollo';
import { GET_USER_BY_ID } from './user.queries';
import type { GetUserByIdRequest, GetUserByIdResponse } from './user.dto';

export async function getUserById(params: GetUserByIdRequest) {
  const { data } = await apolloClient.query<
    GetUserByIdResponse,
    GetUserByIdRequest
  >({
    query: GET_USER_BY_ID,
    variables: params,
  });
  if (!data) {
    throw new Error('Failed to fetch user data');
  }
  return data.getUserById;
}
