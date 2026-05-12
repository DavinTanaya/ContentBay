import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/contentbay/Login';
import Register from '@/pages/contentbay/Register';
import Home from '@/pages/contentbay/Home';
import Product from '@/pages/contentbay/Product';
import Resources from '@/pages/contentbay/Resources';
import Documentation from '@/pages/contentbay/Documentation';
import Layout from '@/shared/components/layout/contentbay/Layout';

import ContentModelList from '@/pages/dashboard/ContentModelList';
import ContentTypeBuilder from '@/pages/dashboard/ContentTypeBuilder';
import ContentModelDetail from '@/pages/dashboard/ContentModelDetail';
import ContentTypeCreate from '@/pages/dashboard/ContentTypeCreate';
import ContentList from '@/pages/dashboard/ContentList';
import ContentCreate from '@/pages/dashboard/ContentCreate';
import DashboardLayout from '@/shared/components/layout/dashboard/DashboardLayout';

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
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'resources',
        element: <Resources />,
      },
      {
        path: 'documentation',
        element: <Documentation />,
      },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'content-model',
        element: <ContentModelList />,
      },
      {
        path: 'content-model/create',
        element: <ContentTypeCreate />,
      },
      {
        path: 'content-model/:modelId',
        element: <ContentTypeBuilder />,
      },
      {
        path: 'content-model/:modelId/settings',
        element: <ContentModelDetail />,
      },
      {
        path: 'content',
        element: <ContentList />,
      },
      {
        path: 'content/create',
        element: <ContentCreate />,
      },
    ],
  },
]);
