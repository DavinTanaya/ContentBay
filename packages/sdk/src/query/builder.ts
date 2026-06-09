import { Transport } from '../core/transport';
import { ContentEntry } from '../models/entry';

export type WhereOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith';
export type OrderDirection = 'asc' | 'desc';

interface WhereClause {
  field: string;
  operator: WhereOperator;
  value: any;
}

interface OrderByClause {
  field: string;
  direction: OrderDirection;
}

/**
 * Fluent query builder for filtering, selecting, and paginating content entries.
 *
 * @example
 * ```typescript
 * const results = await cms.query('product')
 *   .where('price', '>', 100)
 *   .select(['name', 'price'])
 *   .limit(10)
 *   .orderBy('price', 'desc')
 *   .execute();
 * ```
 */
export class QueryBuilder {
  private _select: string[] | null = null;
  private _where: WhereClause[] = [];
  private _limit: number | null = null;
  private _offset: number | null = null;
  private _orderBy: OrderByClause | null = null;

  /** @internal */
  constructor(
    private transport: Transport,
    private modelApiId: string,
  ) {}

  /**
   * Select specific fields to return.
   * @param fields - Array of field apiIds to include in the result
   */
  select(fields: string[]): this {
    this._select = fields;
    return this;
  }

  /**
   * Add a filter condition.
   * @param field - The field apiId to filter on
   * @param operator - Comparison operator
   * @param value - Value to compare against
   */
  where(field: string, operator: WhereOperator, value: any): this {
    this._where.push({ field, operator, value });
    return this;
  }

  /**
   * Limit the number of results.
   * @param count - Maximum number of entries to return
   */
  limit(count: number): this {
    this._limit = count;
    return this;
  }

  /**
   * Skip a number of results (for pagination).
   * @param count - Number of entries to skip
   */
  offset(count: number): this {
    this._offset = count;
    return this;
  }

  /**
   * Sort results by a field.
   * @param field - The field apiId to sort by
   * @param direction - Sort direction ('asc' or 'desc')
   */
  orderBy(field: string, direction: OrderDirection = 'asc'): this {
    this._orderBy = { field, direction };
    return this;
  }

  /**
   * Execute the query and return results.
   * @returns Promise resolving to an array of matching content entries
   */
  async execute(): Promise<ContentEntry[]> {
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
      modelApiId: this.modelApiId,
    });

    let entries = result.deliveryGetContents;

    // Apply client-side filtering
    if (this._where.length > 0) {
      entries = entries.filter((entry) => {
        return this._where.every((clause) => {
          const value = entry.data[clause.field];
          return this.evaluateCondition(value, clause.operator, clause.value);
        });
      });
    }

    // Apply client-side ordering
    if (this._orderBy) {
      const { field, direction } = this._orderBy;
      entries = [...entries].sort((a, b) => {
        const aVal = a.data[field];
        const bVal = b.data[field];
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply client-side offset
    if (this._offset !== null) {
      entries = entries.slice(this._offset);
    }

    // Apply client-side limit
    if (this._limit !== null) {
      entries = entries.slice(0, this._limit);
    }

    // Apply client-side field selection
    if (this._select) {
      const selectedFields = this._select;
      entries = entries.map((entry) => ({
        ...entry,
        data: Object.fromEntries(
          Object.entries(entry.data).filter(([key]) => selectedFields.includes(key)),
        ),
      }));
    }

    return entries;
  }

  private evaluateCondition(value: any, operator: WhereOperator, target: any): boolean {
    switch (operator) {
      case '=':
        return value === target;
      case '!=':
        return value !== target;
      case '>':
        return value > target;
      case '<':
        return value < target;
      case '>=':
        return value >= target;
      case '<=':
        return value <= target;
      case 'contains':
        return typeof value === 'string' && value.includes(target);
      case 'startsWith':
        return typeof value === 'string' && value.startsWith(target);
      case 'endsWith':
        return typeof value === 'string' && value.endsWith(target);
      default:
        return true;
    }
  }
}
