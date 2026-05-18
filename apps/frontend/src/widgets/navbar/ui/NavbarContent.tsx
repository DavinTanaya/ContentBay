import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSession } from '@/entities/session';
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Tabs,
  type MenuProps,
  type TabsProps,
} from 'antd';

import { PATH } from '@/shared/constants/routes';
import { sharedAssets } from '@/shared/assets';
import { colors } from '@/shared/constants/colors';
import { UserMenuHeader } from '@/entities/user/ui/UserMenuHeader';

const TAB_KEYS: Record<string, string> = {
  'content-model': PATH.contentbay.contentModel,
  content: PATH.contentbay.content,
};

const navItems: TabsProps['items'] = [
  {
    key: 'content-model',
    label: 'Content Model',
  },
  {
    key: 'content',
    label: 'Content',
  },
];

export function NavbarContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSession();

  const handleLogout = () => {
    navigate(PATH.landing.home, { replace: true });
    setTimeout(() => {
      auth.logout();
    }, 10);
  };

  const userItems: MenuProps['items'] = [
    {
      key: 'header',
      label: <UserMenuHeader />,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      label: 'Profile Settings',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const activeKey = location.pathname.startsWith(PATH.contentbay.contentModel)
    ? 'content-model'
    : location.pathname.startsWith(PATH.contentbay.content)
      ? 'content'
      : 'content-model';

  const handleTabChange = (key: string) => {
    const path = TAB_KEYS[key];
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-red-1 px-14 h-16">
      <div className="flex items-center h-full">
        <Link
          to={PATH.contentbay.contentModel}
          className="flex items-center gap-2 mr-10 shrink-0"
        >
          <Image src={sharedAssets.logo} preview={false} className="h-8 w-8" />
          <span className="h6-bold text-black">ContentBay</span>
        </Link>
        <Tabs
          activeKey={activeKey}
          items={navItems}
          onChange={handleTabChange}
          className="h-full font-medium [&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-nav]:h-full [&_.ant-tabs-nav::before]:border-none [&_.ant-tabs-tab:hover]:text-gray-13 [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-blue-7"
          styles={{
            indicator: {
              background: colors.blue[7],
              height: 2.5,
              borderRadius: '999px 999px 0 0',
            },
          }}
        />
        <div className="flex items-center gap-6 ml-auto shrink-0">
          <Button shape="circle" type="text">
            <SettingOutlined className="text-xl" />
          </Button>
          <Dropdown
            menu={{ items: userItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar
              size={40}
              className="bg-blue-6 cursor-pointer hover:opacity-90 transition-all shadow-lg shadow-blue-6/10"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
