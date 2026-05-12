import React from "react";
import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/contentbay/Login';
import Register from '@/pages/contentbay/Register';
import ContentBayHome from '@/pages/contentbay/Home';
import LandingHome from '@/pages/landing-page/Home';
import Protect from '@/shared/components/layout/contentbay/Protect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingHome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: (
      <Protect>
        <ContentBayHome />
      </Protect>
    ),
  },
]);
