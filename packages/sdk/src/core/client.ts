import { Transport } from './transport';
import { ContentBayConfig } from '../models/config';
import { ContentEntry, ContentModel } from '../models/entry';
import { QueryBuilder } from '../query/builder';

/**
 * ContentBay SDK client for fetching content from your ContentBay workspace.
 *
 * @example
 * ```typescript
 * import { ContentBay } from 'contentbay';
 *
 * const cms = new ContentBay({
 *   spaceId: 'your-workspace-id',
 *   apiToken: 'cb_live_your-api-token',
 * });
 *
 * // Get all entries
 * const products = await cms.getAll('product');
 *
 * // Get specific fields
 * const names = await cms.get('product', ['name', 'price']);
 *
 * // Get a single entry
 * const item = await cms.getOne('product', 'entry-id');
 *
 * // Advanced queries
 * const results = await cms.query('product')
 *   .where('price', '>', 100)
 *   .select(['name', 'price'])
 *   .limit(10)
 *   .execute();
 * ```
 */
export class ContentBay {
  private transport: Transport;

  /**
   * Create a new ContentBay client.
   * @param config - Configuration object with spaceId and apiToken
   */
  constructor(config: ContentBayConfig) {
    this.transport = new Transport(config);
  }

  /**
   * Get all entries from a content model.
   * @param modelApiId - The API ID of the content model (e.g., 'product', 'blog-post')
   * @returns Array of content entries
   *
   * @example
   * ```typescript
   * const products = await cms.getAll('product');
   * console.log(products[0].data.name);
   * ```
   */
  async getAll(modelApiId: string): Promise<ContentEntry[]> {
    const query = `
      query DeliveryGetContents($modelApiId: String!) {
        deliveryGetContents(modelApiId: $modelApiId) {
          id
          data
          status
          createdAt
          updatedAt
          model {
            id
            name
            apiId
          }
        }
      }
    `;

    const result = await this.transport.request<{ deliveryGetContents: ContentEntry[] }>(query, {
      modelApiId,
    });

    return result.deliveryGetContents;
  }

  /**
   * Get entries from a content model with only specific fields.
   * @param modelApiId - The API ID of the content model
   * @param fields - Array of field apiIds to include (e.g., ['name', 'price'])
   * @returns Array of content entries with only the selected fields in `data`
   *
   * @example
   * ```typescript
   * const items = await cms.get('product', ['name', 'price']);
   * // items[0].data = { name: '...', price: ... }
   * ```
   */
  async get(modelApiId: string, fields?: string[]): Promise<ContentEntry[]> {
    const entries = await this.getAll(modelApiId);

    if (!fields || fields.length === 0) {
      return entries;
    }

    return entries.map((entry) => ({
      ...entry,
      data: Object.fromEntries(
        Object.entries(entry.data).filter(([key]) => fields.includes(key)),
      ),
    }));
  }

  /**
   * Get a single content entry by ID.
   * @param modelApiId - The API ID of the content model
   * @param entryId - The unique ID of the content entry
   * @returns The content entry, or null if not found
   *
   * @example
   * ```typescript
   * const product = await cms.getOne('product', 'clxyz123');
   * console.log(product?.data.name);
   * ```
   */
  async getOne(modelApiId: string, entryId: string): Promise<ContentEntry | null> {
    const query = `
      query DeliveryGetContent($modelApiId: String!, $entryId: ID!) {
        deliveryGetContent(modelApiId: $modelApiId, entryId: $entryId) {
          id
          data
          status
          createdAt
          updatedAt
          model {
            id
            name
            apiId
          }
        }
      }
    `;

    const result = await this.transport.request<{ deliveryGetContent: ContentEntry | null }>(query, {
      modelApiId,
      entryId,
    });

    return result.deliveryGetContent;
  }

  /**
   * Create a query builder for advanced filtering, sorting, and pagination.
   * @param modelApiId - The API ID of the content model
   * @returns A QueryBuilder instance with chainable methods
   *
   * @example
   * ```typescript
   * const results = await cms.query('product')
   *   .where('price', '>', 100)
   *   .where('category', '=', 'electronics')
   *   .select(['name', 'price', 'image'])
   *   .orderBy('price', 'desc')
   *   .limit(10)
   *   .offset(20)
   *   .execute();
   * ```
   */
  query(modelApiId: string): QueryBuilder {
    return new QueryBuilder(this.transport, modelApiId);
  }

  /**
   * Get all content models (schemas) in the workspace.
   * @returns Array of content model definitions
   *
   * @example
   * ```typescript
   * const models = await cms.getModels();
   * models.forEach(m => console.log(m.name, m.fields));
   * ```
   */
  async getModels(): Promise<ContentModel[]> {
    const query = `
      query DeliveryGetModels {
        deliveryGetModels {
          id
          name
          apiId
          description
          fields {
            name
            type
            apiId
            required
          }
        }
      }
    `;

    const result = await this.transport.request<{ deliveryGetModels: ContentModel[] }>(query);

    return result.deliveryGetModels;
  }
}
