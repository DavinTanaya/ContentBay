import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { InfoCircleOutlined, EditOutlined, ApiOutlined } from '@ant-design/icons';
import {
  User,
  FolderOpen,
  FileText,
  Box,
  Image as ImageIcon,
  Settings,
  MapPin,
  Database,
} from 'lucide-react';
import { useCreateContentModel } from '../model/useCreateContentModel';

const ICON_OPTIONS = [
  { value: 'person', label: <div className="flex items-center gap-2"><User size={16} /><span>Person</span></div> },
  { value: 'folder', label: <div className="flex items-center gap-2"><FolderOpen size={16} /><span>Folder</span></div> },
  { value: 'document', label: <div className="flex items-center gap-2"><FileText size={16} /><span>Document</span></div> },
  { value: 'box', label: <div className="flex items-center gap-2"><Box size={16} /><span>Box</span></div> },
  { value: 'media', label: <div className="flex items-center gap-2"><ImageIcon size={16} /><span>Media</span></div> },
  { value: 'settings', label: <div className="flex items-center gap-2"><Settings size={16} /><span>Settings</span></div> },
  { value: 'map-pin', label: <div className="flex items-center gap-2"><MapPin size={16} /><span>Map Pin</span></div> },
  { value: 'database', label: <div className="flex items-center gap-2"><Database size={16} /><span>Database</span></div> },
];

interface ContentModelCreateFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ContentModelCreateForm: React.FC<ContentModelCreateFormProps> = ({
  onBack,
  onSuccess,
}) => {
  const { form, handleNameChange, onFinish, loading } = useCreateContentModel(onSuccess);

  return (
    <div className="w-full max-w-3xl mx-auto pt-4">
      <Card
        className="rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100"
        styles={{ body: { padding: '32px' } }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ icon: 'box' }}
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-6"
        >
          <Form.Item
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6">
                  <InfoCircleOutlined />
                </div>
                Name
              </span>
            }
            name="name"
            rules={[
              { required: true, message: 'Please input the name!' },
              { max: 50, message: 'Name cannot exceed 50 characters' }
            ]}
          >
            <Input
              placeholder="e.g. Blog Post"
              size="large"
              className="font-open-sans"
              onChange={handleNameChange}
              maxLength={50}
              showCount
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6">
                  <ApiOutlined />
                </div>
                API Identifier
              </span>
            }
            name="apiId"
            rules={[{ required: true, message: 'Please input the API ID!' }]}
            tooltip="Auto-generated from name. Used in API endpoints."
          >
            <Input
              placeholder="e.g. blog-post"
              size="large"
              className="font-mono text-sm"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6">
                  <EditOutlined />
                </div>
                Description
              </span>
            }
            name="description"
            rules={[
              { max: 250, message: 'Description cannot exceed 250 characters' }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="What is this content type used for?"
              size="large"
              className="font-open-sans"
              maxLength={250}
              showCount
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6">
                  <InfoCircleOutlined />
                </div>
                Icon
              </span>
            }
            name="icon"
          >
            <Select
              size="large"
              className="font-open-sans"
              placeholder="Select an icon"
              options={ICON_OPTIONS}
              optionLabelProp="label"
            />
          </Form.Item>

          <div className="pt-4 border-t border-gray-50 mt-8 flex justify-end gap-4">
            <Form.Item className="mb-0">
              <Button
                type="text"
                onClick={onBack}
                size="middle"
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                variant="solid"
                color="geekblue"
                htmlType="submit"
                loading={loading}
                size="middle"
              >
                Create Content Model
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};
