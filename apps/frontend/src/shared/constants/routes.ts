export const PATH = {
  landing: {
    home: '/',
    product: '/product',
    documentation: '/documentation',
    resource: '/resource',
  },
  auth: {
    login: '/login',
    register: '/register',
  },
  contentbay: {
    workspace: '/workspace',
    contentModel: '/workspace/:workspaceId/content-model',
    content: '/workspace/:workspaceId/content',
    contentModelCreate: '/workspace/:workspaceId/content-model/create',
    contentModelSettings:
      '/workspace/:workspaceId/content-model/:contentModelId',
    contentCreate: '/workspace/:workspaceId/content/create',
    schemaModeler: '/workspace/:workspaceId/schema-modeler',
    workspaceDetail: '/workspace/:workspaceId/detail',
    users: '/workspace/:workspaceId/users',
  },
} as const;

export const getContentModelSettings = ({
  workspaceId,
  contentModelId,
}: {
  workspaceId: string;
  contentModelId: string | number;
}) =>
  PATH.contentbay.contentModelSettings
    .replace(':workspaceId', workspaceId)
    .replace(':contentModelId', String(contentModelId));

export const getContentModelPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content-model`;

export const getContentPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content`;

export const getContentModelCreatePath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content-model/create`;

export const getSchemaModelerPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/schema-modeler`;

export const getWorkspaceDetailPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/detail`;

export const getUsersPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/users`;
