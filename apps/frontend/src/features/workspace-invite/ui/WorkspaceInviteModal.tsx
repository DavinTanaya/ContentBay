import { Modal, Form, Input, Select, Button, message } from 'antd';
import {
  MailOutlined,
  CrownOutlined,
  SafetyOutlined,
  EditOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import type { InviteEmailPayload } from '../model/types';

export interface WorkspaceInviteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onInvite: (values: InviteEmailPayload) => Promise<void>;
}

export function WorkspaceInviteModal({
  isOpen,
  onCancel,
  onInvite,
}: WorkspaceInviteModalProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: InviteEmailPayload) => {
    // 1. Langsung tutup modal dan reset form
    onCancel();
    form.resetFields();

    // 2. Munculkan toast loading yang tidak hilang otomatis (duration: 0)
    const hide = message.loading('Sending invitation...', 0);

    // 3. Jalankan pengiriman API secara background
    onInvite(values)
      .then(() => {
        hide();
        message.success(`Invitation sent to ${values.email}!`);
      })
      .catch((err: any) => {
        hide();
        const errorMessage =
          err?.graphQLErrors?.[0]?.message ||
          err?.message ||
          'Failed to invite user.';
        message.error(errorMessage);
      });
  };

  return (
    <Modal
      title={
        <span className="font-poppins font-semibold text-lg text-gray-13">
          Invite a New User
        </span>
      }
      open={isOpen}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      destroyOnClose
      centered
      width={480}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-6"
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label={
            <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 shrink-0">
                <MailOutlined />
              </div>
              <span className="font-semibold text-gray-9 text-sm">
                Email Address
              </span>
            </span>
          }
          rules={[
            { required: true, message: 'Please enter email address!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input placeholder="e.g. johndoe@company.com" size="large" />
        </Form.Item>

        <Form.Item
          name="role"
          label={
            <span className="font-semibold text-gray-9 text-sm">
              Project Role
            </span>
          }
          rules={[{ required: true, message: 'Please select a role!' }]}
          initialValue="Developer"
        >
          <Select
            size="large"
            options={[
              {
                value: 'Owner',
                label: (
                  <div className="flex items-center gap-2 text-gray-9 font-poppins">
                    <CrownOutlined style={{ color: '#faad14' }} />
                    <span>Owner</span>
                  </div>
                ),
              },
              {
                value: 'Admin',
                label: (
                  <div className="flex items-center gap-2 text-gray-9 font-poppins">
                    <SafetyOutlined style={{ color: '#1890ff' }} />
                    <span>Admin</span>
                  </div>
                ),
              },
              {
                value: 'Editor',
                label: (
                  <div className="flex items-center gap-2 text-gray-9 font-poppins">
                    <EditOutlined style={{ color: '#722ed1' }} />
                    <span>Editor</span>
                  </div>
                ),
              },
              {
                value: 'Developer',
                label: (
                  <div className="flex items-center gap-2 text-gray-9 font-poppins">
                    <CodeOutlined style={{ color: '#52c41a' }} />
                    <span>Developer</span>
                  </div>
                ),
              },
            ]}
            optionLabelProp="label"
          />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            size="large"
            onClick={() => {
              onCancel();
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            variant="solid"
            color="geekblue"
            htmlType="submit"
            size="large"
          >
            Invite User
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
