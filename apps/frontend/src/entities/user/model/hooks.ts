import { useQuery } from '@apollo/client/react';
import { GET_USER_BY_ID } from '../api/queries';
import type { GetUserByIdRequest, GetUserByIdResponse } from './dto';

export function useGetUserByIdApi(id: number | string) {
  const numericId = typeof id === 'number' ? id : parseInt(String(id), 10);
  const isValidId = !isNaN(numericId) && numericId > 0;

  return useQuery<GetUserByIdResponse, GetUserByIdRequest>(GET_USER_BY_ID, {
    variables: { id: numericId },
    skip: !isValidId,
  });
}
