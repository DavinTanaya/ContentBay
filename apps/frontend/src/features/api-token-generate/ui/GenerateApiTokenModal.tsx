import { Modal, Form, Input, Button } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

export interface GenerateApiTokenModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onGenerate: (values: { name: string }) => Promise<void>;
  loading: boolean;
}

export function GenerateApiTokenModal({
  isOpen,
  onCancel,
  onGenerate,
  loading,
}: GenerateApiTokenModalProps) {
  const [form] = Form.useForm();

  const handleFinish = async (values: { name: string }) => {
    await onGenerate(values);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <span className="font-poppins font-semibold text-lg text-gray-13">
          Generate API Token
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
          name="name"
          label={
            <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 shrink-0">
                <KeyOutlined />
              </div>
              <span className="font-semibold text-gray-9 text-sm">
                Token Name
              </span>
            </span>
          }
          rules={[
            { required: true, message: 'Please enter a token name!' },
            { min: 3, message: 'Name must be at least 3 characters long!' },
          ]}
        >
          <Input placeholder="e.g. Production Frontend App" size="large" />
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
            loading={loading}
          >
            Generate Token
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
