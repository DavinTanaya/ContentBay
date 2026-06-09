import type { JSONSchemaPreviewProps } from '../model/types';

export function JSONSchemaPreview({ schema }: JSONSchemaPreviewProps) {
  return (
    <div className="px-8 py-8 bg-transparent">
      <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[13px] text-slate-700 leading-relaxed font-normal m-0">
        {JSON.stringify(schema, null, 2)}
      </pre>
    </div>
  );
}
