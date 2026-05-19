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
    contentModel: '/content-model',
    content: '/content',
    contentModelCreate: '/content-model/create',
    contentModelSettings: '/content-model/:id',
    contentCreate: '/content/create',
    schemaModeler: '/schema-modeler',
    spaceSettings: '/space-settings',
    users: '/users',
  },
} as const;

export const getContentModelSettings = (id: string | number) =>
  `/content-model/${id}`;
