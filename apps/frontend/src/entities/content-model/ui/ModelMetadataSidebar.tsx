import { Tag } from 'antd';
import { colors } from '@/shared/constants/colors';
import type { ModelMetadataSidebarProps } from '../model/types';

export function ModelMetadataSidebar({
  totalFields,
  lastRevision,
  status,
}: ModelMetadataSidebarProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-gray-4 shadow-none h-fit">
      <h2 className="text-[11px] font-bold text-gray-7 mb-4 tracking-widest uppercase">
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
