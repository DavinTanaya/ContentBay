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
    <div className="w-full max-w-3xl mx-auto">
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

      <Card
        className="rounded-[32px] border border-red-100 mt-8 bg-red-50/10 shadow-sm"
        styles={{ body: { padding: '32px' } }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h4 className="text-red-600 font-poppins text-lg font-semibold flex items-center gap-2 mb-1">
              <DeleteOutlined />
              <span>Danger Zone</span>
            </h4>
            <p className="text-gray-500 text-xs font-open-sans">
              Deleting this content model is permanent. All associated content entries will be deleted forever.
            </p>
          </div>
          <Button
            type="primary"
            danger
            loading={isDeleting}
            onClick={handleDelete}
            className="rounded-xl px-6 font-poppins font-semibold text-xs h-10"
          >
            Delete Content Model
          </Button>
        </div>
      </Card>
    </div>
  );
};
