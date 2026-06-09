import { GraphQLClient } from 'graphql-request';
import { ContentBayConfig } from '../models/config';
import { AuthError, ApiError } from './errors';

const DEFAULT_API_URL = 'https://api.contentbay.io';

/**
 * Internal transport layer for communicating with the ContentBay GraphQL API.
 * Handles authentication headers and error parsing.
 * @internal
 */
export class Transport {
  private client: GraphQLClient;

  constructor(private config: ContentBayConfig) {
    if (!config.spaceId) throw new AuthError('spaceId is required');
    if (!config.apiToken) throw new AuthError('apiToken is required');

    const url = config.apiUrl || DEFAULT_API_URL;

    this.client = new GraphQLClient(url, {
      headers: {
        'X-ContentBay-Token': config.apiToken,
      },
    });
  }

  /**
   * Execute a GraphQL query against the ContentBay API.
   */
  async request<T>(query: string, variables?: Record<string, any>): Promise<T> {
    try {
      return await this.client.request<T>(query, variables);
    } catch (error: any) {
      // Parse GraphQL errors
      if (error?.response?.errors) {
        const gqlError = error.response.errors[0];
        const message = gqlError?.message || 'Unknown GraphQL error';

        if (
          message.toLowerCase().includes('unauthorized') ||
          (message.toLowerCase().includes('invalid') && message.toLowerCase().includes('token'))
        ) {
          throw new AuthError(message);
        }
        throw new ApiError(message);
      }

      // Network or other errors
      throw new ApiError(error?.message || 'Request failed');
    }
  }
}
