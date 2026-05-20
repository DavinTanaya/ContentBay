export interface Content {
  id: string;
  workspaceId: string;
  contentModelId: string;
  data: Record<string, unknown>;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  contentModel?: {
    id: string;
    name: string;
    apiId: string;
  };
}
