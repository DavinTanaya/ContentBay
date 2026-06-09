import { updateContentModelApi, type ContentField } from '@/entities/content-model';
import type { CreateFieldParams } from './types';

export const createField = async ({ model, newField }: CreateFieldParams) => {
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

  const newFieldsArray = [
    ...existingFields.map(sanitizeField),
    sanitizeField(newField),
  ];

  const input = {
    name: model.name,
    apiId: model.apiId,
    description: model.description || '',
    icon: model.icon,
    fields: newFieldsArray,
  };

  return updateContentModelApi(model.id, input);
};
