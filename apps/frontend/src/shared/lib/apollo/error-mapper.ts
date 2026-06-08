import { ApolloErrorUtils } from './error-utils';
import { ApolloErrorCodes } from './error-codes';

export function getApolloErrorMessage(error: unknown): string | null {
  if (ApolloErrorUtils.isGraphQL(error)) {
    const firstError = error.errors[0];
    const code = firstError?.extensions?.code as string;

    // Handle Business Errors via extensions.code
    switch (code) {
      case ApolloErrorCodes.UNAUTHENTICATED:
        return 'Sesi Anda telah berakhir. Silakan login kembali.';
      case ApolloErrorCodes.UNAUTHORIZED:
        return 'Anda tidak memiliki akses untuk melakukan tindakan ini.';
      case ApolloErrorCodes.INVALID_CREDENTIALS:
        return 'Kredensial tidak valid.';
      case ApolloErrorCodes.WORKSPACE_NOT_FOUND:
        return 'Workspace tidak ditemukan.';
      case ApolloErrorCodes.BAD_USER_INPUT:
        return 'Data yang dimasukkan tidak valid. Silakan periksa kembali.';
      default:
        // Gunakan pesan fallback atau raw message jika tidak ada code yang cocok
        return firstError?.message ?? 'Terjadi kesalahan pada server (GraphQL).';
    }
  }

  // Handle Technical Errors via Error Classes
  if (ApolloErrorUtils.isServer(error)) {
    return `Server tidak tersedia (Status: ${error.statusCode}).`;
  }

  if (ApolloErrorUtils.isParse(error)) {
    return 'Menerima respons tidak valid dari server (Parse Error).';
  }

  if (ApolloErrorUtils.isProtocol(error)) {
    return 'Terjadi kesalahan komunikasi protokol dengan server.';
  }

  if (ApolloErrorUtils.isLocal(error)) {
    return 'Terjadi kesalahan pada state lokal aplikasi.';
  }

  if (ApolloErrorUtils.isUnconventional(error)) {
    return 'Terjadi kesalahan sistem yang tidak biasa.';
  }

  return null;
}
