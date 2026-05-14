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
    contentModel: '/content-model',
    content: '/content',
    contentModelCreate: '/content-model/create',
    contentModelBuilder: '/content-model/:id',
    contentModelSettings: '/content-model/:id/settings',
    contentCreate: '/content/create',
    schemaModeler: '/schema-modeler',
  },
} as const;

export const getContentModel = (id: string | number) => `/content-model/${id}`;
export const getContentModelSettings = (id: string | number) =>
  `/content-model/${id}/settings`;
