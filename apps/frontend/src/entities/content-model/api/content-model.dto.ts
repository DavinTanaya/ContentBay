import type {
  ContentField,
  ContentModelIcon,
} from '../model/content-model.types';

export interface CreateContentModelRequest {
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
