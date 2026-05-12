import { DownOutlined } from '@ant-design/icons';
import { Button, Image, Space, Typography } from 'antd';

const { Text } = Typography;

export function PrimaryNavigationSection() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/landing-page/background.svg"
            alt="Background"
            width={32}
            height={32}
            preview={false}
          />
          <span className="text-xl font-bold text-slate-900">
            ContentBay
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Button type="text" className="font-medium" icon={<DownOutlined />} iconPosition="end">
            Product
          </Button>
          <Button type="text" className="font-medium" icon={<DownOutlined />} iconPosition="end">
            Solutions
          </Button>
          <Button type="text" className="font-medium">
            Resources
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Button type="text" className="font-bold text-slate-700">
            Log in
          </Button>
          <Button type="primary" shape="round" className="h-10 px-6 font-bold bg-blue-600">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
