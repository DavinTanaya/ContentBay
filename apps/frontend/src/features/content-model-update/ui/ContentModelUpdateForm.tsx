import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Select, Modal, message } from 'antd';
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
import { useUpdateContentModel } from '../model/useUpdateContentModel';
import type { ContentModelIcon } from '@entities/content-model';
import { deleteContentModelApi } from '@/entities/content-model';
import { useActiveWorkspaceId } from '@/entities/workspace';
import { getContentModelPath } from '@/shared/constants/routes';

export interface ContentModelInitialValues {
  id: string;
  name: string;
  apiId: string;
  desc?: string;
  icon?: ContentModelIcon;
}

export interface ContentModelUpdateFormProps {
  initialValues: ContentModelInitialValues;
}

interface ContentModelFormValues {
  name: string;
  description?: string;
  icon?: ContentModelIcon;
}
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
  const [form] = Form.useForm<ContentModelFormValues>();
  const { updateIdentity, isUpdating } = useUpdateContentModel(initialValues.id);
  const navigate = useNavigate();
  const activeSpaceId = useActiveWorkspaceId();
  const [isDeleting, setIsDeleting] = useState(false);

  const onFinish = (values: ContentModelFormValues) => {
    updateIdentity({
      name: values.name,
      description: values.description,
      apiId: initialValues.apiId,
      icon: values.icon,
    });
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Delete Content Model',
      icon: <DeleteOutlined className="text-red-500" />,
      content: `Are you sure you want to delete the content model "${initialValues.name}"? All content entries under this model will be permanently deleted. This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setIsDeleting(true);
        try {
          await deleteContentModelApi(initialValues.id);
          message.success('Content model deleted successfully');
          navigate(getContentModelPath(activeSpaceId));
        } catch {
          message.error('Failed to delete content model');
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  return (
    <div className="w-full">
      <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.12)] hover:-translate-y-[2px] transition-all duration-500 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-10 m-0">Detail</h3>
            <p className="text-sm text-gray-500 m-0 mt-1">Configure name, description, and icon for this content model.</p>
          </div>
        </div>

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
          className="w-full"
        >
          <Form.Item
            label={<span className="text-sm font-medium text-gray-8">Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input
              placeholder={initialValues.name}
              size="large"
              className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 transition-all font-open-sans"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium text-gray-8">Description</span>}
            name="description"
          >
            <Input.TextArea
              rows={4}
              placeholder={initialValues.desc}
              size="large"
              className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl resize-none py-3 transition-all font-open-sans"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium text-gray-8">Icon</span>}
            name="icon"
          >
            <Select
              size="large"
              className="font-open-sans [&_.ant-select-selector]:bg-slate-50 [&_.ant-select-selector]:border-transparent hover:[&_.ant-select-selector]:border-blue-200 focus:[&_.ant-select-selector]:bg-white focus:[&_.ant-select-selector]:border-blue-400 focus:[&_.ant-select-selector]:ring-2 focus:[&_.ant-select-selector]:ring-blue-100 [&_.ant-select-selector]:rounded-xl [&_.ant-select-selector]:h-12 [&_.ant-select-selector]:transition-all [&_.ant-select-selection-item]:leading-[46px] [&_.ant-select-selection-placeholder]:leading-[46px]"
              placeholder="Select an icon"
              options={ICON_OPTIONS}
              optionLabelProp="label"
            />
          </Form.Item>

          <div className="flex justify-end mt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              size="large"
              className="h-12 px-8 rounded-xl shadow-sm bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>

      <div className="relative rounded-[32px] bg-white ring-1 ring-red-200/50 shadow-none hover:ring-red-400 hover:shadow-[0_12px_32px_rgba(255,100,100,0.12)] hover:-translate-y-[2px] transition-all duration-500 p-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-2xl bg-red-50/80 ring-1 ring-red-100 flex items-center justify-center text-red-500 shadow-sm shrink-0">
              <DeleteOutlined className="text-[22px]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-10 m-0">Delete Content Model</h3>
              <p className="text-sm text-gray-500 mt-1 m-0 max-w-lg">
                Deleting this content model is permanent. All associated content entries will be deleted forever.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4 md:mt-0">
            <Button
              type="primary"
              danger
              loading={isDeleting}
              onClick={handleDelete}
              className="h-11 px-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center font-semibold"
            >
              Delete Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
