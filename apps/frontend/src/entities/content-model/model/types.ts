import type { User } from '@/entities/user/@x/workspace';

export type ContentModelIcon =
  | 'person'
  | 'folder'
  | 'document'
  | 'box'
  | 'media'
  | 'settings'
  | 'map-pin'
  | 'database';

export type FieldIcon =
  | 'rich-text'
  | 'text'
  | 'number'
  | 'calendar'
  | 'location'
  | 'media'
  | 'boolean'
  | 'json'
  | 'reference';

export interface FieldType {
  title: string;
  desc: string;
  selected?: boolean;
  icon: FieldIcon;
}

export interface FieldValidations {
  required?: boolean;
  unique?: boolean;
  minCount?: number;
  maxCount?: number;
  matchPattern?: string;
  prohibitPattern?: string;
  allowedValues?: string[];
}

export interface ContentField {
  id: string;
  name: string;
  apiId: string;
  type: string;
  icon: FieldIcon;
  required?: boolean;
  localized?: boolean;
  isTitle?: boolean;
  description?: string;
  validations?: FieldValidations;
}

export interface ContentModel {
  id: string;
  workspaceId: string;
  name: string;
  apiId: string;
  description?: string;
  icon: ContentModelIcon;
  fields: ContentField[];
  status?: 'LIVE' | 'DRAFT';
  createdAt: string;
  updatedAt?: string;
  createdBy: number;
  updatedBy?: number;
  creator?: User;
  updater?: User;
}

export interface ContentModelCardProps {
  model: ContentModel;
  authorName?: string;
  authorInitial?: string;
  onClick?: (id: string) => void;
}

export interface ContentModelGridProps {
  models: (ContentModel & { authorName?: string; authorInitial?: string })[];
  onCardClick?: (id: string) => void;
}

export interface FieldsTableProps {
  data: ContentField[];
  onEditField: (field: ContentField) => void;
}

export interface JSONSchemaField {
  id: string;
  label: string;
  type: string;
  config: {
    localized?: boolean;
    required?: boolean;
    isTitle?: boolean;
  };
}

export interface ContentModelJsonSchema {
  name: string;
  description: string;
  apiId: string;
  fields: JSONSchemaField[];
}

export interface JSONSchemaPreviewProps {
  modelId?: string;
  schema: ContentModelJsonSchema;
}

export interface ModelMetadataSidebarProps {
  totalFields: number;
  lastRevision: string;
  status: 'LIVE' | 'DRAFT';
}

export interface RenderFieldIconProps {
  icon?: FieldIcon | string;
  className?: string;
}

export interface RenderModelIconProps {
  icon?: ContentModelIcon | string;
  size?: number;
  className?: string;
}

export interface CreateContentModelInput {
  workspaceId?: string;
  name: string;
  apiId: string;
  description?: string;
  icon: ContentModelIcon;
  fields?: Array<Omit<ContentField, 'id'>>;
}

export interface UpdateContentModelInput {
  name?: string;
  apiId?: string;
  description?: string;
  icon?: ContentModelIcon;
  status?: 'LIVE' | 'DRAFT';
  fields?: ContentField[];
}
