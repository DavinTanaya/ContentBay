import { Button } from 'antd';
import { WifiOff } from 'lucide-react';

interface NetworkErrorProps {
  onRetry?: () => void;
}

export function NetworkError({ onRetry }: NetworkErrorProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mb-6">
        <WifiOff size={32} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Unable to connect</h2>
      <p className="text-sm text-gray-600 mb-8 max-w-sm font-open-sans">
        Please check your internet connection and try again.
      </p>
      <Button
        type="default"
        size="large"
        onClick={handleRetry}
      >
        Retry
      </Button>
    </div>
  );
}
