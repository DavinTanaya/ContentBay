import { getApolloErrorMessage } from '../lib/apollo/error-mapper';

/**
 * Extracts a safe error message string from an unknown error type,
 * specifically handling Apollo errors using the v4 mapper (Business & Technical).
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = 'Terjadi kesalahan sistem.'
): string => {
  // 1. Cek apakah ini adalah error dari Apollo Client menggunakan mapper v4
  const apolloMsg = getApolloErrorMessage(error);
  if (apolloMsg !== null) {
    return apolloMsg;
  }

  // 2. Jika error bawaan JavaScript (Error object standar)
  if (error instanceof Error) {
    return error.message;
  }

  // 3. Jika error berupa string (contoh: throw "Ini error")
  if (typeof error === 'string') {
    return error;
  }

  // 4. Default fallback jika format tidak dikenali
  return fallbackMessage;
};
