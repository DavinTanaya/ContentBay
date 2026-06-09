import { Tag } from 'antd';
import { colors } from '@/shared/constants/colors';
import type { ModelMetadataSidebarProps } from '../model/types';

export function ModelMetadataSidebar({
  totalFields,
  lastRevision,
  status,
}: ModelMetadataSidebarProps) {
  return (
    <div className="relative rounded-[32px] bg-slate-50 ring-1 ring-slate-200 shadow-none p-8 h-fit transition-all duration-500">
      <h2 className="text-[12px] font-bold text-gray-500 mb-6 tracking-widest uppercase">
        MODEL METADATA
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-7 font-medium">Total Fields</span>
          <span className="text-gray-12 font-bold">{totalFields}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-7 font-medium">Last Revision</span>
          <span className="text-gray-12 font-bold">{lastRevision}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-7 font-medium">Status</span>
          <Tag
            color={status === 'LIVE' ? colors.green[1] : colors.orange[1]}
            className={`${
              status === 'LIVE' ? 'text-green-6' : 'text-orange-6'
            } border-none font-bold text-[10px] rounded px-2.5 m-0 uppercase`}
          >
            {status}
          </Tag>
        </div>
      </div>
    </div>
  );
}
