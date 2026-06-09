/** Base error class for all ContentBay SDK errors */
export class ContentBayError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ContentBayError';
  }
}

/** Thrown when authentication fails (invalid or missing API token) */
export class AuthError extends ContentBayError {
  constructor(message = 'Invalid or missing API token') {
    super(message, 'AUTH_ERROR');
    this.name = 'AuthError';
  }
}

/** Thrown when the requested resource is not found */
export class NotFoundError extends ContentBayError {
  constructor(message = 'Resource not found') {
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/** Thrown when the API request fails */
export class ApiError extends ContentBayError {
  constructor(message: string, public statusCode?: number) {
    super(message, 'API_ERROR');
    this.name = 'ApiError';
  }
}
