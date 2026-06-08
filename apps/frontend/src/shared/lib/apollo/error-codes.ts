export const ApolloErrorCodes = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  WORKSPACE_NOT_FOUND: 'WORKSPACE_NOT_FOUND',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  // Tambahkan business error codes lainnya yang dikembalikan oleh backend di sini
} as const;

export type ApolloErrorCode = typeof ApolloErrorCodes[keyof typeof ApolloErrorCodes];
