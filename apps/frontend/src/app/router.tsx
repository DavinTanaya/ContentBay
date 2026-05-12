import React from "react";
import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/auth/login';
import Register from '@pages/auth/register';
import LandingHome from '@pages/landing-page/home';
import Product from '@pages/landing-page/product';
import Resources from '@pages/landing-page/resource';
import Documentation from '@pages/landing-page/documentation';
import LandingLayout from '@layout/landing-page/LandingLayout';

import ContentModelList from '@pages/contentbay/content-model/ContentModelListPage';
import ContentModelCreate from '@pages/contentbay/content-model/ContentModelCreatePage';
import ContentModelBuilder from '@pages/contentbay/content-model/ContentModelBuilderPage';
import ContentModelSettings from '@pages/contentbay/content-model/ContentModelSettingsPage';
import ContentList from '@pages/contentbay/content/ContentListPage';
import ContentCreate from '@pages/contentbay/content/ContentCreatePage';
import ContentBayLayout from '@layout/contentbay/ContentBayLayout';

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
