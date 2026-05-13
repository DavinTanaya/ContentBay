import type React from 'react';

/**
 * FieldType — describes a type option in the field picker UI.
 */
export interface FieldType {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color?: string;
  selected?: boolean;
}

/**
 * ContentField — a single field within a Content Model.
 */
export interface ContentField {
  id: string;
  name: string;
  type: string;
  icon?: React.ReactNode;
  color?: string;
  localized?: boolean;
  required?: boolean;
  isTitle?: boolean;
  description?: string;
  apiId?: string;
}

/**
 * ContentModel — the core domain entity representing a content schema.
 */
export interface ContentModel {
  id: string;
  name: string;
  apiId: string;
  description?: string;
  fields: ContentField[];
  status?: 'LIVE' | 'DRAFT';
  lastRevision?: string;
}

/**
 * CreateContentModelInput — input shape for creating/updating a content model.
 */
export interface CreateContentModelInput {
  name: string;
  apiId: string;
  description?: string;
  fields?: Array<{
    name: string;
    type: string;
    apiId: string;
    localized?: boolean;
    required?: boolean;
    isTitle?: boolean;
    description?: string;
  }>;
}
