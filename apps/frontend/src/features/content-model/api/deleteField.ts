import { updateContentModelApi, type ContentField } from '@/entities/content-model';
import type { DeleteFieldParams } from './types';

export const deleteField = async ({ model, fieldApiId }: DeleteFieldParams) => {
  const existingFields = model.fields || [];

  const sanitizeField = (f: ContentField | Omit<ContentField, 'id'>): Omit<ContentField, 'id'> => {
    const { id, ...rest } = f as ContentField;
    return {
      ...rest,
      validations: f.validations as any,
      settings: f.settings as any,
      appearance: f.appearance as any,
    };
  };

  const newFieldsArray = existingFields
    .filter((f) => f.apiId !== fieldApiId)
    .map(sanitizeField);

  const input = {
    name: model.name,
    apiId: model.apiId,
    description: model.description || '',
    icon: model.icon,
    fields: newFieldsArray,
  };

  return updateContentModelApi(model.id, input);
};
