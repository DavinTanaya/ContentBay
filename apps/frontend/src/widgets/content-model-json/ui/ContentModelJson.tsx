import { Button } from 'antd';
import { JSONSchemaPreview } from '@entities/content-model';
import { CodeOutlined } from '@ant-design/icons';
import { colors } from '@/shared/constants/colors';
import { useContentModelJson } from '../model/useContentModelJson';
import type { ContentModelJsonProps } from '../model/types';

export function ContentModelJson({ modelId, schema }: ContentModelJsonProps) {
  const { copied, handleCopy } = useContentModelJson(schema);

  return (
    <div className="w-full">
      <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] transition-all duration-500 overflow-hidden">
        <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 ring-1 ring-blue-100 text-blue-6 flex items-center justify-center transition-colors">
              <CodeOutlined className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-10 m-0 leading-none">
                JSON Preview
              </h3>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 block">
                {modelId?.toUpperCase()} SCHEMA JSON
              </span>
            </div>
          </div>
          <Button
            size="middle"
            type="default"
            onClick={handleCopy}
            className="rounded-xl px-6 font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            {copied ? 'Copied!' : 'Copy JSON'}
          </Button>
        </div>
        <div className="bg-slate-50/30">
          <JSONSchemaPreview schema={schema} />
        </div>
      </div>
    </div>
  );
}
