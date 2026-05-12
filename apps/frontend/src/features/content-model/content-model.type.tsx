import type React from 'react';

export interface FieldType {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color?: string;
  selected?: boolean;
}

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

export interface ContentModel {
  id: string;
  name: string;
  apiId: string;
  description?: string;
  fields: ContentField[];
  status?: 'LIVE' | 'DRAFT';
  lastRevision?: string;
}
