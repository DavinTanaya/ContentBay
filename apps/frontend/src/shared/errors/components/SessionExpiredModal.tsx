import { Modal, Button } from 'antd';
import { AlertCircle } from 'lucide-react';
import { useSessionGuard } from '../hooks/useSessionGuard';
import { PATH } from '@/shared/constants/routes';

export function SessionExpiredModal() {
  const { isSessionExpired, resetSessionGuard } = useSessionGuard();

  const handleSignIn = () => {
    resetSessionGuard();
    localStorage.removeItem('token');
    window.location.href = PATH.auth.login;
  };

  return (
    <Modal
      title={null}
      open={isSessionExpired}
      closable={false}
      maskClosable={false}
      footer={null}
      centered
      width={400}
    >
      <div className="flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Session expired</h2>
        <p className="text-sm text-gray-600 mb-8 font-open-sans">
          Your session has expired. Please sign in again to continue.
        </p>
        <Button
          type="primary"
          size="large"
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </Modal>
  );
}
