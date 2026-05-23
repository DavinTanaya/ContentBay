import { useState } from 'react';
import { useGetContentModelApi } from '@entities/content-model';
import type {
  ContentField,
  ContentModelJsonSchema,
} from '@entities/content-model';

export const useContentModelDetail = (modelId: string) => {
  const [activeTab, setActiveTab] = useState('fields');

  const { data, loading, error } = useGetContentModelApi(modelId);

  const model = data?.getContentModel;
  const cleanApiId = model?.apiId
    ? model.apiId.replace(/-project-\d+$/i, '').replace(/-project-\w+$/i, '')
    : '';

  const cleanedModel = model
    ? {
        ...model,
        apiId: cleanApiId,
      }
    : null;

  const jsonSchema: ContentModelJsonSchema | null = cleanedModel
    ? {
        name: cleanedModel.name,
        description: cleanedModel.description || '',
        apiId: cleanApiId,
        fields: cleanedModel.fields.map((f: ContentField) => ({
          id: f.apiId,
          label: f.name,
          type: f.type,
          config: {
            localized: f.localized,
            required: f.required,
            isTitle: f.isTitle,
          },
        })),
      }
    : null;

  return {
    activeTab,
    setActiveTab,
    model: cleanedModel,
    loading,
    error,
    jsonSchema,
  };
};
