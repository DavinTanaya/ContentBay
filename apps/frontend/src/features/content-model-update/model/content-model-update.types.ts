import type { ContentModelIcon } from '@entities/content-model';

export interface ContentModelInitialValues {
  id: string;
  name: string;
  apiId: string;
  desc?: string;
  icon?: ContentModelIcon;
}

export interface ContentModelUpdateFormProps {
  initialValues: ContentModelInitialValues;
}

export interface ContentModelFormValues {
  name: string;
  description?: string;
  icon?: ContentModelIcon;
}
