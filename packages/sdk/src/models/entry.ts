/** A content entry returned from the ContentBay API */
export interface ContentEntry {
  /** Unique identifier */
  id: string;
  /** The dynamic content data as key-value pairs */
  data: Record<string, any>;
  /** Publication status */
  status: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last update */
  updatedAt: string;
  /** The content model this entry belongs to */
  model?: ContentModel;
}

/** A content model (schema definition) */
export interface ContentModel {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** API identifier used in queries */
  apiId: string;
  /** Optional description */
  description?: string;
  /** Field definitions */
  fields: ContentField[];
}

/** A field definition within a content model */
export interface ContentField {
  /** Human-readable name */
  name: string;
  /** Field data type (e.g., 'text', 'number', 'richtext', 'media') */
  type: string;
  /** API identifier */
  apiId: string;
  /** Whether this field is required */
  required: boolean;
}
