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
}
