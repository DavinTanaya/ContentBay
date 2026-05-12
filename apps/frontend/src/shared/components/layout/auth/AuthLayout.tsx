import React from 'react';
import authBg from '@/shared/assets/auth/auth-bg.jpg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Column: Image Background */}
      <div className="hidden lg:block lg:w-[30%] relative">
        <img
          src={authBg}
          alt="Authentication Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-600/40" />
      </div>

      {/* Right Column: Content */}
      <div className="flex w-full flex-col overflow-y-auto bg-gray-50 lg:w-[70%]">
        {/* Header/Logo */}
        <div className="px-10 pt-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-blue-500" />
            <span className="text-lg font-bold text-gray-900">ContentBay</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 items-center justify-center px-10 py-8 lg:px-16">
          {children}
        </div>
      </div>
    </div>
  );
}
