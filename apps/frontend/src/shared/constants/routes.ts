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
    contentModelSettings: '/content-model/:id',
    contentCreate: '/content/create',
    schemaModeler: '/schema-modeler',
  },
} as const;

export const getContentModelSettings = (id: string | number) =>
  `/content-model/${id}`;
