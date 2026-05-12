import type { FC } from 'react';
import { Tag } from 'antd';

interface ModelMetadataSidebarProps {
  totalFields: number;
  lastRevision: string;
  status: 'LIVE' | 'DRAFT';
}

export const ModelMetadataSidebar: FC<ModelMetadataSidebarProps> = ({
  totalFields,
  lastRevision,
  status,
}) => {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm h-fit">
      <h2 className="text-xs font-bold text-gray-900 mb-8 tracking-widest uppercase">
        MODEL METADATA
      </h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Total Fields</span>
          <span className="text-gray-900 font-bold">{totalFields}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Last Revision</span>
          <span className="text-gray-900 font-bold">{lastRevision}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Status</span>
          <Tag
            color={status === 'LIVE' ? '#E6FFED' : '#FFF7E6'}
            className={`${
              status === 'LIVE' ? 'text-[#1A7F37]' : 'text-[#D46B08]'
            } border-none font-bold text-[10px] rounded px-2.5 m-0 uppercase`}
          >
            {status}
          </Tag>
        </div>
      </div>
    </div>
  );
};
