import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ErrorIllustration } from '../components/ErrorIllustration';
import { PATH } from '@/shared/constants/routes';

export function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <ErrorIllustration type="403" size={48} />
      <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">Access denied</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md font-open-sans">
        You do not have permission to access this resource.
      </p>
      <div className="flex gap-4">
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate(PATH.landing.home)}
        >
          Go Home
        </Button>
        <Button size="large" onClick={() => window.location.href = 'mailto:support@contentbay.com'}>
          Contact Administrator
        </Button>
      </div>
    </div>
  );
}
