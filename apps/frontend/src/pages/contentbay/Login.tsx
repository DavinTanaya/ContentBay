import { LoginForm } from '@/features/auth/components/LoginForm';

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block lg:w-[30%] relative">
        <img
          src="/auth/login.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/40" />
      </div>

      <div className="flex w-full flex-col bg-gray-3 lg:w-[70%]">
        <div className="px-10 pt-6 lg:px-16">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-blue-500" />
            <span className="text-lg font-bold text-gray-900">ContentBay</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-10 py-4 lg:px-16">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
