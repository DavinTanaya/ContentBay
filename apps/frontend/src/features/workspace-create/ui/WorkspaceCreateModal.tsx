import { Modal, Form, Input, Button, message } from 'antd';
import type { CreateWorkspaceInput } from '@/entities/workspace/model/dto';

export interface WorkspaceCreateModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateWorkspaceInput) => Promise<unknown>;
  loading?: boolean;
}

export function WorkspaceCreateModal({
  isOpen,
  onCancel,
  onSubmit,
  loading,
}: WorkspaceCreateModalProps) {
  const [form] = Form.useForm<CreateWorkspaceInput>();

  return (
    <Modal
      title={
        <span className="font-poppins font-semibold text-lg text-gray-13">
          Create a New Workspace Space
        </span>
      }
      open={isOpen}
      onCancel={onCancel}
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
            await onSubmit(values);
            message.success(`Workspace "${values.name}" created successfully!`);
            onCancel();
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
          label={
            <span className="font-semibold text-gray-9 text-sm">
              Space Name
            </span>
          }
          rules={[{ required: true, message: 'Please enter space name!' }]}
        >
          <Input
            placeholder="e.g. Production CMS, Staging Space"
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="font-semibold text-gray-9 text-sm">
              Description
            </span>
          }
        >
          <Input.TextArea
            placeholder="Describe the purpose of this workspace"
            rows={3}
            disabled={loading}
          />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-8">
          <Button size="large" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            variant="solid"
            color="geekblue"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Create Space
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
