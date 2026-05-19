import { useState } from 'react';
import { Button, message } from 'antd';
import type { JSONSchemaPreviewProps } from '../model/types';

export function JSONSchemaPreview({ modelId, schema }: JSONSchemaPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    message.success('JSON Schema copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-10 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {modelId?.toUpperCase()}_SCHEMA.JSON
          </span>
        </div>
        <Button size="middle" type="default" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy JSON'}
        </Button>
      </div>
      <div className="p-12 font-mono text-sm leading-relaxed text-gray-700 bg-white">
        <pre className="p-8 bg-gray-50/30 rounded-2xl border border-gray-50">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </div>
  );
}
