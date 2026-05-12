import type { FC } from 'react';
import { Input, Button, Form } from 'antd';

interface ModelIdentityFormProps {
  initialValues?: {
    name: string;
    description: string;
  };
  onSave: (values: any) => void;
}

export const ModelIdentityForm: FC<ModelIdentityFormProps> = ({
  initialValues,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-[32px] p-16 border border-gray-100 shadow-sm shadow-blue-900/5">
      <h2 className="text-2xl font-bold text-gray-900 mb-12">Model Identity</h2>
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSave}
        className="space-y-10"
      >
        <Form.Item
          label={
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Display Name
            </span>
          }
          name="name"
        >
          <Input className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 font-bold px-6" />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Description
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
            className="h-14 px-12 rounded-2xl font-bold bg-[#2563EB]"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};
