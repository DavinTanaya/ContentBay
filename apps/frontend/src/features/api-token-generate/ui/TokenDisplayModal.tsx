import { Modal, Button, message } from 'antd';
import { CopyOutlined, WarningOutlined } from '@ant-design/icons';

export interface TokenDisplayModalProps {
  token: string | null;
  onClose: () => void;
}

export function TokenDisplayModal({ token, onClose }: TokenDisplayModalProps) {
  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      message.success('Token copied to clipboard!');
    }
  };

  return (
    <Modal
      title={
        <span className="font-poppins font-semibold text-lg text-gray-13 flex items-center gap-2">
          <KeyIcon />
          New API Token Generated
        </span>
      }
      open={!!token}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose} size="large">
          I have copied the token
        </Button>,
      ]}
      centered
      width={520}
      closable={false}
      maskClosable={false}
    >
      <div className="mt-4 flex flex-col gap-4">
        <div className="bg-orange-50 text-orange-6 p-4 rounded-lg flex items-start gap-3">
          <WarningOutlined className="text-lg mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Make sure to copy your API token now.</p>
            <p>You won't be able to see it again! If you lose it, you'll need to generate a new one.</p>
          </div>
        </div>

        <div className="bg-gray-1 border border-gray-4 rounded-lg p-4 flex items-center justify-between gap-4">
          <code className="text-sm text-gray-9 font-mono break-all">
            {token}
          </code>
          <Button 
            icon={<CopyOutlined />} 
            onClick={handleCopy}
            type="text"
            className="text-gray-6 hover:text-blue-6 shrink-0"
          >
            Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function KeyIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-6">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
      </svg>
    </div>
  );
}
