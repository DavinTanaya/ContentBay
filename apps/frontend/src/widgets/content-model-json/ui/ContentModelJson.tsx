import { Button, Card } from 'antd';
import { JSONSchemaPreview } from '@entities/content-model';
import { colors } from '@/shared/constants/colors';
import { useContentModelJson } from '../model/useContentModelJson';
import type { ContentModelJsonProps } from '../model/types';

export function ContentModelJson({ modelId, schema }: ContentModelJsonProps) {
  const { copied, handleCopy } = useContentModelJson(schema);

  const cardTitle = (
    <div className="flex items-center gap-4 py-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
      </div>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {modelId?.toUpperCase()}_SCHEMA.JSON
      </span>
    </div>
  );

  const cardExtra = (
    <Button size="middle" type="default" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy JSON'}
    </Button>
  );

  return (
    <div className="max-w-[1400px]">
      <Card
        title={cardTitle}
        extra={cardExtra}
        className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white"
        styles={{
          header: {
            background: colors.gray[3],
            borderBottom: '1px solid #F3F4F6',
            padding: '16px 40px',
          },
          body: {
            padding: 0,
          },
        }}
      >
        <JSONSchemaPreview schema={schema} />
      </Card>
    </div>
  );
}
