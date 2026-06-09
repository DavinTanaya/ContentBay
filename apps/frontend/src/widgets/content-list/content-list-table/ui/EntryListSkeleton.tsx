import React from 'react';
import { Skeleton } from 'antd';

export const EntryListSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] transition-all duration-500 overflow-hidden p-6 space-y-6">
      {/* Table Header Mock */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <Skeleton.Input active size="small" className="w-48" />
        <Skeleton.Input active size="small" className="w-32" />
        <Skeleton.Input active size="small" className="w-24" />
        <Skeleton.Input active size="small" className="w-20" />
      </div>

      {/* Table Rows Mock */}
      {[1, 2, 3, 4, 5].map((key) => (
        <div key={key} className="flex items-center justify-between pb-4">
          <div className="flex flex-col gap-2">
            <Skeleton.Input active size="small" className="w-40" />
            <Skeleton.Input active size="small" className="w-24 h-3" />
          </div>
          <Skeleton.Input active size="small" className="w-24" />
          <Skeleton.Input active size="small" className="w-20" />
          <Skeleton.Button active size="small" shape="round" className="w-16" />
        </div>
      ))}
    </div>
  );
};
