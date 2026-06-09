import type { ContentField, ContentModel } from '@/entities/content-model';

export interface BaseFieldMutationParams {
  model: ContentModel;
}

export interface CreateFieldParams extends BaseFieldMutationParams {
  newField: Omit<ContentField, 'id'>;
}

export interface UpdateFieldParams extends BaseFieldMutationParams {
  originalApiId: string;
  updatedField: Omit<ContentField, 'id'>;
}

export interface DeleteFieldParams extends BaseFieldMutationParams {
  fieldApiId: string;
}
