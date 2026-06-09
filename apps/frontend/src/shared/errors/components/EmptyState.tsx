import { Button } from 'antd';
import React from 'react';
import { ErrorIllustration } from './ErrorIllustration';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionText, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon ? (
        <div className="mb-8">{icon}</div>
      ) : (
        <ErrorIllustration type="empty" />
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-2 font-poppins">{title}</h2>
      <p className="text-sm text-gray-600 mb-8 max-w-sm font-open-sans">
        {description}
      </p>
      {actionText && onAction && (
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
