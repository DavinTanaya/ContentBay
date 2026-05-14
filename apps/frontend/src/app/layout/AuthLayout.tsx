import { Image } from 'antd';
import { Outlet } from 'react-router-dom';
import authBg from './assets/auth-bg.jpg';

export function AuthLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block lg:w-[30%] relative h-full">
        <Image
          src={authBg}
          alt="Authentication Background"
          preview={false}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
          rootClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-blue-600/40" />
      </div>
      <div className="flex w-full flex-col overflow-y-auto bg-gray-50 lg:w-[70%]">
        <div className="px-10 pt-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-blue-500" />
            <span className="text-lg font-bold text-gray-900">ContentBay</span>
          </div>
        </div>
        <main className="flex flex-1 items-center justify-center p-10 lg:p-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
