import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
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
import { useContentModelUpdateForm } from '../model/useContentModelUpdateForm';
import type { ContentModelUpdateFormProps } from '../model/content-model-update.types';

const ICON_OPTIONS = [
  {
    value: 'person',
    label: (
      <div className="flex items-center gap-2">
        <User size={16} />
        <span>Person</span>
      </div>
    ),
  },
  {
    value: 'folder',
    label: (
      <div className="flex items-center gap-2">
        <FolderOpen size={16} />
        <span>Folder</span>
      </div>
    ),
  },
  {
    value: 'document',
    label: (
      <div className="flex items-center gap-2">
        <FileText size={16} />
        <span>Document</span>
      </div>
    ),
  },
  {
    value: 'box',
    label: (
      <div className="flex items-center gap-2">
        <Box size={16} />
        <span>Box</span>
      </div>
    ),
  },
  {
    value: 'media',
    label: (
      <div className="flex items-center gap-2">
        <ImageIcon size={16} />
        <span>Media</span>
      </div>
    ),
  },
  {
    value: 'settings',
    label: (
      <div className="flex items-center gap-2">
        <Settings size={16} />
        <span>Settings</span>
      </div>
    ),
  },
  {
    value: 'map-pin',
    label: (
      <div className="flex items-center gap-2">
        <MapPin size={16} />
        <span>Map Pin</span>
      </div>
    ),
  },
  {
    value: 'database',
    label: (
      <div className="flex items-center gap-2">
        <Database size={16} />
        <span>Database</span>
      </div>
    ),
  },
];

export const ContentModelUpdateForm: React.FC<ContentModelUpdateFormProps> = ({
  initialValues,
}) => {
  const { form, isUpdating, onFinish } =
    useContentModelUpdateForm(initialValues);

  return (
    <div className="w-full max-w-3xl mx-auto pt-4">
      <Card
        className="rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100"
        styles={{ body: { padding: '32px' } }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: initialValues.name,
            description: initialValues.desc,
            icon: initialValues.icon,
          }}
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
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input
              placeholder={initialValues.name}
              size="large"
              className="font-open-sans"
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
          >
            <Input.TextArea
              rows={4}
              placeholder={initialValues.desc}
              size="large"
              className="font-open-sans"
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

          <div className="pt-4 border-t border-gray-50 mt-8 flex justify-end">
            <Form.Item className="mb-0">
              <Button
                variant="solid"
                color="geekblue"
                htmlType="submit"
                loading={isUpdating}
                size="middle"
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};
