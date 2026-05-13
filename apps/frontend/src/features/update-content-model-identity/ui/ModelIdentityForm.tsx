import React from 'react';
import { Form, Input, Button } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useUpdateContentModelIdentity } from '../model/useUpdateContentModelIdentity';

interface ModelIdentityFormProps {
  initialValues: {
    id: string;
    name: string;
    apiId: string;
    desc?: string;
  };
}

export const ModelIdentityForm: React.FC<ModelIdentityFormProps> = ({ initialValues }) => {
  const [form] = Form.useForm();
  const { updateIdentity, isUpdating } = useUpdateContentModelIdentity(initialValues.id);

  const onFinish = (values: any) => {
    updateIdentity({
      name: values.name,
      description: values.description,
      apiId: initialValues.apiId
    });
  };

  return (
    <div className="max-w-3xl">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: initialValues.name,
          description: initialValues.desc
        }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label={
            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
              <InfoCircleOutlined className="text-blue-500" /> Content Type Name
            </span>
          }
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input 
            placeholder="e.g. Blog Post, Product, etc." 
            className="h-14 rounded-2xl bg-gray-50 border-gray-100 px-6 font-bold text-lg"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
              <EditOutlined className="text-blue-500" /> Description
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="What is this content type used for?"
            className="rounded-3xl bg-gray-50/50 border-gray-100 p-6 font-medium leading-relaxed"
          />
        </Form.Item>

        <div className="pt-10 border-t border-gray-50 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
            className="h-14 px-12 rounded-2xl font-bold bg-[#2563EB]"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};
