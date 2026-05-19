export interface Workspace {
  id: string;
  name: string;
  description: string;
  types: number;
  env: number;
  records: string;
  updated: string;
  members: string[];
  createdAt?: string;
  updatedAt?: string;
}
