import type { ContentModelIcon } from '@entities/content-model';

export interface ContentModelCreateFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export interface CreateContentModelFormValues {
  name: string;
  apiId: string;
  description?: string;
  icon?: ContentModelIcon;
}
