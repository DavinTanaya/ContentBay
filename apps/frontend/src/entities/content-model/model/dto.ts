import type { ContentField, ContentModelIcon } from './types';

export interface CreateContentModelRequest {
  workspaceId?: string;
  name: string;
  apiId: string;
  description?: string;
  icon: ContentModelIcon;
  fields?: Array<Omit<ContentField, 'id'>>;
}

export interface UpdateContentModelRequest {
  name?: string;
  description?: string;
  icon?: ContentModelIcon;
  status?: 'LIVE' | 'DRAFT';
  fields?: ContentField[];
}
