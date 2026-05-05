import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/contentbay/Login';
import Register from '@/pages/contentbay/Register';
import Home from '@/pages/contentbay/Home';
import Protect from '@/shared/components/layout/contentbay/Protect';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <Protect>
        <Home />
      </Protect>
    ),
  },
]);
