import React from "react";
import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/contentbay/Login';
import Register from '@/pages/contentbay/Register';
import LandingHome from '@/pages/landing-page/home/Home';
import Product from '@/pages/landing-page/product/Product';
import Resources from '@/pages/landing-page/resource/Resources';
import Documentation from '@/pages/landing-page/documentation/Documentation';
import LandingLayout from '@/shared/components/layout/landing-page/LandingLayout';

import ContentModelList from '@/pages/contentbay/content-model/ContentModelList';
import ContentModelCreate from '@/pages/contentbay/content-model/ContentModelCreate';
import ContentModelBuilder from '@/pages/contentbay/content-model/ContentModelBuilder';
import ContentModelSettings from '@/pages/contentbay/content-model/ContentModelSettings';
import ContentList from '@/pages/contentbay/content/ContentList';
import ContentCreate from '@/pages/contentbay/content/ContentCreate';
import ContentBayLayout from '@/shared/components/layout/contentbay/ContentBayLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingHome />,
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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <ContentBayLayout />,
    children: [
      {
        path: 'content-model',
        element: <ContentModelList />,
      },
      {
        path: 'content-model/create',
        element: <ContentModelCreate />,
      },
      {
        path: 'content-model/:modelId',
        element: <ContentModelBuilder />,
      },
      {
        path: 'content-model/:modelId/settings',
        element: <ContentModelSettings />,
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
