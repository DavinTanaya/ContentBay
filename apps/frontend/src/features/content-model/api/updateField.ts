import { updateContentModelApi, type ContentField } from '@/entities/content-model';
import type { UpdateFieldParams } from './types';

export const updateField = async ({ model, originalApiId, updatedField }: UpdateFieldParams) => {
  const existingFields = model.fields || [];

  const sanitizeField = (f: ContentField | Omit<ContentField, 'id'>): Omit<ContentField, 'id'> => {
    const { id, __typename, ...rest } = f as any;
    return {
      ...rest,
      validations: f.validations as any,
      settings: f.settings as any,
      appearance: f.appearance as any,
    };
  };

  const newFieldsArray = existingFields.map((f) => {
    if (f.apiId === originalApiId) {
      return sanitizeField(updatedField);
    }
    return sanitizeField(f);
  });

  const input = {
    name: model.name,
    apiId: model.apiId,
    description: model.description || '',
    icon: model.icon,
    fields: newFieldsArray,
  };

  return updateContentModelApi(model.id, input);
};
