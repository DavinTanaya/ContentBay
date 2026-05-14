import React, { useState } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { theme as AntdTheme, ConfigProvider } from 'antd';
import { antThemeConfig } from '@/shared/constants/ant-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
  popupContainer?: HTMLElement | null;
}

export default function ThemeProvider({
  children,
  popupContainer,
}: ThemeProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme] = useState('light');

  const currentAlgorithm =
    theme === 'dark' ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm;

  return (
    <StyleProvider layer>
      <ConfigProvider
        getPopupContainer={() => popupContainer || document.body}
        theme={{
          ...antThemeConfig,
          algorithm: currentAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
