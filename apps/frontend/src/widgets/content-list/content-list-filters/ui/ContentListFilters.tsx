import React from 'react';
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ContentListFiltersProps {
  selectedModelId: string;
  setSelectedModelId: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  workspaceModels: any[];
}

export const ContentListFilters: React.FC<ContentListFiltersProps> = ({
  selectedModelId,
  setSelectedModelId,
  statusFilter,
  setStatusFilter,
  workspaceModels,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
      <div className="flex-grow max-w-sm">
        <Input
          size="large"
          placeholder="Search entries..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded-lg border-gray-200"
          // Note: Search functionality can be wired up later to the API/hook
        />
      </div>

      <div className="flex items-center gap-3">
        <Select
          size="large"
          value={selectedModelId}
          onChange={setSelectedModelId}
          className="w-40"
          popupMatchSelectWidth={false}
          options={[
            { label: 'All Content Types', value: 'All' },
            ...workspaceModels.map((m) => ({ label: m.name, value: m.id })),
          ]}
        />

        <Select
          size="large"
          value={statusFilter}
          onChange={setStatusFilter}
          className="w-32"
          options={[
            { label: 'All Status', value: 'All' },
            { label: 'Published', value: 'Published' },
            { label: 'Draft', value: 'Draft' },
          ]}
        />
      </div>
    </div>
  );
};
