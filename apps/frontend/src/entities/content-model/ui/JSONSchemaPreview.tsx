import type { JSONSchemaPreviewProps } from '../model/types';

export function JSONSchemaPreview({ schema }: JSONSchemaPreviewProps) {
  return (
    <div className="px-6 py-6 text-gray-800 bg-white">
      <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[13px] text-gray-800 leading-relaxed font-normal">
        {JSON.stringify(schema, null, 2)}
      </pre>
    </div>
  );
}
