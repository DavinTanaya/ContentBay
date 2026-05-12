import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Input, Button, Table, Tag, Modal, Checkbox } from 'antd';
import { EditOutlined, MoreOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export const ContentModelSettingsView: React.FC = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fields');
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs">T</div>
          <span className="font-bold text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <span className="text-gray-400 font-medium text-sm">{text}</span>,
    },
    {
      title: 'LOCALIZED',
      dataIndex: 'localized',
      key: 'localized',
      render: (val: boolean) => val ? (
        <div className="w-5 h-5 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
        </div>
      ) : null,
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: () => (
        <div className="flex items-center gap-4">
          <Button type="link" className="text-[#2563EB] font-bold p-0" onClick={() => setIsFieldModalVisible(true)}>Edit</Button>
          <button className="text-gray-300 hover:text-gray-600 transition-colors">
            <MoreOutlined className="text-lg rotate-90" />
          </button>
        </div>
      ),
    },
  ];

  const fieldData = [
    { key: '1', name: 'Title', type: 'Short text', localized: true },
    { key: '2', name: 'Price', type: 'Short text', localized: true },
  ];

  const jsonSchema = {
    name: "Article",
    description: "Main content model for blog posts and news articles.",
    apiId: "article",
    fields: [
      {
        id: "price",
        label: "Price",
        type: "Decimal number",
        config: { localized: true, required: true, isTitle: false }
      },
      {
        id: "name",
        label: "Name",
        type: "Short text",
        config: { localized: true, required: true, isTitle: true }
      },
      {
        id: "description",
        label: "Description",
        type: "Rich text",
        config: { localized: false, required: false, isTitle: false }
      }
    ]
  };

  return (
    <div className="bg-white min-h-[calc(100vh-72px)]">
      {/* Back Button */}
      <div className="px-12 pt-8">
        <button 
          onClick={() => navigate('/content-model')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors group"
        >
          <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" /> Back to Content Models
        </button>
      </div>

      {/* Detail Header */}
      <div className="px-12 pt-6 pb-0">
        <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-2 capitalize">{modelId || 'Article'}</h1>
        <p className="text-gray-500 text-lg mb-10 font-medium">Blog posts and new article</p>
        
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
            <div className="flex-[2.5] bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-fit">
              <div className="px-10 py-8 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Content Fields</h2>
                <Button 
                  type="link" 
                  className="text-[#2563EB] font-bold p-0"
                  onClick={() => navigate(`/content-model/${modelId}`)}
                >
                  + Add new fields
                </Button>
              </div>
              <Table 
                columns={columns} 
                dataSource={fieldData} 
                pagination={false}
                className="clean-table"
              />
            </div>
            
            {/* Sidebar Metadata */}
            <div className="flex-1 bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm h-fit">
              <h2 className="text-xs font-bold text-gray-900 mb-8 tracking-widest uppercase">MODEL METDATA</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Total Fields</span>
                  <span className="text-gray-900 font-bold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Last Revision</span>
                  <span className="text-gray-900 font-bold">Oct 8, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Status</span>
                  <Tag color="#E6FFED" className="text-[#1A7F37] border-none font-bold text-[10px] rounded px-2.5 m-0 uppercase">LIVE</Tag>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'name' && (
          <div className="max-w-4xl bg-white rounded-[32px] p-16 border border-gray-100 shadow-sm">
            <h2 className="text-[32px] font-bold text-gray-900 mb-12">Model Identity</h2>
            <div className="space-y-10">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Display Name</label>
                <Input placeholder="example" className="h-12 rounded-lg bg-white border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Description</label>
                <Input placeholder="example" className="h-12 rounded-lg bg-white border-gray-200" />
              </div>
              <div className="flex justify-end pt-6">
                <Button type="primary" className="h-12 px-10 font-bold bg-[#2563EB] rounded-xl text-base shadow-lg shadow-blue-600/20">Save</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="max-w-[1400px] bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-10 py-6 bg-gray-50 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{modelId?.toUpperCase()}_SCHEMA.JSON</span>
              </div>
              <Button size="small" className="text-[10px] font-bold text-gray-500 rounded-md border-gray-200 bg-white">Copy JSON</Button>
            </div>
            <div className="p-16 font-mono text-sm leading-relaxed text-gray-700 bg-white">
              <pre className="m-0">{JSON.stringify(jsonSchema, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Field Edit Modal */}
      <Modal
        title={
          <div className="flex items-center gap-4 pt-4 pb-2 px-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <EditOutlined className="text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Price</h2>
          </div>
        }
        open={isFieldModalVisible}
        onCancel={() => setIsFieldModalVisible(false)}
        footer={null}
        width={800}
        className="professional-edit-modal"
        centered
        closeIcon={<CloseOutlined className="text-gray-400 text-lg mt-6 mr-6" />}
      >
        <div className="px-12 py-8 space-y-12">
          {/* Section 1 */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8">NAME AND FIELD ID</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase">Name</label>
                <Input placeholder="example" className="h-11 rounded-lg border-gray-200" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase">Field ID</label>
                <Input placeholder="example" className="h-11 rounded-lg border-gray-200" />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8">SETTINGS</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Checkbox className="mt-1" defaultChecked />
                <div>
                  <p className="text-sm font-bold text-gray-800">Use as entry title</p>
                  <p className="text-xs text-gray-400 mt-1">The value of this field will be used as the label for entries in lists</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Checkbox className="mt-1" />
                <div>
                  <p className="text-sm font-bold text-gray-800">Enable localization</p>
                  <p className="text-xs text-gray-400 mt-1">All the content can be translated to German (Germany) and English (United States)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-10">VALIDATION</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Required Field', desc: 'All the content can be translated to German (Germany) and English (United States) locales', checked: false },
                { label: 'Unique field', desc: 'You won\'t be able to publish an entry if there is an existing entry with identical content', checked: true },
                { label: 'Limit character count', desc: 'Specify a minimum and/or maximum allowed number of characters', checked: false },
                { label: 'Match a specific pattern', desc: 'Make this field match a pattern: e-mail address, URI, or a custom regular expression', checked: false },
                { label: 'Prohibit a specific pattern', desc: 'Make this field invalid when a pattern is matched: custom regular expression (e.g. bad word list)', checked: true },
                { label: 'Accept only specified values', desc: 'You won\'t be able to publish an entry if the field value is not in the list of specified values', checked: false },
              ].map((val, i) => (
                <div key={i} className="p-8 rounded-[32px] border border-gray-100 bg-white shadow-sm flex items-start gap-5">
                  <Checkbox className="mt-1" defaultChecked={val.checked} />
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 mb-2">{val.label}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 pb-4">
            <Button className="h-12 px-8 rounded-xl font-bold border-gray-200 text-gray-500" onClick={() => setIsFieldModalVisible(false)}>Cancel</Button>
            <Button type="primary" className="h-12 px-10 rounded-xl font-bold bg-[#2563EB] border-none shadow-lg shadow-blue-600/20" onClick={() => setIsFieldModalVisible(false)}>Confirm Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
