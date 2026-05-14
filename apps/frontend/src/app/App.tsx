import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { Providers } from '@/app/providers';
import ThemeProvider from './providers/ThemeProvider';

import './styles/index.css';

export default function App() {
  return (
    <ThemeProvider>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ThemeProvider>
  );
}
