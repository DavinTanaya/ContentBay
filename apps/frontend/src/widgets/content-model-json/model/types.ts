import type { ContentModelJsonSchema } from '@entities/content-model';

export interface ContentModelJsonProps {
  modelId: string;
  schema: ContentModelJsonSchema;
}
