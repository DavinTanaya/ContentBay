export type AppErrorType =
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'ServerError'
  | 'ServiceUnavailable'
  | 'NetworkError'
  | 'UnknownError';

export interface AppError {
  type: AppErrorType;
  message: string;
  originalError?: unknown;
}

export function mapApiError(error: any): AppError {
  if (!error) {
    return { type: 'UnknownError', message: 'An unexpected error occurred.' };
  }

  // Handle Apollo Network Errors
  if (error.networkError) {
    const statusCode = error.networkError?.statusCode || error.networkError?.response?.status;
    return getErrorFromStatusCode(statusCode, error);
  }

  // Handle Apollo GraphQLErrors
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const gqlError = error.graphQLErrors[0];
    const code = gqlError.extensions?.code;
    const statusCode = gqlError.extensions?.response?.statusCode || gqlError.extensions?.exception?.status;
    
    if (code === 'UNAUTHENTICATED' || statusCode === 401) {
      return { type: 'Unauthorized', message: 'Please sign in to continue.', originalError: error };
    }
    if (code === 'FORBIDDEN' || statusCode === 403) {
      return { type: 'Forbidden', message: 'You do not have permission to access this resource.', originalError: error };
    }
    if (statusCode) {
      return getErrorFromStatusCode(statusCode, error);
    }
    
    return { type: 'ServerError', message: gqlError.message || 'Something went wrong.', originalError: error };
  }

  // Handle Axios/Fetch or generic status codes
  const status = error.status || error.response?.status;
  if (status) {
    return getErrorFromStatusCode(status, error);
  }

  // Handle Network connection failures (e.g., fetch failed)
  if (error.message?.toLowerCase().includes('network error') || error.message?.toLowerCase().includes('failed to fetch')) {
    return { type: 'NetworkError', message: 'Unable to connect. Please check your internet connection.', originalError: error };
  }

  return { type: 'UnknownError', message: error.message || 'Something went wrong.', originalError: error };
}

function getErrorFromStatusCode(statusCode: number, originalError: any): AppError {
  switch (statusCode) {
    case 401:
      return { type: 'Unauthorized', message: 'Please sign in to continue.', originalError };
    case 403:
      return { type: 'Forbidden', message: 'You do not have permission to access this resource.', originalError };
    case 404:
      return { type: 'NotFound', message: 'The requested resource was not found.', originalError };
    case 503:
      return { type: 'ServiceUnavailable', message: 'Service temporarily unavailable.', originalError };
    default:
      if (statusCode >= 500) {
        return { type: 'ServerError', message: 'Our servers encountered an unexpected error.', originalError };
      }
      return { type: 'UnknownError', message: 'An unexpected error occurred.', originalError };
  }
}
