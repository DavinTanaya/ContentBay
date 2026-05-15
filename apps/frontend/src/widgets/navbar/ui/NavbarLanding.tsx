import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Image, Space, type MenuProps } from 'antd';
import { PATH } from '@/shared/constants/routes';
import { assets } from '@/shared/assets';
import { ChevronDown } from 'lucide-react';

const productItems: MenuProps['items'] = [
  { label: <Link to={PATH.landing.product}>Product</Link>, key: 1 },
  { label: 'Pricing', key: 2 },
  { label: 'Templates', key: 3 },
  { label: 'Resources', key: 4 },
];

const resourcesItems: MenuProps['items'] = [
  { label: <Link to={PATH.landing.resource}>Resources</Link>, key: 1 },
  { label: 'Pricing', key: 2 },
  { label: 'Templates', key: 3 },
  { label: 'Resources', key: 4 },
];

export function NavbarLanding() {
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl border border-b-gray-3">
      <div className="max-w-full mx-14">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to={PATH.landing.home}
              className="flex items-center space-x-2"
            >
              <Image
                src={assets.logo}
                alt="ContentBay Logo"
                className="h-8 w-8"
                preview={false}
              />
              <span className="h6-bold text-black">ContentBay</span>
            </Link>
          </div>

          <div className="flex flex-row gap-6 justify-center items-center label-xs-medium font-poppins text-black">
            <Dropdown
              menu={{ items: productItems }}
              trigger={['click']}
              className="label-xs-medium"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  size={2}
                  className="label-xs-medium font-poppins text-black hover:cursor-pointer"
                >
                  Product
                  <ChevronDown strokeWidth={2} size={20} />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              menu={{ items: resourcesItems }}
              trigger={['click']}
              className="label-xs-medium"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  size={2}
                  className="label-xs-medium font-poppins text-black hover:cursor-pointer"
                >
                  Resources
                  <ChevronDown strokeWidth={2} size={20} />
                </Space>
              </a>
            </Dropdown>
            <Link
              to={PATH.landing.documentation}
              className="hover:cursor-pointer"
            >
              Documentation
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="text"
              size="small"
              onClick={() => navigate(PATH.auth.login)}
            >
              Login
            </Button>

            <Button
              variant="solid"
              size="small"
              color="geekblue"
              onClick={() => navigate(PATH.auth.register)}
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
