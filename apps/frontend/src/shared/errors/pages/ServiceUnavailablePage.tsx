import React from 'react';
import { Button } from 'antd';
import { ErrorIllustration } from '../components/ErrorIllustration';

export function ServiceUnavailablePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <ErrorIllustration type="503" size={48} />
      <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">Service temporarily unavailable</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md font-open-sans">
        We are performing maintenance. Please try again later.
      </p>
      <div className="flex gap-4">
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
}
