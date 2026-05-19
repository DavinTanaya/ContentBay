import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CONTENT_MODEL } from '@entities/content-model';
import type { ContentModel, ContentField } from '@entities/content-model';

export const useContentModelDetail = (modelId: string) => {
  const [activeTab, setActiveTab] = useState('fields');

  const { data, loading, error } = useQuery<{ getContentModel: ContentModel }>(
    GET_CONTENT_MODEL,
    { variables: { id: modelId }, skip: !modelId },
  );

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

  const jsonSchema = cleanedModel
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
