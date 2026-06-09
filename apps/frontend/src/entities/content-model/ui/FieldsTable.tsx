import { Table, Button, Tag, Modal } from 'antd';
import type { ContentField, FieldsTableProps } from '../model/types';
import { RenderFieldIcon } from './RenderFieldIcon';
import { colors } from '@/shared/constants/colors';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export function FieldsTable({ data, onEditField, onDeleteField }: FieldsTableProps) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ContentField) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-geekblue-1 border border-geekblue-2 text-geekblue-6 flex items-center justify-center transition-colors group-hover:bg-geekblue-2">
            <RenderFieldIcon icon={record.icon} />
          </div>
          <span className="label-xs-bold text-gray-10">{text}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md label-xs-medium bg-gray-2 text-gray-8 border border-gray-5">
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
      render: (_: unknown, record: ContentField) => (
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            color="geekblue"
            size="small"
            onClick={() => onEditField(record)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            danger
            size="small"
            onClick={() => {
              Modal.confirm({
                title: 'Delete Field',
                content: `Are you sure you want to delete the field "${record.name}"? This action cannot be undone.`,
                okText: 'Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: () => onDeleteField?.(record.apiId),
              });
            }}
          >
            Delete
          </Button>
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
        'group border-b border-gray-6 hover:bg-gray-2 transition-colors'
      }
    />
  );
}
