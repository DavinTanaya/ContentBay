import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { Providers } from '@/app/providers';
import ThemeProvider from './providers/ThemeProvider';
import { AppErrorBoundary } from '@/shared/errors/ErrorBoundary';
import { SessionExpiredModal } from '@/shared/errors/components/SessionExpiredModal';

import './styles/index.css';

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <Providers>
          <RouterProvider router={router} />
          <SessionExpiredModal />
        </Providers>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
