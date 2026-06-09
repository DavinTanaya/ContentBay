import type { ModelMetadataSidebarProps } from '../model/types';

export function ModelMetadataSidebar({
  totalFields,
  lastRevision,
}: ModelMetadataSidebarProps) {
  return (
    <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] hover:-translate-y-[2px] transition-all duration-500 p-8 h-fit">
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
      </div>
    </div>
  );
}
