import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { router } from '@/app/router';
import { Providers } from '@/app/providers';
import { antThemeConfig } from '@/shared/constants/ant-theme';

import './styles/index.css';

export default function App() {
  return (
    <ConfigProvider theme={antThemeConfig}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ConfigProvider>
  );
}
