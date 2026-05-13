import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'contentbay.tech',
      'www.contentbay.tech',
      'contentbay-staging.tech',
      'www.contentbay-staging.tech',
      ...(process.env.VITE_ALLOWED_HOSTS?.split(',').map((host) => host.trim()).filter(Boolean) ?? []),
    ],
  },
  preview: {
    allowedHosts: [
      'contentbay.tech',
      'www.contentbay.tech',
      'contentbay-staging.tech',
      'www.contentbay-staging.tech',
      ...(process.env.VITE_ALLOWED_HOSTS?.split(',').map((host) => host.trim()).filter(Boolean) ?? []),
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@icons': path.resolve(__dirname, 'src/shared/components/icons'),
      '@assets': path.resolve(__dirname, 'src/shared/assets'),
      '@layout': path.resolve(__dirname, 'src/shared/components/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
});
