import type { FC } from 'react';
import { Table, Button } from 'antd';
import {
  MoreOutlined,
  CheckCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import type { ContentField } from '../model/content-model.types';
import { RenderFieldIcon } from './RenderFieldIcon';

interface FieldsTableProps {
  data: ContentField[];
  onEditField: (field: ContentField) => void;
  onAddNewField: () => void;
}

export const FieldsTable: FC<FieldsTableProps> = ({
  data,
  onEditField,
  onAddNewField,
}) => {
  const columns = [
    {
      title: (
        <div className="pl-4">
          <span className="label-sm-bold text-gray-7">Name</span>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ContentField) => (
        <div className="flex items-center gap-4 pl-4">
          <div className="w-8 h-8 rounded-md bg-blue-1 text-blue-6 flex items-center justify-center text-sm">
            <RenderFieldIcon icon={record.icon} />
          </div>
          <span className="label-sm-semibold text-blue-6">{text}</span>
        </div>
      ),
    },
    {
      title: <span className="label-sm-bold text-gray-7">Type</span>,
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span className="label-sm-semibold text-gray-7">{text}</span>
      ),
    },
    {
      title: <span className="label-sm-bold text-gray-7">Localized</span>,
      dataIndex: 'localized',
      key: 'localized',
      render: (val: boolean) => (
        <div className="flex items-center justify-center">
          {val ? <CheckCircleFilled className="text-blue-6 text-xl" /> : null}
        </div>
      ),
    },
    {
      title: (
        <div className="pr-4">
          <span className="label-sm-bold text-gray-7">
            Actions
          </span>
        </div>
      ),
      key: 'actions',
      render: (_: unknown, record: ContentField) => (
        <div className="flex items-center gap-4 pr-4">
          <Button
            type="link"
            className="text-blue-6 font-bold p-0"
            onClick={() => onEditField(record)}
          >
            Edit
          </Button>
          <Button
            type="text"
            className="text-gray-7 hover:text-gray-9 transition-colors p-0"
          >
            <MoreOutlined className="text-lg rotate-90" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-gray-4 shadow-none overflow-hidden h-fit">
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-4">
        <h3 className="text-base font-bold text-gray-12">Content Fields</h3>
        <Button
          type="link"
          className="text-blue-6 font-medium p-0 flex items-center gap-2"
          onClick={onAddNewField}
        >
          <PlusOutlined />
          <span className="text-sm">Add new fields</span>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        className="clean-table"
        size="middle"
        rowClassName={() => 'border-b border-gray-3'}
      />
    </div>
  );
};
