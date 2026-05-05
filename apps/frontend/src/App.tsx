import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd';

import { router } from '@/app/router';
import { GOOGLE_CLIENT_ID } from '@/shared/lib/config';
import { AuthProvider } from '@/features/auth/hooks/useAuth';
import { antThemeConfig } from '@/shared/constants/ant-theme';

export default function App() {
  return (
    <ConfigProvider theme={antThemeConfig}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
}
