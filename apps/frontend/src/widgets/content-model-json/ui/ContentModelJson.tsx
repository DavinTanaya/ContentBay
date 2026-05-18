import type { FC } from 'react';
import { JSONSchemaPreview } from '@entities/content-model';

interface ContentModelJsonProps {
  modelId: string;
  schema: any;
}

export const ContentModelJson: FC<ContentModelJsonProps> = ({
  modelId,
  schema,
}) => {
  return (
    <div className="max-w-[1400px]">
      <JSONSchemaPreview modelId={modelId} schema={schema} />
    </div>
  );
};
