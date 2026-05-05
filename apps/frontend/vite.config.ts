import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
