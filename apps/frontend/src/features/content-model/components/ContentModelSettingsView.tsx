import { useState, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Spin, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FieldsTable } from './settings/FieldsTable';
import { ModelMetadataSidebar } from './settings/ModelMetadataSidebar';
import { FieldEditModal } from './settings/FieldEditModal';
import { ModelIdentityForm } from './shared/ModelIdentityForm';
import { JSONSchemaPreview } from './shared/JSONSchemaPreview';
import { useContentModel } from '../hooks/useContentModel';
import type { ContentField } from '../content-model.type';

export const ContentModelSettingsView: FC = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fields');
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const { model, loading, error } = useContentModel(modelId);

  if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  if (error || !model) return <Result status="error" title="Failed to load model" />;

  const fieldData: ContentField[] = model.fields || [];

  const jsonSchema = {
    name: model.name,
    description: model.description || '',
    apiId: model.apiId,
    fields: model.fields.map((f: any) => ({
      id: f.apiId,
      label: f.name,
      type: f.type,
      config: { localized: f.localized, required: f.required, isTitle: f.isTitle }
    }))
  };

  const handleEditField = (field: any) => {
    setSelectedField(field);
    setIsFieldModalVisible(true);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-72px)]">
      {/* Back Button */}
      <div className="px-12 pt-8">
        <button
          onClick={() => navigate('/content-model')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors group"
        >
          <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{' '}
          Back to Content Models
        </button>
      </div>

      {/* Detail Header */}
      <div className="px-12 pt-6 pb-0">
        <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-2 capitalize">
          {modelId || 'Article'}
        </h1>
        <p className="text-gray-500 text-lg mb-10 font-medium">
          Blog posts and new article
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

      {/* Tab Content Area */}
      <div className="p-12 bg-white">
        {activeTab === 'fields' && (
          <div className="flex gap-8 max-w-[1400px]">
            {/* Table Area */}
            <div className="flex-[2.5]">
              <FieldsTable
                data={fieldData}
                onEditField={handleEditField}
                onAddNewField={() => navigate(`/content-model/${modelId}`)}
              />
            </div>

            {/* Sidebar Metadata */}
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
                name: modelId || 'Article',
                description: 'Blog posts and new article',
              }}
              onSave={(values) => console.log('Saving model identity:', values)}
            />
          </div>
        )}

        {activeTab === 'json' && (
          <div className="max-w-[1400px]">
            <JSONSchemaPreview
              modelId={modelId || 'article'}
              schema={jsonSchema}
            />
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
