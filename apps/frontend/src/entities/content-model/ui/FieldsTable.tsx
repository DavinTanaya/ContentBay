import { Table, Button, Tag, Popconfirm } from 'antd';
import { Trash2 } from 'lucide-react';
import type { ContentField, FieldsTableProps } from '../model/types';
import { RenderFieldIcon } from './RenderFieldIcon';
import { colors } from '@/shared/constants/colors';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export function FieldsTable({
  data,
  onEditField,
  onDeleteField,
}: FieldsTableProps) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'pl-8',
      render: (text: string, record: ContentField) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50/80 ring-1 ring-blue-100 text-blue-6 flex items-center justify-center transition-colors group-hover:bg-blue-100/50">
            <RenderFieldIcon icon={record.icon} />
          </div>
          <span className="text-[14px] font-semibold text-gray-10">{text}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-medium bg-slate-50 text-slate-700 ring-1 ring-slate-200">
          {text}
        </span>
      ),
    },
    {
      title: 'Localized',
      dataIndex: 'localized',
      key: 'localized',
      render: (val: boolean) => (
        <div className="flex items-center">
          {val ? (
            <Tag icon={<CheckCircleOutlined />} color={colors.green[6]}>
              Yes
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color={colors.gray[6]} />
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      className: 'pr-8',
      render: (_: unknown, record: ContentField) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="text"
            className="text-blue-6 hover:text-blue-7 hover:bg-blue-50 font-medium px-3 transition-colors"
            size="small"
            onClick={() => onEditField(record)}
          >
            Edit
          </Button>
          {onDeleteField && (
            <Popconfirm
              title="Delete this field?"
              description={`Are you sure you want to delete ${record.name}?`}
              onConfirm={() => onDeleteField(record.apiId)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              placement="topRight"
            >
              <Button
                type="text"
                size="small"
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
              >
                <Trash2 size={16} />
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={false}
      className="clean-table"
      size="middle"
      rowClassName={() =>
        'group border-b border-slate-100 hover:bg-slate-50/50 transition-colors'
      }
    />
  );
}
