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
    contentModelSettings: '/workspace/:workspaceId/content-model/:id',
    contentCreate: '/workspace/:workspaceId/content/create',
    schemaModeler: '/workspace/:workspaceId/schema-modeler',
    spaceSettings: '/workspace/:workspaceId/space-settings',
    users: '/workspace/:workspaceId/users',
  },
} as const;

export const getContentModelSettings = (workspaceId: string, id: string | number) =>
  `/workspace/${workspaceId}/content-model/${id}`;

export const getContentModelPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content-model`;

export const getContentPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content`;

export const getContentModelCreatePath = (workspaceId: string) =>
  `/workspace/${workspaceId}/content-model/create`;

export const getSchemaModelerPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/schema-modeler`;

export const getSpaceSettingsPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/space-settings`;

export const getUsersPath = (workspaceId: string) =>
  `/workspace/${workspaceId}/users`;
