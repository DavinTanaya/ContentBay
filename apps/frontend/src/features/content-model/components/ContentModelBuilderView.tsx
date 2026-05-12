import React, { useState } from 'react';
import { Tabs, Button, Modal, Radio, Checkbox, Input, Tag, Tooltip } from 'antd';
import { 
  ArrowLeftOutlined, 
  PlusOutlined, 
  SaveOutlined, 
  EditOutlined, 
  CopyOutlined, 
  DeleteOutlined,
  AppstoreAddOutlined,
  CloseOutlined,
  HolderOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

export const ContentModelBuilderView: React.FC = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  const [fields, setFields] = useState<any[]>([]);
  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<any>(null);
  const [configStep, setConfigStep] = useState(1);
  const [configSubTab, setConfigSubTab] = useState('name');
  const [hasChanges, setHasChanges] = useState(false);

  const fieldTypes = [
    { title: 'Text', desc: 'Titles, names, slugs', icon: 'T', color: '#2563EB' },
    { title: 'Rich text', desc: 'Formatting, links, images', icon: 'R', color: '#7C3AED' },
    { title: 'Number', desc: 'Prices, ratings, IDs', icon: '#', color: '#059669' },
    { title: 'Date', desc: 'Events, deadlines', icon: 'D', color: '#D97706' },
    { title: 'Media', desc: 'Images, videos, files', icon: 'M', color: '#DB2777' },
    { title: 'Boolean', desc: 'Yes/no toggle', icon: 'B', color: '#4B5563' },
    { title: 'Reference', desc: 'Links to other entries', icon: '🔗', color: '#2563EB' },
    { title: 'JSON', desc: 'Custom data structure', icon: '{ }', color: '#000000' },
  ];

  const handleAddField = () => {
    const newField = {
      id: Date.now().toString(),
      name: selectedFieldType.title,
      type: selectedFieldType.title,
      icon: selectedFieldType.icon,
      color: selectedFieldType.color
    };
    setFields([...fields, newField]);
    setIsConfigModalOpen(false);
    setConfigStep(1);
    setHasChanges(true);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/content-model')}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftOutlined className="text-gray-400" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900 capitalize">{modelId?.replace(/-/g, ' ')}</h1>
                {hasChanges && <Tag color="orange" className="rounded-full px-3 py-0.5 text-[10px] font-bold border-none bg-orange-50 text-orange-500 uppercase tracking-wider">Unsaved Changes</Tag>}
              </div>
              <p className="text-xs text-gray-400 font-medium">Content Type Builder</p>
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
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Start building your structure</h2>
                      <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
                        Add fields to define the content you want to store for this content type.
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
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{fields.length} Fields</h3>
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
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${field.color}10`, color: field.color }}>
                              {field.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-0.5">{field.name}</h4>
                              <p className="text-xs text-gray-400 font-medium">{field.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Tooltip title="Edit"><Button icon={<EditOutlined />} className="border-none bg-gray-50 text-gray-400 hover:text-[#2563EB] rounded-lg" /></Tooltip>
                            <Tooltip title="Duplicate"><Button icon={<CopyOutlined />} className="border-none bg-gray-50 text-gray-400 hover:text-[#2563EB] rounded-lg" /></Tooltip>
                            <Tooltip title="Delete"><Button icon={<DeleteOutlined />} className="border-none bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg" /></Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            },
            {
              key: 'settings',
              label: 'Name and Description',
              children: (
                <div className="mt-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-[32px] p-16 border border-gray-100 shadow-sm shadow-blue-900/5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-12">Model Identity</h2>
                    <div className="space-y-10">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Display Name</label>
                        <Input defaultValue={modelId?.replace(/-/g, ' ')} className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Description</label>
                        <Input.TextArea rows={4} placeholder="What is this content type used for?" className="rounded-3xl bg-gray-50/50 border-gray-100 p-6 font-medium leading-relaxed" />
                      </div>
                      <div className="pt-10 border-t border-gray-50 flex justify-end">
                        <Button type="primary" className="h-14 px-12 rounded-2xl font-bold bg-[#2563EB]">Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            },
            { 
              key: 'json', 
              label: 'JSON Preview',
              children: (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-10 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{modelId?.toUpperCase()}_SCHEMA.JSON</span>
                      </div>
                      <Button className="h-10 px-6 font-bold border-gray-100 text-gray-500 rounded-xl">Copy JSON</Button>
                    </div>
                    <div className="p-12 font-mono text-sm leading-relaxed text-gray-700 bg-white">
                      <pre className="p-8 bg-gray-50/30 rounded-2xl border border-gray-50">
{`{
  "name": "${modelId?.replace(/-/g, ' ')}",
  "apiId": "${modelId}",
  "fields": ${JSON.stringify(fields.map(f => ({ id: f.id, name: f.name, type: f.type })), null, 2)}
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )
            },
          ]}
        />
      </div>

      {/* Field Picker Modal */}
      <Modal
        title={null}
        open={isFieldPickerOpen}
        onCancel={() => setIsFieldPickerOpen(false)}
        footer={null}
        width={900}
        centered
        className="field-picker-modal"
      >
        <div className="p-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Add new field</h2>
            <p className="text-gray-400 font-medium">Select a type of field you want to add to your structure</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fieldTypes.map((type) => (
              <div 
                key={type.title}
                onClick={() => {
                  setSelectedFieldType(type);
                  setIsFieldPickerOpen(false);
                  setIsConfigModalOpen(true);
                  setConfigStep(1);
                  setConfigSubTab('name');
                }}
                className="p-8 rounded-[32px] border border-gray-50 bg-gray-50/30 hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center font-bold text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed px-2">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Field Config Modal */}
      <Modal
        title={null}
        open={isConfigModalOpen}
        onCancel={() => setIsConfigModalOpen(false)}
        footer={null}
        width={configStep === 1 ? 700 : 1100}
        centered
        className="field-config-modal"
        closeIcon={<CloseOutlined className="mt-6 mr-6 text-gray-400" />}
      >
        {configStep === 1 ? (
          <div className="p-16">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl" style={{ backgroundColor: `${selectedFieldType?.color}10`, color: selectedFieldType?.color }}>
                {selectedFieldType?.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Configure {selectedFieldType?.title}</h2>
                <p className="text-gray-400 font-medium">Set the basic identity for this field</p>
              </div>
            </div>
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Name</label>
                  <Input defaultValue={selectedFieldType?.title} className="h-12 rounded-xl border-gray-100 font-bold px-4" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Field ID</label>
                  <Input defaultValue={selectedFieldType?.title.toLowerCase()} className="h-12 rounded-xl border-gray-100 bg-gray-50 px-4 font-mono text-xs" />
                </div>
              </div>
              <div className="pt-10 border-t border-gray-50 flex justify-end gap-3">
                <Button className="h-12 px-8 rounded-xl font-bold border-gray-100 text-gray-500" onClick={() => setIsConfigModalOpen(false)}>Cancel</Button>
                <Button 
                  type="primary" 
                  className="h-12 px-10 rounded-xl font-bold bg-[#1A7F37] border-none shadow-lg shadow-green-900/10"
                  onClick={() => setConfigStep(2)}
                >
                  Add and Configure
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[650px]">
            {/* Sidebar Stepper */}
            <div className="w-72 border-r border-gray-50 p-10 space-y-3 bg-gray-50/20">
              <div className="mb-10 pl-2">
                <Tag className="rounded-lg px-3 py-1 font-bold text-[10px] border-none" style={{ backgroundColor: `${selectedFieldType?.color}15`, color: selectedFieldType?.color }}>
                  {selectedFieldType?.title.toUpperCase()} FIELD
                </Tag>
              </div>
              {[
                { id: 'name', label: 'Identity' },
                { id: 'validation', label: 'Validation' },
                { id: 'appearance', label: 'Appearance' },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setConfigSubTab(item.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${configSubTab === item.id ? 'bg-white text-[#2563EB] shadow-sm border border-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Config Content */}
            <div className="flex-grow flex flex-col">
              <div className="flex-grow p-16">
                {configSubTab === 'name' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-10">Field Identity</h3>
                    <div className="space-y-8 max-w-lg">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Display Name</label>
                        <Input defaultValue={selectedFieldType?.title} className="h-12 rounded-xl border-gray-100 font-bold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">API ID</label>
                        <Input defaultValue={selectedFieldType?.title.toLowerCase()} className="h-12 rounded-xl border-gray-100 bg-gray-50 font-mono text-xs" />
                      </div>
                    </div>
                  </div>
                )}
                {configSubTab === 'validation' && (
                  <div className="animate-in fade-in duration-300 space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-10">Validation Rules</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <Checkbox className="font-bold text-gray-700">Required field <span className="text-gray-400 font-medium block text-xs mt-1">Cannot be empty when publishing</span></Checkbox>
                      <Checkbox className="font-bold text-gray-700">Unique field <span className="text-gray-400 font-medium block text-xs mt-1">Must be different from other entries</span></Checkbox>
                    </div>
                  </div>
                )}
                {configSubTab === 'appearance' && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-10">Appearance Widget</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl border-2 border-[#2563EB] bg-blue-50/20">
                        <Radio checked className="font-bold">Standard Input</Radio>
                        <p className="text-[10px] text-gray-400 mt-2 ml-6">The default input for this field type</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-10 border-t border-gray-50 bg-gray-50/20 flex justify-end gap-3 mt-auto rounded-br-[24px]">
                <Button className="h-12 px-8 rounded-xl font-bold border-gray-100 text-gray-500" onClick={() => setConfigStep(1)}>Back</Button>
                <Button 
                  type="primary" 
                  className="h-12 px-12 rounded-xl font-bold bg-[#1A7F37] border-none"
                  onClick={handleAddField}
                >
                  Confirm & Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
