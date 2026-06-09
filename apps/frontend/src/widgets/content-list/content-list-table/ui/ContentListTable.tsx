import React from 'react';
import { Table, Tag, Button, Dropdown } from 'antd';
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDeleteEntry } from '@/features/delete-entry/api/useDeleteEntry';
import { getEntryDisplayValue } from '@/entities/content-entry/lib/getEntryDisplayValue';
import { formatRelativeTime } from '@/entities/content-entry/lib/formatRelativeTime';

interface ContentListTableProps {
  contents: any[];
  workspaceId: string;
  loading: boolean;
  onRefresh: () => void;
}

export const ContentListTable: React.FC<ContentListTableProps> = ({
  contents,
  workspaceId,
  loading,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const { confirmDelete } = useDeleteEntry();

  const columns = [
    {
      title: 'Title',
      key: 'name',
      render: (record: any) => {
        const title = getEntryDisplayValue(record.contentModel, record);
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 line-clamp-1">
              {title}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Content Model',
      key: 'type',
      render: (record: any) => {
        return (
          <span className="text-sm text-gray-500 font-medium">
            {record.contentModel?.name || 'Unknown Model'}
          </span>
        );
      },
    },
    {
      title: 'Updated At',
      key: 'updatedAt',
      render: (record: any) => {
        const relativeTime = formatRelativeTime(record.updatedAt);
        return <span className="text-sm text-gray-500">{relativeTime}</span>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => {
        const status = record.status || 'draft';
        const isPublished = status === 'published';
        return (
          <Tag
            color={isPublished ? '#E6FFED' : '#FFF8C5'}
            className="border-none font-bold text-xs rounded-full px-3 py-1 m-0 capitalize"
            style={{ color: isPublished ? '#1A7F37' : '#9A6700' }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'actions',
      width: 64,
      render: (record: any) => {
        const rowMenuItems = [
          {
            key: 'edit',
            label: 'Edit Content',
            onClick: (e: any) => {
              e.domEvent.stopPropagation();
              navigate(
                `/workspace/${workspaceId}/content/create?modelId=${record.contentModelId}&entryId=${record.id}`,
              );
            },
          },
          {
            key: 'publish',
            label: 'Publish',
            disabled: true, // Future-proofing
            onClick: (e: any) => e.domEvent.stopPropagation(),
          },
          {
            key: 'unpublish',
            label: 'Unpublish',
            disabled: true, // Future-proofing
            onClick: (e: any) => e.domEvent.stopPropagation(),
          },
          {
            type: 'divider' as const,
          },
          {
            key: 'delete',
            label: (
              <span className="text-red-500 flex items-center gap-2">
                <DeleteOutlined /> Delete
              </span>
            ),
            onClick: (e: any) => {
              e.domEvent.stopPropagation();
              confirmDelete(record.id, workspaceId, record.contentModelId, onRefresh);
            },
          },
        ];
        return (
          <Dropdown menu={{ items: rowMenuItems }} trigger={['click']}>
            <Button
              type="text"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-gray-800"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)] transition-all duration-500 overflow-hidden">
      <Table
        columns={columns}
        dataSource={contents}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        rowClassName="cursor-pointer transition-colors duration-150 hover:bg-slate-50"
        onRow={(record) => ({
          onClick: () =>
            navigate(
              `/workspace/${workspaceId}/content/create?modelId=${record.contentModelId}&entryId=${record.id}`,
            ),
        })}
      />
    </div>
  );
};
