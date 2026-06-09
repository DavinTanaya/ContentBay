import { AlertTriangle, XCircle, ShieldAlert, FileQuestion, ServerCrash, Ban } from 'lucide-react';
import React from 'react';

export type ErrorType = '401' | '403' | '404' | '500' | '503' | 'network' | 'empty';

interface ErrorIllustrationProps {
  type: ErrorType;
  size?: number;
}

export function ErrorIllustration({ type, size = 48 }: ErrorIllustrationProps) {
  const renderIcon = () => {
    switch (type) {
      case '401':
        return <ShieldAlert size={size} />;
      case '403':
        return <Ban size={size} />;
      case '404':
        return <FileQuestion size={size} />;
      case '500':
        return <ServerCrash size={size} />;
      case '503':
        return <AlertTriangle size={size} />;
      case 'network':
        return <AlertTriangle size={size} />;
      case 'empty':
        return <FileQuestion size={size} />;
      default:
        return <XCircle size={size} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case '401':
      case '403':
        return 'bg-red-50 text-red-500';
      case '500':
      case '503':
        return 'bg-orange-50 text-orange-500';
      case '404':
      case 'empty':
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${getColors()}`}>
      {renderIcon()}
    </div>
  );
}
