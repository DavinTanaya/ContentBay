import { useState } from 'react';
import { message } from 'antd';
import type { ContentModelJsonSchema } from '@entities/content-model';

export function useContentModelJson(schema: ContentModelJsonSchema) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    message.success('JSON Schema copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    copied,
    handleCopy,
  };
}
