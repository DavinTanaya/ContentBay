# contentbay

> Official JavaScript/TypeScript SDK for [ContentBay](https://contentbay.io) Headless CMS

[![npm version](https://img.shields.io/npm/v/contentbay.svg)](https://www.npmjs.com/package/contentbay)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Fetch and query content from your ContentBay workspace with a clean, type-safe API. Works in Node.js, Edge runtimes, and modern browsers.

## Installation

```bash
npm install contentbay
```

```bash
yarn add contentbay
```

```bash
pnpm add contentbay
```

## Quick Start

```typescript
import { ContentBay } from 'contentbay';

const cms = new ContentBay({
  spaceId: 'your-workspace-id',
  apiToken: 'cb_live_your-api-token',
});

// Fetch all blog posts
const posts = await cms.getAll('blog-post');

posts.forEach(post => {
  console.log(post.data.title);
});
```

## Configuration

| Option     | Type     | Required | Default                      | Description                         |
| ---------- | -------- | -------- | ---------------------------- | ----------------------------------- |
| `spaceId`  | `string` | ✅       | —                            | Your workspace ID from the dashboard |
| `apiToken` | `string` | ✅       | —                            | API token from your dashboard        |
| `apiUrl`   | `string` | ❌       | `https://api.contentbay.io`  | Custom API base URL                  |

```typescript
const cms = new ContentBay({
  spaceId: 'your-workspace-id',
  apiToken: 'cb_live_your-api-token',
  apiUrl: 'https://your-custom-api.example.com', // optional
});
```

## API Reference

### `cms.getAll(modelApiId)`

Fetch all entries from a content model.

```typescript
const products = await cms.getAll('product');
// products: ContentEntry[]
```

### `cms.get(modelApiId, fields?)`

Fetch entries with optional field selection. When `fields` is provided, only those keys will appear in each entry's `data` object.

```typescript
// All fields
const products = await cms.get('product');

// Only name and price
const products = await cms.get('product', ['name', 'price']);
// products[0].data → { name: 'Widget', price: 9.99 }
```

### `cms.getOne(modelApiId, entryId)`

Fetch a single entry by its ID. Returns `null` if not found.

```typescript
const product = await cms.getOne('product', 'clxyz123');

if (product) {
  console.log(product.data.name);
}
```

### `cms.query(modelApiId)`

Create a query builder for advanced filtering, sorting, and pagination.

```typescript
const results = await cms.query('product')
  .where('price', '>', 100)
  .where('category', '=', 'electronics')
  .select(['name', 'price', 'image'])
  .orderBy('price', 'desc')
  .limit(10)
  .offset(20)
  .execute();
```

### `cms.getModels()`

Fetch all content models (schemas) in your workspace.

```typescript
const models = await cms.getModels();

models.forEach(model => {
  console.log(`${model.name} (${model.apiId})`);
  model.fields.forEach(field => {
    console.log(`  - ${field.name}: ${field.type}`);
  });
});
```

## Query Builder

The query builder provides a fluent API for constructing complex queries:

| Method                              | Description                                  |
| ----------------------------------- | -------------------------------------------- |
| `.where(field, operator, value)`    | Add a filter condition (AND logic)           |
| `.select(fields)`                   | Choose which fields to include in `data`     |
| `.orderBy(field, direction?)`       | Sort results (`'asc'` or `'desc'`)           |
| `.limit(count)`                     | Limit the number of results                  |
| `.offset(count)`                    | Skip results (for pagination)                |
| `.execute()`                        | Run the query and return results             |

### Supported Operators

| Operator     | Description              | Example                              |
| ------------ | ------------------------ | ------------------------------------ |
| `=`          | Equal                    | `.where('status', '=', 'active')`    |
| `!=`         | Not equal                | `.where('status', '!=', 'draft')`    |
| `>`          | Greater than             | `.where('price', '>', 100)`          |
| `<`          | Less than                | `.where('price', '<', 50)`           |
| `>=`         | Greater than or equal    | `.where('stock', '>=', 1)`           |
| `<=`         | Less than or equal       | `.where('rating', '<=', 5)`          |
| `contains`   | String contains          | `.where('title', 'contains', 'new')` |
| `startsWith` | String starts with       | `.where('sku', 'startsWith', 'AB')`  |
| `endsWith`   | String ends with         | `.where('email', 'endsWith', '.com')`|

### Pagination Example

```typescript
const pageSize = 10;
const page = 2;

const results = await cms.query('product')
  .limit(pageSize)
  .offset((page - 1) * pageSize)
  .execute();
```

## Error Handling

The SDK provides typed error classes for structured error handling:

```typescript
import { ContentBay, AuthError, ApiError, ContentBayError } from 'contentbay';

try {
  const posts = await cms.getAll('blog-post');
} catch (error) {
  if (error instanceof AuthError) {
    // Invalid or missing API token
    console.error('Authentication failed:', error.message);
  } else if (error instanceof ApiError) {
    // API request failed
    console.error('API error:', error.message);
  } else if (error instanceof ContentBayError) {
    // Any other SDK error
    console.error('SDK error:', error.code, error.message);
  }
}
```

| Error Class       | Code         | When                                  |
| ----------------- | ------------ | ------------------------------------- |
| `AuthError`       | `AUTH_ERROR`  | Invalid/missing API token or spaceId |
| `NotFoundError`   | `NOT_FOUND`  | Resource not found                    |
| `ApiError`        | `API_ERROR`  | General API request failure           |
| `ContentBayError` | *(varies)*   | Base class for all SDK errors         |

## TypeScript Support

This package is written in TypeScript and ships with full type definitions. All interfaces are exported for your convenience:

```typescript
import type {
  ContentBayConfig,
  ContentEntry,
  ContentModel,
  ContentField,
  WhereOperator,
  OrderDirection,
} from 'contentbay';
```

## License

[MIT](LICENSE) © ContentBay
