import type { ContentField, ContentModelIcon } from './types';

export interface CreateContentModelDto {
  workspaceId?: string;
  name: string;
  apiId: string;
  description?: string;
  icon: ContentModelIcon;
  fields?: Array<Omit<ContentField, 'id'>>;
}

export interface UpdateContentModelDto {
  name?: string;
  description?: string;
  icon?: ContentModelIcon;
  status?: 'LIVE' | 'DRAFT';
  fields?: ContentField[];
}