import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { CreateWorkspaceInput } from '@/entities/workspace/model/dto';

interface WorkspaceModalsProps {
  isAddModalOpen: boolean;
  onAddModalCancel: () => void;
  onAddSubmit: (values: CreateWorkspaceInput) => Promise<unknown>;
}

export function WorkspaceModals({
  isAddModalOpen,
  onAddModalCancel,
  onAddSubmit,
}: WorkspaceModalsProps) {
  const [form] = Form.useForm<CreateWorkspaceInput>();

  return (
    <>
      {/* Add Workspace Modal */}
      <Modal
        title={
          <span className="font-poppins font-semibold text-lg text-gray-13">
            Create a New Workspace Space
          </span>
        }
        open={isAddModalOpen}
        onCancel={onAddModalCancel}
        footer={null}
        destroyOnClose
        centered
        width={480}
      >
        <Form<CreateWorkspaceInput>
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await onAddSubmit(values);
              message.success(`Workspace "${values.name}" created successfully!`);
              onAddModalCancel();
              form.resetFields();
            } catch (err: unknown) {
              const error = err as Error;
              message.error(error.message || 'Failed to create workspace.');
            }
          }}
          className="mt-6"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-9 text-sm">Space Name</span>}
            rules={[{ required: true, message: 'Please enter space name!' }]}
          >
            <Input placeholder="e.g. Production CMS, Staging Space" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="font-semibold text-gray-9 text-sm">Description</span>}
          >
            <Input.TextArea placeholder="Describe the purpose of this workspace" rows={3} />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button size="large" onClick={onAddModalCancel}>
              Cancel
            </Button>
            <Button type="primary" variant="solid" color="geekblue" htmlType="submit" size="large">
              Create Space
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export const showDeleteConfirmation = (
  id: string, 
  name: string, 
  onConfirm: (id: string) => Promise<unknown>
) => {
  Modal.confirm({
    icon: null,
    title: null,
    content: (
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 mb-6 shadow-sm shadow-blue-500/10">
          <ExclamationCircleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        </div>
        <h3 className="font-poppins text-lg font-bold text-gray-13 mb-3 leading-snug">
          Are you absolutely sure?
        </h3>
        <p className="font-poppins text-sm text-gray-8 leading-relaxed mb-0">
          This action is <span className="font-semibold text-red-5" style={{ color: '#ff4d4f' }}>irreversible</span> and will permanently delete the workspace <span className="font-semibold text-gray-10" style={{ color: '#262626' }}>"{name}"</span> along with all nested content schemas and configuration histories.
        </p>
      </div>
    ),
    okText: 'Yes, Delete Space',
    okType: 'danger',
    cancelText: 'Cancel',
    centered: true,
    width: 440,
    okButtonProps: {
      size: 'large',
      className: 'rounded-xl h-11 px-6 font-medium font-poppins shadow-sm',
      style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#ffffff' },
    },
    cancelButtonProps: {
      size: 'large',
      className: 'rounded-xl h-11 px-6 font-medium font-poppins border-gray-4 text-gray-8 hover:text-gray-13 hover:border-gray-6',
      style: { borderRadius: '12px' },
    },
    onOk: async () => {
      try {
        await onConfirm(id);
        message.success(`Workspace "${name}" has been deleted.`);
      } catch (err: unknown) {
        const error = err as Error;
        message.error(error.message || 'Failed to delete workspace.');
      }
    },
  });
};
