import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSession } from '@/entities/session';
import { Button } from 'antd';
import { useState } from 'react';

export function NavbarContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isModelActive = location.pathname.startsWith('/content-model');
  const isContentActive =
    location.pathname.startsWith('/content') && !isModelActive;

  const handleLogout = () => {
    setIsProfileOpen(false);
    auth.logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="h-[72px] bg-white border-b border-gray-100 flex items-center px-12 sticky top-0 z-50">
      <div className="flex items-center w-full max-w-[1400px] mx-auto">
        <Link to="/content-model" className="flex items-center gap-3 mr-16">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-[#111827] tracking-tight">
            ContentBay
          </span>
        </Link>
        <nav className="flex items-center gap-10 h-full">
          <Link
            to="/content-model"
            className={`text-sm font-bold transition-colors relative h-[72px] flex items-center ${
              isModelActive
                ? 'text-[#111827]'
                : 'text-gray-500 hover:text-[#111827]'
            }`}
          >
            Content Model
            {isModelActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2563EB] rounded-t-full"></div>
            )}
          </Link>
          <Link
            to="/content"
            className={`text-sm font-bold transition-colors relative h-[72px] flex items-center ${
              isContentActive
                ? 'text-[#111827]'
                : 'text-gray-500 hover:text-[#111827]'
            }`}
          >
            Content
            {isContentActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2563EB] rounded-t-full"></div>
            )}
          </Link>
        </nav>
        <div className="flex items-center gap-6 ml-auto">
          <Button className="text-gray-400 hover:text-gray-900 transition-colors">
            <SettingOutlined className="text-xl" />
          </Button>
          <div className="relative">
            <Button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-lg shadow-blue-600/10"
            >
              <UserOutlined className="text-lg" />
            </Button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-100 shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-gray-900">
                      Administrator
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      admin@contentbay.io
                    </p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <UserOutlined className="text-gray-400" />
                    Profile Settings
                  </button>
                  <div className="h-px bg-gray-50 my-1 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <LogoutOutlined />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
