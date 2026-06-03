import type { ContentField, ContentModelIcon } from '..';

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
  fields?: Array<Omit<ContentField, 'id'>>;
}
