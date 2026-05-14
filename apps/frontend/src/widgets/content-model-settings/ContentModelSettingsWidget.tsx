import { useState, type FC } from 'react';
import { Tabs, Spin, Result } from 'antd';
import { useQuery } from '@apollo/client/react';
import { GET_CONTENT_MODEL } from '@/entities/content-model/api/content-model.queries';
import { FieldEditModal } from '@/features/edit-field';
import {
  FieldsTable,
  ModelMetadataSidebar,
  JSONSchemaPreview,
} from '@entities/content-model';
import { ModelIdentityForm } from '@/features/update-content-model-identity';
import type { ContentModel, ContentField } from '@entities/content-model';

interface ContentModelSettingsWidgetProps {
  modelId: string;
  onBack: () => void;
  onNavigateToBuilder: (modelId: string) => void;
}

export const ContentModelSettingsWidget: FC<
  ContentModelSettingsWidgetProps
> = ({ modelId, onNavigateToBuilder }) => {
  const [activeTab, setActiveTab] = useState('fields');
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const { data, loading, error } = useQuery<{ getContentModel: ContentModel }>(
    GET_CONTENT_MODEL,
    { variables: { id: modelId }, skip: !modelId },
  );

  const model = data?.getContentModel;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error || !model)
    return <Result status="error" title="Failed to load model" />;

  const fieldData: ContentField[] = model.fields || [];

  const jsonSchema = {
    name: model.name,
    description: model.description || '',
    apiId: model.apiId,
    fields: model.fields.map((f: any) => ({
      id: f.apiId,
      label: f.name,
      type: f.type,
      config: {
        localized: f.localized,
        required: f.required,
        isTitle: f.isTitle,
      },
    })),
  };

  const handleEditField = (field: any) => {
    setSelectedField(field);
    setIsFieldModalVisible(true);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-72px)]">
      {/* Detail Header */}
      <div className="px-12 pt-6 pb-0">
        <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-2 capitalize">
          {model.name}
        </h1>
        <p className="text-gray-500 text-lg mb-10 font-medium">
          {model.description || 'No description'}
        </p>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="detail-tabs"
          items={[
            { label: 'Name and Description', key: 'name' },
            { label: 'Fields', key: 'fields' },
            { label: 'JSON Preview', key: 'json' },
          ]}
        />
      </div>
      <div className="p-12 bg-white">
        {activeTab === 'fields' && (
          <div className="flex gap-8 max-w-[1400px]">
            <div className="flex-[2.5]">
              <FieldsTable
                data={fieldData}
                onEditField={handleEditField}
                onAddNewField={() => onNavigateToBuilder(modelId)}
              />
            </div>
            <div className="flex-1">
              <ModelMetadataSidebar
                totalFields={fieldData.length}
                lastRevision="Oct 8, 2025"
                status="LIVE"
              />
            </div>
          </div>
        )}

        {activeTab === 'name' && (
          <div className="max-w-4xl">
            <ModelIdentityForm
              initialValues={{
                id: model.id,
                name: model.name,
                apiId: model.apiId,
                desc: model.description || '',
              }}
            />
          </div>
        )}

        {activeTab === 'json' && (
          <div className="max-w-[1400px]">
            <JSONSchemaPreview modelId={model.apiId} schema={jsonSchema} />
          </div>
        )}
      </div>

      <FieldEditModal
        isOpen={isFieldModalVisible}
        onClose={() => setIsFieldModalVisible(false)}
        field={selectedField}
      />
    </div>
  );
};
