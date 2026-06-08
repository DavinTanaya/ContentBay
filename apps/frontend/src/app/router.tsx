import { createBrowserRouter, Navigate } from 'react-router-dom';

import Home from '@/pages/landing-page/home';
import Product from '@pages/landing-page/product';
import Resources from '@/pages/landing-page/resources';
import Documentation from '@pages/landing-page/documentation';
import { LandingLayout } from '@layout/LandingLayout';

import {
  ContentModelListPage as ContentModelList,
  ContentModelCreatePage as ContentModelCreate,
  ContentModelDetailPage as ContentModelDetail,
} from '@pages/contentbay/content-model';
import ContentList from '@pages/contentbay/content/ContentListPage';
import ContentCreate from '@pages/contentbay/content/ContentCreatePage';
import VisualModeler from '@pages/contentbay/visual-modeler/VisualModelerPage';
import { WorkspacePage } from '@pages/contentbay/workspace';
import { WorkspaceDetailPage } from '@pages/contentbay/workspace-detail';
import { UsersManagementPage } from '@pages/contentbay/users';
import { ContentBayLayout } from '@layout/ContentBayLayout';
import { PATH } from '@/shared/constants/routes';
import { AuthLayout } from './layout/AuthLayout';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import { Protect } from '@/features/auth';
import { InvitationPage } from '@/pages/invite/ui/InvitationPage';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: PATH.landing.product,
        element: <Product />,
      },
      {
        path: PATH.landing.resource,
        element: <Resources />,
      },
      {
        path: PATH.landing.documentation,
        element: <Documentation />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.auth.login,
        element: <Login />,
      },
      {
        path: PATH.auth.register,
        element: <Register />,
      },
    ],
  },
  {
    element: (
      <Protect>
        <ContentBayLayout />
      </Protect>
    ),
    children: [
      {
        path: PATH.contentbay.workspace,
        element: <WorkspacePage />,
      },
      {
        path: PATH.contentbay.workspaceDetail,
        element: <WorkspaceDetailPage />,
      },
      {
        path: PATH.contentbay.users,
        element: <UsersManagementPage />,
      },
      {
        path: PATH.contentbay.contentModel,
        element: <ContentModelList />,
      },
      {
        path: PATH.contentbay.contentModelCreate,
        element: <ContentModelCreate />,
      },
      {
        path: PATH.contentbay.contentModelSettings,
        element: <ContentModelDetail />,
      },
      {
        path: PATH.contentbay.content,
        element: <ContentList />,
      },
      {
        path: PATH.contentbay.contentCreate,
        element: <ContentCreate />,
      },
      {
        path: PATH.contentbay.schemaModeler,
        element: <VisualModeler />,
      },
    ],
  },
  {
    path: '/invite',
    element: <InvitationPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
