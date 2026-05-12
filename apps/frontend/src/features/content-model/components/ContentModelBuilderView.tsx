import { useState, type FC } from 'react';
import {
  Tabs,
  Button,
  Tag,
  Tooltip,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldPickerModal } from './builder/FieldPickerModal';
import { FieldConfigModal } from './builder/FieldConfigModal';
import { ModelIdentityForm } from './shared/ModelIdentityForm';
import { JSONSchemaPreview } from './shared/JSONSchemaPreview';
import type { ContentField, FieldType } from '../content-model.type';

export const ContentModelBuilderView: FC = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const [fields, setFields] = useState<ContentField[]>([]);
  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
  const [configStep, setConfigStep] = useState(1);
  const [configSubTab, setConfigSubTab] = useState('name');
  const [hasChanges, setHasChanges] = useState(false);

  const handleAddField = () => {
    if (!selectedFieldType) return;
    
    const newField: ContentField = {
      id: Date.now().toString(),
      name: selectedFieldType.title,
      type: selectedFieldType.title,
      icon: selectedFieldType.icon,
      color: '#2563EB',
    };
    setFields([...fields, newField]);
    setIsConfigModalOpen(false);
    setConfigStep(1);
    setHasChanges(true);
  };

  const handleSelectFieldType = (type: FieldType) => {
    setSelectedFieldType({
      ...type,
      color: '#2563EB',
    });
    setIsFieldPickerOpen(false);
    setIsConfigModalOpen(true);
    setConfigStep(1);
    setConfigSubTab('name');
  };

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              onClick={() => navigate('/content-model')}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftOutlined className="text-gray-400" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900 capitalize">
                  {modelId?.replace(/-/g, ' ')}
                </h1>
                {hasChanges && (
                  <Tag
                    color="orange"
                    className="rounded-full px-3 py-0.5 text-[10px] font-bold border-none bg-orange-50 text-orange-500 uppercase tracking-wider"
                  >
                    Unsaved Changes
                  </Tag>
                )}
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Content Type Builder
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="h-11 px-6 font-bold border-gray-100 text-gray-500 rounded-xl"
              onClick={() => navigate('/content-model')}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              className="h-11 px-8 font-bold bg-[#2563EB] rounded-xl shadow-lg shadow-blue-600/10"
              onClick={() => setHasChanges(false)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full p-12">
        <Tabs
          defaultActiveKey="fields"
          className="builder-tabs"
          items={[
            {
              key: 'fields',
              label: 'Fields',
              children: (
                <div className="mt-8">
                  {fields.length === 0 ? (
                    <div className="bg-white rounded-[40px] border-2 border-dashed border-gray-100 p-32 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                      <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center mb-8 rotate-3">
                        <AppstoreAddOutlined className="text-4xl text-[#2563EB]" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Start building your structure
                      </h2>
                      <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
                        Add fields to define the content you want to store for
                        this content type.
                      </p>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="h-14 px-10 rounded-2xl font-bold bg-[#2563EB] text-base"
                        onClick={() => setIsFieldPickerOpen(true)}
                      >
                        Add your first field
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                          {fields.length} Fields
                        </h3>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          className="h-11 px-6 rounded-xl font-bold bg-[#2563EB]"
                          onClick={() => setIsFieldPickerOpen(true)}
                        >
                          Add Field
                        </Button>
                      </div>
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className="group bg-white rounded-[24px] border border-gray-100 p-6 flex items-center justify-between hover:border-[#2563EB] hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-move"
                        >
                          <div className="flex items-center gap-6">
                            <HolderOutlined className="text-gray-300 group-hover:text-gray-400" />
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                              style={{
                                backgroundColor: `${field.color}10`,
                                color: field.color,
                              }}
                            >
                              {field.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-0.5">
                                {field.name}
                              </h4>
                              <p className="text-xs text-gray-400 font-medium">
                                {field.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip title="Edit">
                              <Button
                                icon={<EditOutlined />}
                                className="border-none bg-gray-50 text-gray-400 hover:text-[#2563EB] rounded-lg"
                              />
                            </Tooltip>
                            <Tooltip title="Duplicate">
                              <Button
                                icon={<CopyOutlined />}
                                className="border-none bg-gray-50 text-gray-400 hover:text-[#2563EB] rounded-lg"
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Button
                                icon={<DeleteOutlined />}
                                className="border-none bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg"
                              />
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: 'settings',
              label: 'Name and Description',
              children: (
                <div className="mt-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ModelIdentityForm 
                    initialValues={{
                      name: modelId?.replace(/-/g, ' ') || '',
                      description: ''
                    }}
                    onSave={() => setHasChanges(true)}
                  />
                </div>
              ),
            },
            {
              key: 'json',
              label: 'JSON Preview',
              children: (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <JSONSchemaPreview 
                    modelId={modelId || 'schema'} 
                    schema={{
                      name: modelId?.replace(/-/g, ' '),
                      apiId: modelId,
                      fields: fields.map((f) => ({ id: f.id, name: f.name, type: f.type })),
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <FieldPickerModal 
        isOpen={isFieldPickerOpen}
        onClose={() => setIsFieldPickerOpen(false)}
        onSelectField={handleSelectFieldType}
      />

      <FieldConfigModal 
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        selectedFieldType={selectedFieldType}
        configStep={configStep}
        setConfigStep={setConfigStep}
        configSubTab={configSubTab}
        setConfigSubTab={setConfigSubTab}
        onConfirm={handleAddField}
      />
    </div>
  );
};

