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
      ...(process.env.VITE_ALLOWED_HOSTS?.split(',').map((host) => host.trim()).filter(Boolean) ?? []),
    ],
  },
  preview: {
    allowedHosts: [
      'contentbay.tech',
      'www.contentbay.tech',
      ...(process.env.VITE_ALLOWED_HOSTS?.split(',').map((host) => host.trim()).filter(Boolean) ?? []),
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@components': '/src/components',
      // '@features': '/src/features',
      // '@pages': '/src/pages',
      // '@services': '/src/services',
      // '@store': '/src/store',
      // '@utils': '/src/utils',
    },
  },
});
